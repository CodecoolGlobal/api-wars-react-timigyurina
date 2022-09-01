import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/UIElements/LoadingSpinner";
import MessageModal from "../Components/UIElements/MessageModal";
import VotingStatsModal from "../Components/UIElements/VotingStatsModal";

const VotingStatsComponent = () => {
  const [votingStatsModalIsOpen, setVotingStatsModalIsOpen] = useState(false);
  const [votes, setVotes] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState();

  const fetchVotingStats = async () => {
    setIsModalLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/vote/planets`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsModalLoading(false);
      throw err;
    }
  };

  const formatVotes = (votes) => {
    let voteCountPerPlanet = [];

    for (const vote of votes) {
      if (!voteCountPerPlanet[vote.planet]) {
        voteCountPerPlanet[vote.planet] = 1;
      } else {
        voteCountPerPlanet[vote.planet] = voteCountPerPlanet[vote.planet] + 1;
      }
    }

    const arrayOfVoteObjects = []
    for (const [key, value] of Object.entries(voteCountPerPlanet)) {
      const sumObject = {
        name: key,
        count: value
      }
      arrayOfVoteObjects.push(sumObject);
    }

    return arrayOfVoteObjects;
  };

  const openVotingStats = async () => {
    const fetchedVotes = await fetchVotingStats();
    const arrayOfVoteObjects = formatVotes(fetchedVotes);
    console.log(arrayOfVoteObjects);

    setVotes(arrayOfVoteObjects);
    setVotingStatsModalIsOpen(true);
    setIsModalLoading(false);
  };

  const closeVotingStatsModal = () => {
    setVotingStatsModalIsOpen(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <button onClick={openVotingStats}>Voting statistics</button>
      {isModalLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : error ? (
        <MessageModal message={error} onClear={clearError} itIsAnError />
      ) : (
        <VotingStatsModal
          votes={votes}
          votingStatsModalIsOpenedFromParent={votingStatsModalIsOpen}
          parentCallback={closeVotingStatsModal}
        />
      )}
    </>
  );
};

export default VotingStatsComponent;
