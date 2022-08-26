const express = require("express");

const votingControllers = require("../controllers/votingControllers");

const router = express.Router();


router.get("/planets/", votingControllers.getAllVotes)
router.post("/planets/:pid", votingControllers.voteOnPlanet)


module.exports = router;