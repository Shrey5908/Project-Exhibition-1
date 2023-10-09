const Student = require("../models/student");
const axios = require("axios");
const {setUser} = require("../service/authentication");

const header = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
}
async function handleRegister(req,res){
  res.render("../views/registration.ejs")
}
async function handleLogin(req,res){
  res.render("../views/login.ejs")
}
async function handleGetAllStudents(req, res) {
  const allStudents = await Student.find({});
  return res.json(allStudents);
}

async function handlePostStudent(req, res) {
  const {studentid,name,email,cgpa,branch,leetcode_username,hackerrank_username,password} = req.body;
  await Student.create({
    studentid,
    name,
    email,
    cgpa,
    branch,
    leetcode_username,
    hackerrank_username,
    password,
  });
  return res.redirect("/student");
}

async function handleGetStudent(req, res) {
  const student = await Student.findOne({ studentid: req.params.studentid });
  if (!student) return res.status(404).send(`Not Found ${req.params.studentid}`);
  return res.json(student);
}

async function handleGetStudentLeetcode(req, res) {
  const leetcodeResponse = await axios.get("https://leetcode-stats-api.herokuapp.com/"+req.params.leetcode_Studentname);
  if (!leetcodeResponse) return res.status(404).send(`Not Found ${req.params.leetcode_Studentname}`);
  let leetcode = {
    totalSolved : leetcodeResponse.data.totalSolved,
    easySolved : leetcodeResponse.data.easySolved,
    mediumSolved : leetcodeResponse.data.mediumSolved,
    hardSolved: leetcodeResponse.data.hardSolved,
    ranking: leetcodeResponse.data.ranking
  }
  return res.json(leetcode);
}

async function handleGetStudentHackerrank(req, res) {
  const response = await axios.get("https://www.hackerrank.com/rest/hackers/"+req.params.hackerrank_Studentname+"/recent_challenges?limit=100000000000000", {headers: header});
  if (!response) return res.status(404).send(`Not Found ${req.params.hackerrank_Studentname}`);
  let hackerrank = {
    totalSolved : response.data.models.length
  }
  return res.json(hackerrank);
}

async function handleStudentLogin(req,res){
  const {studentid,password} = req.body;
  const user = await Student.findOne({studentid,password});
  if(!user)
      return res.render(
          "login",
          {
              message:"Invalid credentials"
          }
      );
  const token = setUser(user);
  res.cookie("uid",token);
  return res.redirect("https://google.com");
}

module.exports = {
  handleRegister,
  handleLogin,
  handleGetAllStudents,
  handlePostStudent,
  handleStudentLogin,
  handleGetStudent,
  handleGetStudentLeetcode,
  handleGetStudentHackerrank
};
