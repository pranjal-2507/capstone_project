const express = require("express");
const {
  AddTransaction,
  GetAllTransaction,
} = require("./Controllers/TransactionCtrl");
const router = express.Router();

// add transaction post
router.post("/addTransaction", AddTransaction);

// get transaction
router.get("/getTransaction/:id", GetAllTransaction);

module.exports = { router };
