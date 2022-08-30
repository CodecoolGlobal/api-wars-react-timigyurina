import React, { useState, useEffect } from "react";
import PlanetsTable from "../Components/TableElements/PlanetsTable";
import LoadingSpinner from "../Components/UIElements/LoadingSpinner";
import { SimpleTable } from "../Components/TableElements/SimpleTable";
import PaginationControlled from "../Components/UIElements/PaginationControlled";
import ErrorModal from "../Components/UIElements/ErrorModal";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPlanets, setLoadedPlanets] = useState([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const clearError = () => {
    setError(null);
  };

  const fetchPlanets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/planets", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          pageNum: page,
        }),
      });
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
  }, [page]);

/*   const openResidentsModal = (urlOfPlanet) => {
    const arr = urlOfPlanet.split("/")
    const idOfPlanet = arr[arr.length-2]
    console.log(idOfPlanet);
  }; */

  return (
    <div className="home-page">
      <h1>Planets of the Star Wars Universe</h1>
      {isLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : error ? (
        <ErrorModal error={error} onClear={clearError} />
      ) : (
        <>
          <SimpleTable
            planets={loadedPlanets}
            /* onResidentsButtonClick={(id) => openResidentsModal(id)} */
          />
          <PaginationControlled
            val={page}
            page={page}
            onChange={handlePageChange}
            pageCount={6}
          />
        </>
      )}
      {/* <PlanetsTable planets={loadedPlanets} /> */}
    </div>
  );
};

export default HomePage;
