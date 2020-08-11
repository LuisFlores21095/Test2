const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());

const db = require("./config/database")



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use("/data", require("./routes/data"));
app.use("/user", require("./routes/user"));



app.get("/", (req, res) => {
  res.send("Testing home page");
});

app.use((req, res, next) => {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 400);

  res.send({
    message: err.message,
    error: err
  });
});

const PORT = 8000;

app.listen(PORT, console.log("Server started on port " + PORT));
