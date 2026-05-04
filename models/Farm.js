const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
  },
  farmAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Farm', farmSchema);
