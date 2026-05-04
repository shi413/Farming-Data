const mongoose = require("mongoose");
const FarmOwner = require("../models/FarmOwner");

// Register a Farm Owner
exports.registerFarmOwner = async (req, res) => {
    try {
        const { ownerName, ownerAddress, farmName, farmAddress } = req.body;

        // Validate the required fields
        if (!ownerName || !ownerAddress || !farmName || !farmAddress) {
            return res.status(400).json({ error: "All fields (ownerName, ownerAddress, farmName, farmAddress) are required" });
        }

        const newFarmOwner = new FarmOwner({ ownerName, ownerAddress, farmName, farmAddress });
        await newFarmOwner.save();
        res.status(201).json({ message: "Farm owner registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Farm Owners
exports.getAllFarmOwners = async (req, res) => {
    try {
        const farmOwners = await FarmOwner.find();
        res.status(200).json(farmOwners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Farm Owner by ID
exports.deleteFarmOwner = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Find the FarmOwner by ID
        const farmOwner = await FarmOwner.findById(id);

        // Check if the farm owner exists
        if (!farmOwner) {
            return res.status(404).json({ error: "Farm owner not found" });
        }

        // Proceed to delete the farm owner
        await FarmOwner.findByIdAndDelete(id);

        res.status(200).json({ message: "Farm owner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
