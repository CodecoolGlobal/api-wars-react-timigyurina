require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Vote = require("../models/vote");
const User = require("../models/user");

const register = async (req, res, next) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Invalid inputs");
    err.code = 422;
    return next(err);
  }

  const { username, email, password } = req.body;

  //Check whether user already exists in userdb or tempUserdb
  let existingUser;
  try {
    existingUser =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ username: username }));
  } catch (err) {
    const error = new Error("Signing up failed, please try again later");
    return next(error);
  }

  if (existingUser) {
    const error = new Error("User already exists, please login instead");
    error.code = 422;
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new Error("Could not create user, please try again later");
    return next(error);
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    votes: [],
  });

  console.log(newUser);

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    const error = new Error("Creating user failed, please try again later");
    return next(error);
  }

  /*
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Signing up failed, please try again later");
    return next(error);
  }
  */

  res.status(201).json({
    message: "Successful registration. Log in to continue.",
    userId: newUser.id,
    email: newUser.email,
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new Error("Logging in failed, please try again later");
    return next(error);
  }

  if (!existingUser) {
    const error = new Error(
      "Could not identify user, username seem to be wrong"
    );
    error.code = 403;

    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new Error("Logging in failed, please check your credentials");
    return next(error);
  }

  if (!isValidPassword) {
    const error = new Error(
      "Could not log you in please check your credentials"
    );
    error.code = 403;
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "600s" }
    );
  } catch (err) {
    const error = new Error("Logging failed, please try again later");
    return next(error);
  }

  //With this data sent back we will be able to use and store the token in our client side and attach it to future requests to routes on the backend that require authentication.
  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token,
  });
};

module.exports = { register, login };
