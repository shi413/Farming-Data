const Expense = require('../models/Expense');
const Owner = require('../models/FarmOwner');
const Patidar = require('../models/PatidarData');
const Farm = require('../models/Farm');

exports.createExpense = async (req, res) => {
  try {
    const { amount, expenseDate, description, farm, ownerId, patidarId, providedBy } = req.body;

    // Validate farm existence
    const farmExists = await Farm.findById(farm);
    if (!farmExists) {
      return res.status(404).json({ error: "Farm not found" });
    }

    let providedByName = ""; // This will store the actual name (owner or patidar)
    let owner = null;
    let patidar = null;

    // Fetch both the owner and patidar data if provided
    if (ownerId) {
      const ownerData = await Owner.findById(ownerId);
      if (!ownerData) {
        return res.status(404).json({ error: "Owner not found" });
      }
      owner = ownerData._id;
    }

    if (patidarId) {
      const patidarData = await Patidar.findById(patidarId);
      if (!patidarData) {
        return res.status(404).json({ error: "Patidar not found" });
      }
      patidar = patidarData._id;
    }

    // Validate if providedBy is either "owner" or "patidar"
    if (providedBy !== "owner" && providedBy !== "patidar") {
      return res.status(400).json({ error: "providedBy must be 'owner' or 'patidar'" });
    }

    // Fetch the name of the provider based on providedBy
    if (providedBy === "owner" && owner) {
      const ownerData = await Owner.findById(owner);
      providedByName = `Owner: ${ownerData.ownerName}`;
    } else if (providedBy === "patidar" && patidar) {
      const patidarData = await Patidar.findById(patidar);
      providedByName = `Patidar: ${patidarData.patidarName}`;
    } else {
      return res.status(400).json({ error: `${providedBy}Id must be provided` });
    }

    // Create the new expense
    const newExpense = new Expense({
      amount,
      expenseDate,
      description,
      farm,
      providedBy: providedByName, // Store the actual name
      owner,
      patidar,
    });

    await newExpense.save();
    res.status(201).json(newExpense);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $lookup: {
          from: "farms",
          localField: "farm",
          foreignField: "_id",
          as: "farmDetails",
        },
      },
      { $unwind: "$farmDetails" },

      {
        $lookup: {
          from: "farmowners",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      {
        $lookup: {
          from: "patidardatas",
          localField: "patidar",
          foreignField: "_id",
          as: "patidarDetails",
        },
      },

      { $unwind: { path: "$ownerDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$patidarDetails", preserveNullAndEmptyArrays: true } },

      {
        $group: {
          _id: "$farm", // Group by farm ID
          farmName: { $first: "$farmDetails.farmName" },
          farmAddress: { $first: "$farmDetails.farmAddress" },

          // Total expense per farm
          totalFarmExpenses: { $sum: "$amount" },

          // Correct total expenses from owners
          totalOwnerExpenses: {
            $sum: {
              $cond: [
                { $regexMatch: { input: "$providedBy", regex: /^Owner:/ } },
                "$amount",
                0
              ]
            }
          },
          ownerName: { $first: "$ownerDetails.ownerName" },

          // Correct total expenses from patidars
          totalPatidarExpenses: {
            $sum: {
              $cond: [
                { $regexMatch: { input: "$providedBy", regex: /^Patidar:/ } },
                "$amount",
                0
              ]
            }
          },
          patidarName: { $first: "$patidarDetails.patidarName" },

          expenses: {
            $push: {
              amount: "$amount",
              expenseDate: "$expenseDate",
              description: "$description",
              providedBy: "$providedBy",
            },
          },
        },
      },

      { $sort: { farmName: 1 } },
    ]);

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the expense exists
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Delete the expense
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

