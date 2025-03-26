const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: [true, "Id is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  reference: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  date: {
    type: Date,
    required: [true, "date is required"],
  },
});

const TransactionModel = mongoose.model("transactions", TransactionSchema);

module.exports = TransactionModel;
