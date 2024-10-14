const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  skills: {
    type: [String],
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  savedJobs: {
    type: [String],
    required: false
  },
  notifications: {
    type: [String],
    required: false
  }
}, {
  collection: "Users",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
