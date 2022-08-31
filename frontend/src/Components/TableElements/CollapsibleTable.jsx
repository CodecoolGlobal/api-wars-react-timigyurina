import { useState } from "react";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#002984",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingRight: 1,
    paddingLeft: 1,
  },
}));

const emphasisedItem = {
  fontSize: "14px",
  fontWeight: "700",
};

const narrowPadding = {
  padding: "2px",
};

function Row({
  planet,
  residentsButtonClicked,
  voteButtonClicked,
  formatPopulation,
  auth,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* These are the main cells of a row */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={narrowPadding}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={emphasisedItem}
        >
          {planet.name}
        </TableCell>
        <TableCell align="center" sx={narrowPadding}>
          {formatPopulation(planet.population)}
        </TableCell>
        <TableCell align="center" sx={narrowPadding}>
          {planet.residents.length > 0 ? (
            <Button
              size="small"
              variant="outlined"
              style={{ fontSize: "10px" }}
              onClick={() => residentsButtonClicked(planet.url, planet.name)}
            >
              {planet.residents.length}{" "}
              {planet.residents.length > 1 ? "residents" : "resident"}
            </Button>
          ) : (
            "No known residents"
          )}
        </TableCell>
        {auth.isLoggedIn && (
          <TableCell align="center" sx={narrowPadding}>
            <Button
              onClick={() => voteButtonClicked(planet.url, planet.name)}
              size="small"
              variant="contained"
            >
              Vote
            </Button>
          </TableCell>
        )}
      </TableRow>
      {/* These are the collapsible cells of a row */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Diameter</TableCell>
                    <TableCell align="center">Climate</TableCell>
                    <TableCell align="center">Terrain</TableCell>
                    <TableCell align="center">Surface water</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={planet.name}>
                    <TableCell component="th" scope="row" align="center">
                      {planet.diameter} km
                    </TableCell>
                    <TableCell align="center">{planet.climate}</TableCell>
                    <TableCell align="center">{planet.terrain}</TableCell>
                    <TableCell align="center">
                      {planet.surface_water === "unknown"
                        ? planet.surface_water
                        : planet.surface_water + "%"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const CollapsibleTable = ({
  planets,
  auth,
  residentsButtonClicked,
  voteButtonClicked,
  formatPopulation,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center" sx={emphasisedItem}>
              Name
            </StyledTableCell>
            <StyledTableCell align="center">Population</StyledTableCell>

            <StyledTableCell align="center">Residents</StyledTableCell>
            {auth.isLoggedIn && (
              <StyledTableCell align="center">Vote</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {planets.map((planet) => (
            <Row
              key={planet.name}
              planet={planet}
              auth={auth}
              residentsButtonClicked={residentsButtonClicked}
              voteButtonClicked={voteButtonClicked}
              formatPopulation={formatPopulation}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
