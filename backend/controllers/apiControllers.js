
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
  //const planetId = req.params.pid;
/*   const planetFromApi = await req.planet.fetchedPlanet;
  const linksOfResidents = planetFromApi.residents */
  const fetchedResidentsData = await req.residents.fetchedResidentsData

  res.json(fetchedResidentsData);
};



module.exports = { getAllPlanets, getPlanetById, getResidentsOfPlanet };
