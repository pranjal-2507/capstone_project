require("dotenv").config();
let mongoose = require("mongoose");

let connected = async () => {
  try {
    await mongoose.connect(process.env.uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = {
  isConnected,
  connected,
};
