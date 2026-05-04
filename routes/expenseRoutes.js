const express = require('express');
const Expensesroute = express.Router();
const expenseController = require('../controllers/expenseController');  // Correct path

// Create a new expense
Expensesroute.post('/expenses', expenseController.createExpense);

// Get all expenses
Expensesroute.get('/expenses', expenseController.getAllExpenses); // Ensure this matches the controller's function name

Expensesroute.delete('/expenses/:id', expenseController.deleteExpense);

// Get expenses by farm
// Expensesroute.get('/expenses/farm/:farmId', expenseController.getExpensesByFarm);

// // Get expenses by year
// Expensesroute.get('/expenses/year/:year', expenseController.getExpensesByYear);

// // Delete an expense
// Expensesroute.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = Expensesroute;
