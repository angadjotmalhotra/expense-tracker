const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    type: {
      type: String,
      enum: ["income", "expense"],
    },
    category: String,
    note: String,
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);