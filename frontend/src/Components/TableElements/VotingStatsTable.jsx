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

const VotingStatsTable = ({ votes }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={emphasisedItem}>Planet Name</TableCell>
              <TableCell sx={emphasisedItem} align="center">
                Received votes
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

export default VotingStatsTable;
