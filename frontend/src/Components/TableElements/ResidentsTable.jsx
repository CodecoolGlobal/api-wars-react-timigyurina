import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ResidentsTable = ({ residents }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Height</TableCell>
              <TableCell align="center">Mass</TableCell>
              <TableCell align="center">Hair colour</TableCell>
              <TableCell align="center">Skin colour</TableCell>
              <TableCell align="center">Eye colour</TableCell>
              <TableCell align="center">Birth year</TableCell>
              <TableCell align="center">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {residents.map((resident) => (
              <TableRow
                key={resident.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {resident.name}
                </TableCell>
                <TableCell align="center">{resident.height}</TableCell>
                <TableCell align="center">{resident.mass}</TableCell>
                <TableCell align="center">{resident.hair_color}</TableCell>
                <TableCell align="center">{resident.skin_color}</TableCell>
                <TableCell align="center">{resident.eye_color}</TableCell>
                <TableCell align="center">{resident.birth_year}</TableCell>
                <TableCell align="center">{resident.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResidentsTable;
