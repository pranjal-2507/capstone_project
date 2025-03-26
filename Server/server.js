const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connected } = require("./config/db");
const { userModel } = require("./models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const {ProtectedRoute} = require("./Controllers/ProtectedRoute.js")
const {upload} = require("./multer.js")
const cloudinary = require("./cloudinary.js")

const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const { router } = require("./routes.js");
const TransactionModel = require("./models/Transaction.js");

app.use(express.json());
app.use(cors());
app.use(router);
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  next();
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/friends/:user", async (req, res) => {
  try {
    let user = req.params.user;
    const friends = await userModel.findOne({ _id: user });
    res.json(friends);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post("/addfriends/:user", async (req, res) => {
  const data = req.body;
  let newObj = {...data , expenses: []}
  let user = req.params.user;
  try {
    await userModel.updateOne({ _id: user }, { $push: { friends: newObj } });
    
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/addexpense/:id", async(req, res) => {
  const data = req.body;
  let userid = req.params.id
  
  try {
    let user = await userModel.findOne({_id : userid})
    let newId;
    if (user.friends[data.id].expenses.length==0){
      newId = 1
    }
    else{

      newId = user.friends[data.id].expenses[user.friends[data.id].expenses.length-1].expenseid + 1
    }
    await userModel.updateOne(
      { _id: userid },
      { $push: { [`friends.${data.id}.expenses`]: {expenseid: newId , amount: data.amount , reason: data.reason} } }
    );
    user = await userModel.findOne({_id : userid})
    console.log(user.friends[data.id].expenses)
    res.status(200).json(user.friends); 
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.get("/getFriends/:userid", async (req, res) => {
  try {
    let userid = req.params.userid;
    console.log(userid);
    
    let user = await userModel.findOne({ _id: userid });
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.friends);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.delete("/friendexpense/:id/:userid/:expenseid", async (req, res) => {
  try {
    let id = req.params.id;
    let userid = req.params.userid;
    // console.log(req.params.expenseid)
    let expid = parseInt(req.params.expenseid, 10); 

    console.log(id , userid , expid)

    let user = await userModel.findOne({ _id: userid });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (id < 0 || id >= user.friends.length) {
      return res.status(400).send("Invalid friend index");
    }

    
    await userModel.updateOne(
      { _id: userid },
      { $pull: { [`friends.${id}.expenses`]: { expenseid: expid } } }
    );

   
    let updatedUser = await userModel.findOne({ _id: userid });
    console.log(updatedUser.friends[id].expenses);

    res.status(200).send("Expense deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});


app.put("/updateexpense/:userid", async (req, res) => {
  try {
    let id = req.body.friendIndex;
    let userid = req.params.userid;
    let expid = req.body.expenseId;
    let updatedExpense = {
      expenseid : expid,
      amount : req.body.newAmount,
      reason : req.body.newReason
    };
    console.log(updatedExpense)

    let user = await userModel.findOne({ _id: userid });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (id < 0 || id >= user.friends.length) {
      return res.status(400).send("Invalid friend index");
    }

    let expensePath = `friends.${id}.expenses`;
    await userModel.updateOne(
      { _id: userid, [`${expensePath}.expenseid`]: expid },
      { $set: { [`${expensePath}.$`]: updatedExpense } }
    );
    let updatedUser = await userModel.findOne({ _id: userid });
    console.log(updatedUser.friends[id].expenses);

    res.status(200).send("Expense updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.post('/upload/:userid', upload.single('image'),  async (req, res) => {
  let userid = req.params.userid;
  
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    await userModel.findOneAndUpdate({ _id: userid }, { profileImg: result.url });
    res.status(200).send({ url: result.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

app.delete("/deletefriend/:id/:userid", async (req, res) => {
  try {
    let id = req.params.id;
    let userid = req.params.userid;

    const user = await userModel.findByIdAndUpdate(
      { _id: userid },
      { $pull: { friends: { name: id } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("Friend not found");
    }
    res.status(200).send("Friend deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/updatefriend/:friendName/:userId", async (req, res) => {
  try {
    const { friendName, userId } = req.params;
    const { name: newName } = req.body;

    const user = await userModel.findById({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    for (friend in user.friends){
      if(user.friends[friend].name == friendName){
        user.friends[friend].name = newName
        break
      }
    }
    
    const newuser = await userModel.findByIdAndUpdate({_id: userId} , user)

    res.status(200).send(newName);
  } catch (err) {
    console.error("Error updating friend:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const emailVerify = await userModel.findOne({ email: data.email });
    if (emailVerify) {
      return res.send("User already exists");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltRounds);
    const newUser = new userModel({
      name: data.name,
      email: data.email,
      password: hashPassword,
      friends: [],
    });
    await newUser.save();
    res.send("Congrats! You signed up successfully");
  } catch (error) {
    res.status(500).send("Error while posting data: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await userModel.findOne({ name });
    if (!user) {
      return res.send("User not found. Please create an account.");
    }
    const hashPasswordMatch = await bcrypt.compare(password, user.password);
    if (hashPasswordMatch) {
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET
      );
      res.json({
        token: token,
        message: "You logged in successfully!",
        id: user._id,
        profile: user.profile
      });
    } else {
      res.status(401).send("Incorrect password");
    }
  } catch (error) {
    res.status(500).send("Error while comparing passwords: " + error.message);
  }
});
app.put("/updateTransaction/:id", async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  try {
    await TransactionModel.updateOne({ _id: id }, body);
    res.send({ message: "Updated!" });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.delete("/deleteTransaction/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TransactionModel.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.send({ message: "Transaction deleted successfully" });
    } else {
      res.status(404).send({ error: "Transaction not found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
    console.error(err);
  }
});

app.listen(port, () => {
  connected();
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;
