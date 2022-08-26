const mongoose = require("mongoose");

const Vote = require("../models/vote");
const User = require("../models/user");

const getAllVotes = (req, res, next) => {
    res.json("ok");
};

const voteOnPlanet = (req, res, next) => {
    res.json("ok");
};

module.exports = { getAllVotes, voteOnPlanet };