require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const address = "localhost"
const port = process.env.PORT || 5000;
const app = express();
/* 
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
 */
//app.use(cors());
//app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* 
app.use("/api", apiRoutes);
app.use("/user", userRoutes);
 */
app.get("/", (req, res) => {
  res.json("success")
});

//mw for handling unsupported routes
app.use((req, res, next) => {
  const error = new Error("Could not find this route");
  error.code = 404
  throw error;
});

//Middleware for error-handling
app.use((error, req, res, next) => {
  //if a res has already been sent
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then((res) => {
    console.log(`Connected to DB: ${res.connection.name}`);
  })
  .catch((err) => console.log(`Error in DB connection ${err}`));

app.listen(port, () => {
  console.log(`Application is listening at http://${address}:${port}/`);
});
