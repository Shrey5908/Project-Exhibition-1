const express = require("express");

const userRouter = require("./routes/student");
const { connectMongoDB } = require("./connection");
const { log } = require("./middleware");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/testing").then(() => {
  console.log("MongoDB Connected! ");
});

app.use(express.urlencoded({ extended: false }));
app.use(log("log.txt"));
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server Started! at PORT: ${PORT}`));
