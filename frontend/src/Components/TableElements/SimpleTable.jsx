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

const dummyData = [
  {
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
    residents: [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/4/",
      "https://swapi.dev/api/people/6/",
      "https://swapi.dev/api/people/7/",
      "https://swapi.dev/api/people/8/",
      "https://swapi.dev/api/people/9/",
      "https://swapi.dev/api/people/11/",
      "https://swapi.dev/api/people/43/",
      "https://swapi.dev/api/people/62/",
    ],
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi.dev/api/planets/1/",
  },
  {
    name: "Alderaan",
    rotation_period: "24",
    orbital_period: "364",
    diameter: "12500",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000",
    residents: [
      "https://swapi.dev/api/people/5/",
      "https://swapi.dev/api/people/68/",
      "https://swapi.dev/api/people/81/",
    ],
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/6/"],
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
    url: "https://swapi.dev/api/planets/2/",
  },
  {
    name: "Yavin IV",
    rotation_period: "24",
    orbital_period: "4818",
    diameter: "10200",
    climate: "temperate, tropical",
    gravity: "1 standard",
    terrain: "jungle, rainforests",
    surface_water: "8",
    population: "1000",
    residents: [],
    films: ["https://swapi.dev/api/films/1/"],
    created: "2014-12-10T11:37:19.144000Z",
    edited: "2014-12-20T20:58:18.421000Z",
    url: "https://swapi.dev/api/planets/3/",
  },
  {
    name: "Dagobah",
    rotation_period: "23",
    orbital_period: "341",
    diameter: "8900",
    climate: "murky",
    gravity: "N/A",
    terrain: "swamp, jungles",
    surface_water: "8",
    population: "unknown",
    residents: [],
    films: [
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T11:42:22.590000Z",
    edited: "2014-12-20T20:58:18.425000Z",
    url: "https://swapi.dev/api/planets/5/",
  },
  {
    name: "Bespin",
    rotation_period: "12",
    orbital_period: "5110",
    diameter: "118000",
    climate: "temperate",
    gravity: "1.5 (surface), 1 standard (Cloud City)",
    terrain: "gas giant",
    surface_water: "0",
    population: "6000000",
    residents: ["https://swapi.dev/api/people/26/"],
    films: ["https://swapi.dev/api/films/2/"],
    created: "2014-12-10T11:43:55.240000Z",
    edited: "2014-12-20T20:58:18.427000Z",
    url: "https://swapi.dev/api/planets/6/",
  },
  {
    name: "Endor",
    rotation_period: "18",
    orbital_period: "402",
    diameter: "4900",
    climate: "temperate",
    gravity: "0.85 standard",
    terrain: "forests, mountains, lakes",
    surface_water: "8",
    population: "30000000",
    residents: ["https://swapi.dev/api/people/30/"],
    films: ["https://swapi.dev/api/films/3/"],
    created: "2014-12-10T11:50:29.349000Z",
    edited: "2014-12-20T20:58:18.429000Z",
    url: "https://swapi.dev/api/planets/7/",
  },
  {
    name: "Naboo",
    rotation_period: "26",
    orbital_period: "312",
    diameter: "12120",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grassy hills, swamps, forests, mountains",
    surface_water: "12",
    population: "4500000000",
    residents: [
      "https://swapi.dev/api/people/3/",
      "https://swapi.dev/api/people/21/",
      "https://swapi.dev/api/people/35/",
      "https://swapi.dev/api/people/36/",
      "https://swapi.dev/api/people/37/",
      "https://swapi.dev/api/people/38/",
      "https://swapi.dev/api/people/39/",
      "https://swapi.dev/api/people/42/",
      "https://swapi.dev/api/people/60/",
      "https://swapi.dev/api/people/61/",
      "https://swapi.dev/api/people/66/",
    ],
    films: [
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T11:52:31.066000Z",
    edited: "2014-12-20T20:58:18.430000Z",
    url: "https://swapi.dev/api/planets/8/",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
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
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.diameter}</StyledTableCell>
              <StyledTableCell align="center">{row.climate}</StyledTableCell>
              <StyledTableCell align="center">{row.terrain}</StyledTableCell>
              <StyledTableCell align="center">
                {row.surface_water}
              </StyledTableCell>
              <StyledTableCell align="center">{row.population}</StyledTableCell>
              <StyledTableCell align="center">
                {row.residents.length > 0 && (
                  <Button
                    size="small"
                    variant="outlined"
                    style={{ fontSize: "10px" }}
                  >
                    {row.residents.length}{" "}
                    {row.residents.length > 1 ? "residents" : "resident"}
                  </Button>
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
