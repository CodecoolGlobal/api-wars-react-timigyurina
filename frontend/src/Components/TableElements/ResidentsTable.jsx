import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const dummies = [
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    hair_color: "brown",
    skin_color: "light",
    eye_color: "brown",
    birth_year: "19BBY",
    gender: "female",
    homeworld: "https://swapi.dev/api/planets/2/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    species: [],
    vehicles: ["https://swapi.dev/api/vehicles/30/"],
    starships: [],
    created: "2014-12-10T15:20:09.791000Z",
    edited: "2014-12-20T21:17:50.315000Z",
    url: "https://swapi.dev/api/people/5/",
  },
  {
    name: "Bail Prestor Organa",
    height: "191",
    mass: "unknown",
    hair_color: "black",
    skin_color: "tan",
    eye_color: "brown",
    birth_year: "67BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/2/",
    films: ["https://swapi.dev/api/films/5/", "https://swapi.dev/api/films/6/"],
    species: ["https://swapi.dev/api/species/1/"],
    vehicles: [],
    starships: [],
    created: "2014-12-20T16:53:08.575000Z",
    edited: "2014-12-20T21:17:50.463000Z",
    url: "https://swapi.dev/api/people/68/",
  },
  {
    name: "Raymus Antilles",
    height: "188",
    mass: "79",
    hair_color: "brown",
    skin_color: "light",
    eye_color: "brown",
    birth_year: "unknown",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/2/",
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/6/"],
    species: [],
    vehicles: [],
    starships: [],
    created: "2014-12-20T19:49:35.583000Z",
    edited: "2014-12-20T21:17:50.493000Z",
    url: "https://swapi.dev/api/people/81/",
  },
];

const ResidentsTable = ({ residents }) => {
  return (
    <div >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummies.map((resident) => (
              <TableRow
                key={resident.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {resident.name}
                </TableCell>
                <TableCell align="right">{resident.height}</TableCell>
                <TableCell align="right">{resident.mass}</TableCell>
                <TableCell align="right">{resident.hair_color}</TableCell>
                <TableCell align="right">{resident.skin_color}</TableCell>
                <TableCell align="right">{resident.eye_color}</TableCell>
                <TableCell align="right">{resident.birth_year}</TableCell>
                <TableCell align="right">{resident.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResidentsTable;
