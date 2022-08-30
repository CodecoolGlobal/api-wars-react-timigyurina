import { useState, useContext } from "react";
import { AuthContext } from "../../HooksAndContext/auth-context";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#002984",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const SimpleTable = ({ planets }) => {
  const auth = useContext(AuthContext);

  const formatPopulation = (population) => {
    const formatted = parseInt(population).toLocaleString();
    return isNaN(parseInt(formatted)) ? "unknown" : `${formatted} people`;
  };

  const emphasisedItem = {
    fontSize: "16px",
    fontWeight: "700",
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        id="planetsTable"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={emphasisedItem}>Name</StyledTableCell>
            <StyledTableCell align="center">Diameter</StyledTableCell>
            <StyledTableCell align="center">Climate</StyledTableCell>
            <StyledTableCell align="center">Terrain</StyledTableCell>
            <StyledTableCell align="center">
              Surface Water Percentage
            </StyledTableCell>
            <StyledTableCell align="center">Population</StyledTableCell>
            <StyledTableCell align="center">Residents</StyledTableCell>
            {!auth.isLoggedIn && (
              <StyledTableCell align="center">Vote</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {planets.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" sx={emphasisedItem}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.diameter} km
              </StyledTableCell>
              <StyledTableCell align="center">{row.climate}</StyledTableCell>
              <StyledTableCell align="center">{row.terrain}</StyledTableCell>
              <StyledTableCell align="center">
                {row.surface_water === "unknown"
                  ? row.surface_water
                  : row.surface_water + "%"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {formatPopulation(row.population)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.residents.length > 0 ? (
                  <Button
                    size="small"
                    variant="outlined"
                    style={{ fontSize: "10px" }}
                  >
                    {row.residents.length}{" "}
                    {row.residents.length > 1 ? "residents" : "resident"}
                  </Button>
                ) : (
                  "No known residents"
                )}
              </StyledTableCell>
              {!auth.isLoggedIn && (
                <StyledTableCell align="center">
                  <Button size="small" variant="contained">
                    Vote
                  </Button>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
