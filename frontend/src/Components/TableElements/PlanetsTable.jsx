import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../HooksAndContext/auth-context";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import ResidentsModal from "../UIElements/ResidentsModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import MessageModal from "../UIElements/MessageModal";
import DesktopTable from "./DesktopTable";
import CollapsibleTable from "./CollapsibleTable";

export const PlanetsTable = ({ planets }) => {
  const auth = useContext(AuthContext);

  const [residentsModalIsOpen, setResidentsModalIsOpen] = useState(false);
  const [loadedResidents, setLoadedResidents] = useState([]);
  const [nameOfLoadedPlanet, setNameOfLoadedPlanet] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isVotingLoading, setIsVotingLoading] = useState(false);
  const [voteSuccessMessage, setVoteSuccessMessage] = useState();
  const [error, setError] = useState();
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  /* Screen size handlers */
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  /* Residents handlers */

  const fetchResidents = async (planetId) => {
    setIsModalLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/planets/${planetId}/residents`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      //console.log(data);
      setLoadedResidents(data);
      setIsModalLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsModalLoading(false);
      throw err;
    }
  };

  const residentsButtonClicked = async (urlOfPlanet, nameOfPlanet) => {
    const arr = urlOfPlanet.split("/");
    const idOfPlanet = arr[arr.length - 2];

    setNameOfLoadedPlanet(nameOfPlanet);
    const residents = await fetchResidents(idOfPlanet);
    console.log(residents);

    setResidentsModalIsOpen(true);
  };

  const closeResidentsModal = () => {
    setResidentsModalIsOpen(false);
  };

  /* Voting click handler */

  const voteOnPlanet = async (urlOfPlanet, nameOfPlanet) => {
    const arr = urlOfPlanet.split("/");
    const idOfPlanet = arr[arr.length - 2];

    setIsVotingLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/vote/planets/${idOfPlanet}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({}),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        //means I will have an error and it has a message property
        const error = responseData.message;
        setError(`There was an error during voting on planet ${nameOfPlanet}`);
        setIsVotingLoading(false);
        console.log(error);
        return error;
      }
      setVoteSuccessMessage(`You voted successfully on planet ${nameOfPlanet}`);
      setIsVotingLoading(false);
      console.log(responseData);

      return responseData;
    } catch (err) {
      setIsVotingLoading(false);
      console.log(err);
    }
  };

  /* Other handlers and utils */

  const formatPopulation = (population) => {
    const formatted = parseInt(population).toLocaleString();
    return isNaN(parseInt(formatted)) ? "unknown" : `${formatted} people`;
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setVoteSuccessMessage(null);
  };

  return (
    <>
      {isModalLoading || isVotingLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : voteSuccessMessage ? (
        <MessageModal message={voteSuccessMessage} onClear={clearSuccess} />
      ) : error ? (
        <MessageModal message={error} onClear={clearError} itIsAnError />
      ) : (
        <ResidentsModal
          planet={nameOfLoadedPlanet}
          residents={loadedResidents}
          residentsModalIsOpenedFromParent={residentsModalIsOpen}
          parentCallback={closeResidentsModal}
        />
      )}
      <TableContainer component={Paper} className="table-container">
        {isDesktop ? (
          <DesktopTable
            planets={planets}
            auth={auth}
            formatPopulation={formatPopulation}
            residentsButtonClicked={residentsButtonClicked}
            voteButtonClicked={voteOnPlanet}
          />
        ) : (
          <CollapsibleTable
            planets={planets}
            auth={auth}
            formatPopulation={formatPopulation}
            residentsButtonClicked={residentsButtonClicked}
            voteButtonClicked={voteOnPlanet}
          />
        )}
      </TableContainer>
    </>
  );
};
