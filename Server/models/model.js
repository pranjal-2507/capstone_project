const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  profile : {
    type: String
  }
});

const validateUser = (user) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    friends: joi.array(),
  });

  return schema.validate(user);
};

const userModel = mongoose.model("registerusers", userSchema);

module.exports = {
  userModel,
  validateUser,
};
