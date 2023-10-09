require('dotenv').config();
const express = require("express");
const studentrouter = require("./routes/student");
const { connectMongoDB } = require("./connection");
const { log } = require("./middleware");

const app = express();
const PORT = 8000;
const MONGODB = process.env.MONGODB;

connectMongoDB(MONGODB).then(() => {
  console.log("MongoDB Connected! ");
});

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(log("log.txt"));
// app.use("/student", studentrouter);
app.use("/student", studentrouter);

app.get('/',(req,res)=>{
  res.redirect('/student');
})

app.listen(PORT, () => console.log(`Server Started! at PORT: ${PORT}`));
