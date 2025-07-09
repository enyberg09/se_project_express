const express = require("express");
const mongoose = require("mongoose");
const { createUser, loginUser } = require("./controllers/users");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());

app.use(express.json());

app.post("/signup", createUser);

app.post("/signin", loginUser);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
