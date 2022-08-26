const express = require("express");

const fetchFromApi = require("../middlewares/fetchFromApi");
const apiControllers = require("../controllers/apiControllers");

const router = express.Router();

router.get(
  "/planets",
  fetchFromApi.fetchAllPlanetsFromApi,
  apiControllers.getAllPlanets
);

router.get(
  "/planets/:pid",
  fetchFromApi.fetchPlanetByIdFromApi,
  apiControllers.getPlanetById
);
//Here I use two midllewares: first for fetching the planet by id, then to get the links of the residents for that planet and fetch their data
router.get(
  "/planets/:pid/residents",
  fetchFromApi.fetchPlanetByIdFromApi,
  fetchFromApi.fetchResidents,
  apiControllers.getResidentsOfPlanet
);

module.exports = router;
