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
//Here I use more midllewares. FetchPlanetByIdFromApi fetches the planet by id and adds req.planet to the req object. 
//FetchResidents gets the links of the residents for that planet and fetches their data, adds req.residents to the req object, then passes it to getResidentsOfPlanet.
router.get(
  "/planets/:pid/residents",
  fetchFromApi.fetchPlanetByIdFromApi,
  fetchFromApi.fetchResidents,
  apiControllers.getResidentsOfPlanet
);

module.exports = router;
