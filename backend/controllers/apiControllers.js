const getAllPlanets = async (req, res, next) => {
  const planetsFromApi = await req.planets.planetsFromApi;

  res.json(planetsFromApi);
};

const getPlanetById = async (req, res, next) => {
  //const planetId = req.params.pid;
  const planetFromApi = await req.planet.fetchedPlanet;
  res.json(planetFromApi);
};

const getResidentsOfPlanet = async (req, res, next) => {

  let fetchedResidentsData;
  try {
    fetchedResidentsData = await req.residents.fetchedResidentsData;
  } catch (err) {
    console.log(err);
    const error = new Error("Fetching residents falied, please try again later");
    return next(error);
  }

  res.json(fetchedResidentsData);
};

module.exports = { getAllPlanets, getPlanetById, getResidentsOfPlanet };
