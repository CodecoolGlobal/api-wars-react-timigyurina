import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#002984",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingRight: 5,
    paddingLeft: 5,
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

const emphasisedItem = {
  fontSize: "16px",
  fontWeight: "700",
};

const DesktopTable = ({
  planets,
  auth,
  formatPopulation,
  residentsButtonClicked,
  voteButtonClicked,
}) => {
  return (
    <Table
      sx={{ minWidth: 350 }}
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
          {auth.isLoggedIn && (
            <StyledTableCell align="center">Vote</StyledTableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {planets.map((planet) => (
          <StyledTableRow key={planet.name}>
            <StyledTableCell component="th" scope="row" sx={emphasisedItem}>
              {planet.name}
            </StyledTableCell>
            <StyledTableCell align="center">
              {planet.diameter} km
            </StyledTableCell>
            <StyledTableCell align="center">{planet.climate}</StyledTableCell>
            <StyledTableCell align="center">{planet.terrain}</StyledTableCell>
            <StyledTableCell align="center">
              {planet.surface_water === "unknown"
                ? planet.surface_water
                : planet.surface_water + "%"}
            </StyledTableCell>
            <StyledTableCell align="center">
              {formatPopulation(planet.population)}
            </StyledTableCell>
            <StyledTableCell align="center">
              {planet.residents.length > 0 ? (
                <Button
                  size="small"
                  variant="outlined"
                  style={{ fontSize: "10px" }}
                  onClick={() =>
                    residentsButtonClicked(planet.url, planet.name)
                  }
                >
                  {planet.residents.length}{" "}
                  {planet.residents.length > 1 ? "residents" : "resident"}
                </Button>
              ) : (
                "No known residents"
              )}
            </StyledTableCell>
            {auth.isLoggedIn && (
              <StyledTableCell align="center">
                <Button
                  onClick={() => voteButtonClicked(planet.url, planet.name)}
                  size="small"
                  variant="contained"
                >
                  Vote
                </Button>
              </StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DesktopTable;
