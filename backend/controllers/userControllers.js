const mongoose = require("mongoose");

const Vote = require("../models/vote");
const User = require("../models/user");

const register = (req, res, next) => {
  res.json("ok");
};

const login = (req, res, next) => {
  res.json("ok");
};

module.exports = { register, login };
