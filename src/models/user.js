const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    // unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 7,
  //   trim: true,
  //   validate(value) {
  //     if (value.toLowerCase().includes("password")) {
  //       throw new Error('Password cannot contain "password"');
  //     }
  //   },
  // },
  age: {
    type: Number,
    default: 1,
    validate(value) {
      if (value <= 0) {
        throw new Error("Age must be a positive Number");
      }
    },
  },
  otp: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
