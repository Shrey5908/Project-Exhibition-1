const express = require("express");
const { handleGetAllUsers } = require("../controllers/user");
const { handlePostUser } = require("../controllers/user");
const { handleGetUser } = require("../controllers/user");
const { handleGetUserLeetcode } = require("../controllers/user");
const { handleGetUserHackerrank } = require("../controllers/user");

// const { handleGetAllUsers } = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handlePostUser);
router
  .route("/:studentid")
  .get(handleGetUser)
  .patch(async (req, res) => {
    const user = await mongoUser.findByIdAndUpdate(req.params.id, req.body);
    if (!user) return res.status(404).send(`Not Found ${req.params.id}`);
    return res.json({ status: "not working", id: req.params.id });
  })
  .delete(async (req, res) => {
    const user = await mongoUser.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send(`Not Found ${req.params.id}`);
    return res.json({ status: "not working", id: req.params.id });
  });
router.route("/leetcode/:leetcode_username").get(handleGetUserLeetcode);
router.route("/hackerrank/:hackerrank_username").get(handleGetUserHackerrank);

module.exports = router;
