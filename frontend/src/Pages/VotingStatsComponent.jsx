import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/UIElements/LoadingSpinner";
import MessageModal from "../Components/UIElements/MessageModal";
import VotingStatsModal from "../Components/UIElements/VotingStatsModal";

const VotingStatsComponent = () => {
  const [votingStatsModalIsOpen, setVotingStatsModalIsOpen] = useState(false);
  const [loadedVotes, setLoadedVotes] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState();

  const openVotingStats = () => {
    console.log("open stats modal");
    setVotingStatsModalIsOpen(true);
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
          votingStatsModalIsOpenedFromParent={votingStatsModalIsOpen}
          parentCallback={closeVotingStatsModal}
        />
      )}
    </>
  );
};

export default VotingStatsComponent;
