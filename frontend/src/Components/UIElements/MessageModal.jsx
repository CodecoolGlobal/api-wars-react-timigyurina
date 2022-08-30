import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid black",
  boxShadow: 24,
  p: 4,
};

const MessageModal = ({
  message,
  onClear,
  moreMessage,
  buttonText = "Close",
  itIsAnError,
}) => {
  const [open, setOpen] = useState(true);
  /*  const handleOpen = () => setOpen(true); */
  const handleClose = () => {
    onClear();
    setOpen(false);
  };

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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={itIsAnError && { color: "#c62828" }}
            >
              {message}
            </Typography>
            {moreMessage && (
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {moreMessage}
              </Typography>
            )}
            <Button
              onClick={handleClose}
              variant="outlined"
              color={itIsAnError ? "error" : "primary"}
            >
              {buttonText}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default MessageModal;
