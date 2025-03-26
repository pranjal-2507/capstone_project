const TransactionModel = require("../models/Transaction");
const { userModel } = require("../models/model");
const moment = require("moment");

const GetAllTransaction = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const { frequency } = req.body;
    const transaction = await TransactionModel.find({
      // date:{
      //   $gt:moment().subtract(Number(frequency),'d').toDate(),
      // },
      userid: id,
    });

    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const AddTransaction = async (req, res) => {
  console.log(req.body);
  try {
    let user = await userModel.findOne({ _id: req.body.id });
    console.log(user);
    if (user) {
      if (user._id) {
        await TransactionModel.create({ ...req.body.data, userid: user._id });
        res.status(201).send("New Transaction created");
      } else {
        console.log("Error: User ID not found");
        res.status(500).send("Error: User ID not found");
      }
    } else {
      console.log("User not found");
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  GetAllTransaction,
  AddTransaction,
};
