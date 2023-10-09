const fs = require("fs");

function log(file) {
  return (req, res, next) => {
    fs.appendFileSync(
      file,
      `${new Date().toISOString()} ${req.method} ${req.url}\n`
    );
    next();
  };
}

module.exports = { log };
