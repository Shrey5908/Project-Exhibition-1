const express = require("express");
const {
  handleGetAllStudents,
  handleLogin,
  handleRegister,
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

module.exports = studentrouter;
