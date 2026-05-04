const mongoose = require("mongoose");

// Define the PatidarData schema
const patidarDataSchema = new mongoose.Schema({
    patidarName: {
        type: String,
        required: [true, "Patidar name is required"],
        trim: true
    },
    patidarAddress: {
        type: String,
        required: [true, "Patidar address is required"],
        trim: true
    },
    patidarNumber: {
        type: String,
        required: [true, "Patidar number is required"],
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"] // Assumes it's a 10-digit number
    }
}, { timestamps: true });

// Create the PatidarData model
const PatidarData = mongoose.model("PatidarData", patidarDataSchema);

module.exports = PatidarData;
