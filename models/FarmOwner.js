const mongoose = require("mongoose");

const FarmOwnerSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    farmName: { type: String, required: true },
    farmAddress: { type: String, required: true }
});

module.exports = mongoose.model("FarmOwner", FarmOwnerSchema);
