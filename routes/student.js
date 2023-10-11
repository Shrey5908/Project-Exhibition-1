const express = require("express");
const {
  handleGetAllStudents,
  handleLogin,
  handleRegister,
  handledashboard,
  handleprofile,
  handlePostStudent,
  handleGetStudent,
  handleGetStudentLeetcode,
  handleGetStudentHackerrank,
  handleStudentLogin,
} = require("../controllers/student");

// const { handleGetAllUsers } = require("../controllers/user");

const studentrouter = express.Router();

studentrouter.use(express.static("public"));

studentrouter.route("/").get(handleLogin).post(handleStudentLogin);
studentrouter.route("/register").get(handleRegister).post(handlePostStudent);
studentrouter.route("/profile").get(handleprofile)
studentrouter.route("/dashboard").get(handledashboard)

module.exports = studentrouter;
