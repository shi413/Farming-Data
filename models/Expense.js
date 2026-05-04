const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  expenseDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  providedBy: {
    type: String, // Instead of enum, we store the actual name
    required: true,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FarmOwner',
    default: null, // Default is null if not provided
  },
  patidar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatidarData',
    default: null,
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
