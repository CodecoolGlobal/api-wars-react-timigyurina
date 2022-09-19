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

const UserVotesTable = ({ votes }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={styledCell}>
                <div className="votingStatsPlanetName">Planet Name</div>
                {/* <TextField
                  id="searchPlanetName"
                  label="Search name of planet"
                  type="search"
                  variant="standard"
                  color="secondary"
                  sx={[
                    { input: { padding: "0 0 4px", margin: "0 0 8px" } },
                    { label: { fontSize: "14px" } },
                  ]}
                /> */}
              </TableCell>
              <TableCell
                sx={{ fontSize: "16px", fontWeight: "700" }}
                align="center"
              >
                <span>Vote count</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {votes.map((vote) => (
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

export default UserVotesTable;
