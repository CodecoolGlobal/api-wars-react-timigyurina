import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ResidentsTable from "../TableElements/ResidentsTable";
import ModalBase from "./ModalBase";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  maxHeight:"90vh",
  overflowY: "auto"
};

const buttonStyles = {
  alignSelf: "end",
};

const ResidentsModal = ({
  planet,
  residents,
  residentsModalIsOpenedFromParent,
  parentCallback,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(residentsModalIsOpenedFromParent);
  }, [residentsModalIsOpenedFromParent]);

  const handleClose = () => {
    setOpen(false);
    parentCallback(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <ModalBase open={open} handleClose={handleClose} boxStyle={style}>
        <button onClick={handleClose} style={buttonStyles}>
          <CloseIcon />
        </button>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Residents of {planet}
        </Typography>

        <ResidentsTable residents={residents} />

        <Button onClick={handleClose} variant="outlined" sx={buttonStyles}>
          Close
        </Button>
      </ModalBase>
    </div>
  );
};

export default ResidentsModal;
