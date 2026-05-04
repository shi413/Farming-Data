const mongoose = require("mongoose");
const PatidarData = require("../models/PatidarData");

// Register a Patidar (Create)
exports.registerPatidar = async (req, res) => {
    try {
        const { patidarName, patidarAddress, patidarNumber } = req.body;

        // Validate required fields
        if (!patidarName || !patidarAddress || !patidarNumber) {
            return res.status(400).json({ error: "All fields (patidarName, patidarAddress, patidarNumber) are required" });
        }

        // Create the new PatidarData entry
        const newPatidar = new PatidarData({ patidarName, patidarAddress, patidarNumber });
        await newPatidar.save();

        res.status(201).json({ message: "Patidar registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Patidars
exports.getAllPatidars = async (req, res) => {
    try {
        const patidars = await PatidarData.find();
        res.status(200).json(patidars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Patidar by ID
exports.deletePatidar = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Find the Patidar by ID
        const patidar = await PatidarData.findById(id);

        // Check if the Patidar exists
        if (!patidar) {
            return res.status(404).json({ error: "Patidar not found" });
        }

        // Proceed to delete the Patidar
        await PatidarData.findByIdAndDelete(id);

        res.status(200).json({ message: "Patidar deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
