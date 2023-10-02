const User = require("../models/student");
const axios = require("axios");

const header = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
}

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handlePostUser(req, res) {
  const body = req.body;
  if (!body || !body.studentid || !body.name || !body.email || !body.password || !body.leetcode_username || !body.hackerrank_username)
    return res.status(400).send("Required fields not filled!!");
  await User.create({
    studentid: body.studentid,
    name: body.name,
    email: body.email,
    password: body.password,
    leetcode_username: body.leetcode_username,
    hackerrank_username: body.hackerrank_username,
  });
  return res.status(201).json({ status: "success", id: res.studentid });
}

async function handleGetUser(req, res) {
  const user = await User.findOne({ studentid: req.params.studentid });
  if (!user) return res.status(404).send(`Not Found ${req.params.studentid}`);
  return res.json(user);
}

async function handleGetUserLeetcode(req, res) {
  const leetcodeResponse = await axios.get("https://leetcode-stats-api.herokuapp.com/"+req.params.leetcode_username);
  if (!leetcodeResponse) return res.status(404).send(`Not Found ${req.params.leetcode_username}`);
  let leetcode = {
    totalSolved : leetcodeResponse.data.totalSolved,
    easySolved : leetcodeResponse.data.easySolved,
    mediumSolved : leetcodeResponse.data.mediumSolved,
    hardSolved: leetcodeResponse.data.hardSolved,
    ranking: leetcodeResponse.data.ranking
  }
  return res.json(leetcode);
}

async function handleGetUserHackerrank(req, res) {
  const response = await axios.get("https://www.hackerrank.com/rest/hackers/"+req.params.hackerrank_username+"/recent_challenges?limit=100000000000000", {headers: header});
  if (!response) return res.status(404).send(`Not Found ${req.params.hackerrank_username}`);
  let hackerrank = {
    totalSolved : response.data.models.length
  }
  return res.json(hackerrank);
}

module.exports = {
  handleGetAllUsers,
  handlePostUser,
  handleGetUser,
  handleGetUserLeetcode,
  handleGetUserHackerrank
};
