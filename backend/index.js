const express = require("express");
const path = require("path");
const studentrouter = require("./routes/student");
const { connectMongoDB } = require("./connection");
const { log } = require("./middleware");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/project").then(() => {
  console.log("MongoDB Connected! ");
});

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(log("log.txt"));
app.use("/student", studentrouter);

app.listen(PORT, () => console.log(`Server Started! at PORT: ${PORT}`));
