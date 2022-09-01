import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SortIcon from "@mui/icons-material/Sort";

const emphasisedItem = {
  fontSize: "16px",
  fontWeight: "700",
};

const VotingStatsTable = ({ votes }) => {
  const [currentSortOfVoteNum, setCurrentSortOfVoteNum] = useState("default");
  const [currentSortOfPlanetName, setCurrentSortOfPlanetName] =
    useState("default");

  const voteCountSortTypes = {
    up: {
      fn: (a, b) => a.count - b.count,
    },
    down: {
      fn: (a, b) => b.count - a.count,
    },
    default: {
      fn: (a, b) => a,
    },
  };

  const sortVotes = (currentSort, setCurrentSort) => {
    let nextSort;

    if (currentSort === "default") nextSort = "down";
    else if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "down";

    setCurrentSort(nextSort);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={emphasisedItem}>
                <span>Planet Name</span>
                <IconButton
                  color="secondary"
                  onClick={() =>
                    sortVotes(
                      currentSortOfPlanetName,
                      setCurrentSortOfPlanetName
                    )
                  }
                >
                  <SortIcon />
                </IconButton>
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                <span>Received votes</span>
                <IconButton
                  color="secondary"
                  onClick={() =>
                    sortVotes(currentSortOfVoteNum, setCurrentSortOfVoteNum)
                  }
                >
                  <SortIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {votes.sort(voteCountSortTypes[currentSortOfVoteNum].fn).map((vote) => (
              <TableRow
                key={vote.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {vote.name}
                </TableCell>
                <TableCell align="center">{vote.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VotingStatsTable;
