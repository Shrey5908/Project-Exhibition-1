const fs = require("fs");
const { getUser } = require("../service/authentication");

function log(file) {
  return (req, res, next) => {
    fs.appendFileSync(
      file,
      `${new Date().toISOString()} ${req.method} ${req.url}\n`
    );
    next();
  };
}

async function restrictToLoggedInUser(req, res, next) {
  const userUID = req.cookies?.uid;
  if (!userUID) return res.redirect("/");
  const user = getUser(userUID);
  if (!user) return res.redirect("/");
  req.user = user;
  next();
}

module.exports = {
  log,
  restrictToLoggedInUser,
};
