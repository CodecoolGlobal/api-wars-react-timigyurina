const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/register",
  [
    check("username").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.register
);

router.post("/login", userControllers.login);

module.exports = router;
