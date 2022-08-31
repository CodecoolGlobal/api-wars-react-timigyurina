const mongoose = require("mongoose");

const Vote = require("../models/vote");
const User = require("../models/user");

const getAllVotes = async (req, res, next) => {
  let allVotes;
  try {
    allVotes = await Vote.find().lean();
  } catch (err) {
    const error = new Error("Could not get votes, maybe later");
    return next(error);
  }

  res.json(allVotes)
};

const voteOnPlanet = async (req, res, next) => {
  //the fetchPlanetByIdFromApi mw uses the id in the params to fetch the planet from the external api
  //const idOfPlanet = req.params.pid;
  const planetFromApi = await req.planet.fetchedPlanet;
  const nameOfPlanet = planetFromApi.name;

  const currentTime = new Date(new Date());
  console.log(currentTime);

  const newVote = new Vote({
    planet: nameOfPlanet,
    date: currentTime,
    creator: req.userData.userId, 
  });

  //we need to check if the userId exists beacause only those can create a vote (connection between users and votes)
  let existingUser;
  try {
    existingUser = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new Error("Creating vote failed, please try again later");
    return next(error);
  }

  if (!existingUser) {
    const error = new Error("Could not find user for the provided id");
    error.code = 404;
    return next(error);
  }
  console.log(existingUser);

  try {
    const currentSession = await mongoose.startSession();
    currentSession.startTransaction();
    await newVote.save({ session: currentSession }); //
    existingUser.votes.push(newVote); //not the normal push but a spec Mongoose one that allows M to establish a connection between the 2 models
    await existingUser.save({ session: currentSession });
    await currentSession.commitTransaction();
  } catch (err) {
    const error = new Error("Creating vote failed, please try again");
    console.log(err);
    return next(error);
  }

  res.status(201).json({ vote: newVote });
};

module.exports = { getAllVotes, voteOnPlanet };
