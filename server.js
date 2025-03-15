const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Allows frontend to communicate with backend

const app = express();
const PORT = 3000; // You can change this port

app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Allow cross-origin requests

const FILE_PATH = "recommendations.txt";

// Fetch all recommendations
app.get("/recommendations", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Could not read file" });
        }
        const recommendations = data.split("\n").filter(line => line.trim() !== ""); // Convert file data to an array
        res.json({ recommendations });
    });
});

// Save a new recommendation
app.post("/recommendations", (req, res) => {
    const { recommendation } = req.body;
    if (!recommendation) {
        return res.status(400).json({ error: "Recommendation cannot be empty" });
    }

    fs.appendFile(FILE_PATH, recommendation + "\n", (err) => {
        if (err) {
            return res.status(500).json({ error: "Could not save recommendation" });
        }
        res.json({ message: "Recommendation saved successfully!" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
