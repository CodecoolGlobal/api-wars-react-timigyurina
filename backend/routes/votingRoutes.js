const express = require("express");

const votingControllers = require("../controllers/votingControllers");
const fetchFromApi = require("../middlewares/fetchFromApi");
const authCheck = require("../middlewares/authCheck");

const router = express.Router();

router.get("/planets/", votingControllers.getAllVotes);

router.get("/user/:uid", authCheck, votingControllers.getVotesOfUser);

router.post(
  "/planets/:pid",
  fetchFromApi.fetchPlanetByIdFromApi,
  authCheck,
  votingControllers.voteOnPlanet
);

module.exports = router;
