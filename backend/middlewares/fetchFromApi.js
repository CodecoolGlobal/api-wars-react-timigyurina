const fetch = require("node-fetch");

const fetchAllPlanetsFromApi = async (req, res, next) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/planets`);
    const planetsFromApi = await response.json();

    req.planets = { planetsFromApi };
    next();
  } catch (err) {
    const error = new Error("Fetching planets failed");
    console.log(err);
    error.code = 500;
    return next(error);
  }
};

const fetchPlanetByIdFromApi = async (req, res, next) => {
  const planetId = req.params.pid;
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/planets/${planetId}`
    );
    fetchedPlanet = await response.json();

    req.planet = { fetchedPlanet };
    next();
  } catch (err) {
    const error = new Error("Fetching planet with this id failed");
    console.log(err);
    error.code = 500;
    return next(error);
  }
};

module.exports = { fetchAllPlanetsFromApi, fetchPlanetByIdFromApi };
