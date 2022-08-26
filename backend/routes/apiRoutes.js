const express = require("express");

const fetchFromApi = require("../middlewares/fetchFromApi")
const apiControllers = require("../controllers/apiControllers");

const router = express.Router();


router.get("/planets", fetchFromApi.fetchAllPlanetsFromApi, apiControllers.getAllPlanets)
router.get("/planets/:pid",fetchFromApi.fetchPlanetByIdFromApi, apiControllers.getPlanetById)

module.exports = router;

