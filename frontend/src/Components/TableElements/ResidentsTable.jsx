import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const emphasisedItem = {
  fontSize: "16px",
  fontWeight: "700",
};

const ResidentsTable = ({ residents }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={emphasisedItem}>Name</TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Height
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Mass
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Hair colour
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Skin colour
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Eye colour
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Birth year
              </TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Gender
              </TableCell>
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
