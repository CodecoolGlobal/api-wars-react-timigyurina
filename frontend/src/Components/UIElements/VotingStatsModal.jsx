import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import VotingStatsTable from "../TableElements/VotingStatsTable";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const buttonStyles = {
  alignSelf: "end",
};

const VotingStatsModal = ({
  votes,
  votingStatsModalIsOpenedFromParent,
  parentCallback,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(votingStatsModalIsOpenedFromParent);
  }, [votingStatsModalIsOpenedFromParent]);

  const handleClose = () => {
    setOpen(false);
    parentCallback(false);
  };

  return (
    <div>
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
            <button onClick={handleClose} style={buttonStyles}>
              <CloseIcon />
            </button>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Voting statistics
            </Typography>

            <VotingStatsTable votes={votes} />

            <Button onClick={handleClose} variant="outlined" sx={buttonStyles}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default VotingStatsModal;
