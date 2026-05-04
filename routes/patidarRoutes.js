const express = require("express");
const Patidarroute = express.Router();
const patidarController = require("../controllers/patidarController");

// Register a Patidar (Create)
Patidarroute.post("/register", patidarController.registerPatidar);

// Get All Patidars
Patidarroute.get("/all", patidarController.getAllPatidars);

// Delete a Patidar by ID
Patidarroute.delete("/delete/:id", patidarController.deletePatidar);

module.exports = Patidarroute;
