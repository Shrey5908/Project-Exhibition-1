const User = require("../models/student");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handlePostUser(req, res) {
  const body = req.body;
  if (!body || !body.studentid || !body.name || !body.email)
    return res.status(400).send("Required fields not filled!!");
  await User.create({
    studentid: body.studentid,
    name: body.name,
    email: body.email,
    password: body.password,
  });
  return res.status(201).json({ status: "success", id: res.studentid });
}

async function handleGetUser(req, res) {
  const user = await User.findOne({ studentid: req.params.studentid });
  if (!user) return res.status(404).send(`Not Found ${req.params.studentid}`);
  return res.json(user);
}

module.exports = {
  handleGetAllUsers,
  handlePostUser,
  handleGetUser,
};
