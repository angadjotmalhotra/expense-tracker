const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};