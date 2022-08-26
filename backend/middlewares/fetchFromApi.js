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

    //add some other data to the req object and then allow it to continue its journey
    req.planet = { fetchedPlanet };
    next();
  } catch (err) {
    console.log(err);
    const error = new Error("Fetching planet with this id failed");
    error.code = 500;
    return next(error);
  }
};

const fetchResData = async (link) => {
  let residentData;
  try {
    const response = await fetch(link);
    residentData = await response.json();
    return residentData;
  } catch (err) {
    const error = new Error(
      `Fetching resident data of planet with link ${link} failed`
    );
    throw error;
  }
};

const fetchResidents = async (req, res, next) => {
  const planetFromApi = await req.planet.fetchedPlanet;
  const linksOfResidents = planetFromApi.residents;

  let fetchedResidentsData;

  fetchedResidentsData = await Promise.all(
    linksOfResidents.map(async (link) => {
      try {
        return await fetchResData(link);
      } catch (err) {
        console.log(err.message);
        const error = new Error(err.message);
        return next(error);
      }
    })
  );
  //add some other data to the req object and then allow it to continue its journey
  req.residents = { fetchedResidentsData };
  next();
};

module.exports = {
  fetchAllPlanetsFromApi,
  fetchPlanetByIdFromApi,
  fetchResidents,
};
