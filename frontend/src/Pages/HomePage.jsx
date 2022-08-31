import React, { useState, useEffect } from "react";

import LoadingSpinner from "../Components/UIElements/LoadingSpinner";
import { PlanetsTable } from "../Components/TableElements/PlanetsTable";
import PaginationControlled from "../Components/UIElements/PaginationControlled";
import MessageModal from "../Components/UIElements/MessageModal";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPlanets, setLoadedPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  /* Screen size handlers */
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  /* Page-change and data-fetch handlers */
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

  return (
    <div className="home-page">
      <h1>Planets of the Star Wars Universe</h1>
      {isLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : error ? (
        <MessageModal message={error} onClear={clearError} itIsAnError />
      ) : (
        <>
          {isDesktop ? (
            <PlanetsTable planets={loadedPlanets} />
          ) : (
            <div>small</div>
          )}
          <PaginationControlled
            val={page}
            page={page}
            onChange={handlePageChange}
            pageCount={6}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
