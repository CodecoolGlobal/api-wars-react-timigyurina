
const getAllPlanets = async (req, res, next) => {
  const planetsFromApi = await req.planets.planetsFromApi;

  res.json(planetsFromApi);
};

const getPlanetById = async (req, res, next) => {
  //const planetId = req.params.pid;
  const planetFromApi = await req.planet.fetchedPlanet;
  res.json(planetFromApi);
};

module.exports = { getAllPlanets, getPlanetById };
