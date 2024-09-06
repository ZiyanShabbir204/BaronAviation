import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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

export default function DeleteModal({ open, setOpen,text }) {
 
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="10px"
          >
            <WarningAmberIcon color="error" />
            <Typography id="modal-modal-title" variant="h5" component="h2" align="center">
              Delete
            </Typography>
          </Stack>

          <Typography id="modal-modal-description" sx={{ mt: 4 }} align="center">
            Are you sure you want to delete {text} ?
          </Typography>

          <Stack
            flexDirection="row"
            justifyContent="space-around"
            marginTop="20px"
          >
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleClose}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
