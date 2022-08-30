import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ResidentsTable from "../TableElements/ResidentsTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ResidentsModal = ({ planet, residents, residentsModalIsOpenedFromParent, parentCallback }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(residentsModalIsOpenedFromParent);
  }, [residentsModalIsOpenedFromParent]);

  const handleClose = () => {
      setOpen(false);
      parentCallback(false)
}

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Residents of {planet}
            </Typography>

            <ResidentsTable residents={residents} />

            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ResidentsModal;
