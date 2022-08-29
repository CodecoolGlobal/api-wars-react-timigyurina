import React, { useState, useEffect } from "react";
import PlanetsTable from "../Components/TableElements/PlanetsTable";
import LoadingSpinner from "../Components/UIElements/LoadingSpinner";
import { SimpleTable } from "../Components/TableElements/SimpleTable";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPlanets, setLoadedPlanets] = useState([]);

  const fetchPlanets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/planets");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);

      setLoadedPlanets(data.results);
      setIsLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
      //throw err;
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  

  return (
    <div>
      <h1>Planets of the Star Wars Universe</h1>
      {isLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : (
        <SimpleTable planets={loadedPlanets} />
      )}
      <PlanetsTable planets={loadedPlanets} />
    </div>
  );
};

export default HomePage;
