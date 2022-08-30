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
import ResidentsModal from "../UIElements/ResidentsModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import MessageModal from "../UIElements/MessageModal";

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

export const PlanetsTable = ({ planets }) => {
  const auth = useContext(AuthContext);

  const [residentsModalIsOpen, setResidentsModalIsOpen] = useState(false);
  const [loadedResidents, setLoadedResidents] = useState([]);
  const [nameOfLoadedPlanet, setNameOfLoadedPlanet] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState();

  const formatPopulation = (population) => {
    const formatted = parseInt(population).toLocaleString();
    return isNaN(parseInt(formatted)) ? "unknown" : `${formatted} people`;
  };

  const emphasisedItem = {
    fontSize: "16px",
    fontWeight: "700",
  };

  const fetchResidents = async (planetId) => {
    setIsModalLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/planets/${planetId}/residents`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      //console.log(data);
      setLoadedResidents(data);
      setIsModalLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsModalLoading(false);
      throw err;
    }
  };

  const residentsButtonClicked = async (urlOfPlanet, nameOfPlanet) => {
    const arr = urlOfPlanet.split("/");
    const idOfPlanet = arr[arr.length - 2];

    setNameOfLoadedPlanet(nameOfPlanet);
    const residents = await fetchResidents(idOfPlanet);
    console.log(residents);

    setResidentsModalIsOpen(true);
  };

  const closeResidentsModal = () => {
    setResidentsModalIsOpen(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      {isModalLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : error ? (
        <MessageModal message={error} onClear={clearError} itIsAnError/>
      ) : (
        <ResidentsModal
          planet={nameOfLoadedPlanet}
          residents={loadedResidents}
          residentsModalIsOpenedFromParent={residentsModalIsOpen}
          parentCallback={closeResidentsModal}
        />
      )}
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
                <StyledTableCell align="center">
                  {planet.climate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {planet.terrain}
                </StyledTableCell>
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
    </>
  );
};
