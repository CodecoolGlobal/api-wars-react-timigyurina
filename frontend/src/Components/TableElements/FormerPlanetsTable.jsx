import { useState, useContext } from "react";
import { AuthContext } from "../../HooksAndContext/auth-context";
import TablePaginationActions from "./TablePaginationActions";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "./TableElements.css"

const columns = [
  { id: "name", label: "Name" },
  { id: "diameter", label: "Diameter" },
  { id: "climate", label: "Climate" },
  { id: "terrain", label: "Terrain" },
  { id: "surface_water", label: "Surface water percentage" },
  { id: "population", label: "Population" },
  { id: "residents", label: "Residents" },
];

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
  {
    name: "Coruscant",
    rotation_period: "24",
    orbital_period: "368",
    diameter: "12240",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "cityscape, mountains",
    surface_water: "unknown",
    population: "1000000000000",
    residents: [
      "https://swapi.dev/api/people/34/",
      "https://swapi.dev/api/people/55/",
      "https://swapi.dev/api/people/74/",
    ],
    films: [
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T11:54:13.921000Z",
    edited: "2014-12-20T20:58:18.432000Z",
    url: "https://swapi.dev/api/planets/9/",
  },
  {
    name: "Kamino",
    rotation_period: "27",
    orbital_period: "463",
    diameter: "19720",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "ocean",
    surface_water: "100",
    population: "1000000000",
    residents: [
      "https://swapi.dev/api/people/22/",
      "https://swapi.dev/api/people/72/",
      "https://swapi.dev/api/people/73/",
    ],
    films: ["https://swapi.dev/api/films/5/"],
    created: "2014-12-10T12:45:06.577000Z",
    edited: "2014-12-20T20:58:18.434000Z",
    url: "https://swapi.dev/api/planets/10/",
  },
];

const FormerPlanetsTable = ({planets}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const auth = useContext(AuthContext);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - planets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        id="planetsTable"
        sx={{ minWidth: 500 }}
        stickyHeader
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                style={{
                  background: "#1976d2",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                {column.label}
              </TableCell>
            ))}
            {!auth.isLoggedIn && (
              <TableCell
                key="vote"
                align="center"
                style={{
                  background: "#1976d2",
                  color: "white",
                  fontWeight: "700",
                }}
              >
                Vote
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? planets.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : planets
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.diameter}</TableCell>
              <TableCell align="center">{row.climate}</TableCell>
              <TableCell align="center">{row.terrain}</TableCell>
              <TableCell align="center">{row.surface_water}</TableCell>
              <TableCell align="center">{row.population}</TableCell>
              <TableCell align="center">
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
              </TableCell>
              {!auth.isLoggedIn && (
                <TableCell align="center">
                  <Button size="small" variant="contained">
                    Vote
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={8}
              count={planets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default FormerPlanetsTable;
