const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    studentid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    leetcode_username: {
      type: String,
      required: false,
    },
    hackerrank_username: {
      type: String,
      required: false,
    },
    cgpa: {
      type: String,
      required: false,
    },
    branch: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Student = mongoose.model("user", userSchema);

module.exports = Student;
