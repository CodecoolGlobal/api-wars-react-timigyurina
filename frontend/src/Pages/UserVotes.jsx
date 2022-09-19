import { useState, useContext } from "react";
import UserVotesTable from "../Components/TableElements/UserVotesTable";
import { AuthContext } from "../HooksAndContext/auth-context";
import Button from "@mui/material/Button";
import LoadingSpinner from "../Components/UIElements/LoadingSpinner";
import MessageModal from "../Components/UIElements/MessageModal";

const UserVotes = () => {
  const auth = useContext(AuthContext);
  const [votes, setVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/vote/user/${auth.userId}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        //means I will have an error and it has a message property
        const error = responseData.message;
        setError(`There was an error during fetching voutes`);
        setIsLoading(false);
        console.log(error);
        return error;
      }

      setVotes(responseData);
      setIsLoading(false);
      return responseData;
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const formatVotes = (fetchedVotes) => {
    console.log(fetchedVotes);
    let voteCountPerPlanet = [];

    for (const vote of fetchedVotes) {
      if (!voteCountPerPlanet[vote.planet]) {
        voteCountPerPlanet[vote.planet] = 1;
      } else {
        voteCountPerPlanet[vote.planet] = voteCountPerPlanet[vote.planet] + 1;
      }
    }

    const arrayOfVoteObjects = [];
    for (const [key, value] of Object.entries(voteCountPerPlanet)) {
      const sumObject = {
        name: key,
        count: value,
      };
      arrayOfVoteObjects.push(sumObject);
    }

    return arrayOfVoteObjects;
  };

  const showVotes = async () => {
    const fetchedVotes = await fetchVotes();
    const formattedVotes = formatVotes(fetchedVotes);
    setVotes(formatVotes);
    console.log(formattedVotes);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div>
      {auth.isLoggedIn ? (
        isLoading ? (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        ) : error ? (
          <MessageModal message={error} onClear={clearError} itIsAnError />
        ) : (
          <>
            <h1>Your votes</h1>
            <Button variant="contained" onClick={showVotes}>
              Show my votes!
            </Button>
            <UserVotesTable votes={votes} />
          </>
        )
      ) : (
        <div>Please log in to see your votes!</div>
      )}
    </div>
  );
};

export default UserVotes;
