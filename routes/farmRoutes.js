const express = require('express');
const Farmroute = express.Router();
const farmController = require('../controllers/farmController');  // Ensure this is correct

// Create a new farm
Farmroute.post('/create', farmController.createFarm);

// Get all farms
Farmroute.get('/all', farmController.getAllFarms);

// Delete a farm by ID
Farmroute.delete('/delete/:id', farmController.deleteFarm);

module.exports = Farmroute;
