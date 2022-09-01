import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SortIcon from "@mui/icons-material/Sort";
import "./TableElements.css";

const styledCell = {
  display: "flex",
  alignItems: "baseline",
  gap: "25px",
  fontSize: "16px",
  fontWeight: "700",
};

const VotingStatsTable = ({ votes }) => {
  const [currentSortOfVoteNum, setCurrentSortOfVoteNum] = useState("default");
  const [searchInput, setSearchInput] = useState("");
  const [filteredVotes, setFilteredVotes] = useState(votes);

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

  const filterVotes = (e) => {
    console.log(e.target.value);
    const keyword = e.target.value;
    setSearchInput(e.target.value);

    const results = votes.filter((vote) => {
      return vote.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredVotes(results);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={styledCell}>
                <div className="votingStatsPlanetName">Planet Name</div>
                <TextField
                  id="searchPlanetName"
                  label="Search name of planet"
                  type="search"
                  variant="standard"
                  color="secondary"
                  value={searchInput}
                  onChange={filterVotes}
                  sx={[
                    { input: { padding: "0 0 4px", margin: "0 0 8px" } },
                    { label: { fontSize: "14px" } },
                  ]}
                />
              </TableCell>
              <TableCell
                sx={{ fontSize: "16px", fontWeight: "700" }}
                align="center"
              >
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
            {filteredVotes
              .sort(voteCountSortTypes[currentSortOfVoteNum].fn)
              .map((vote) => (
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
