import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: 400,
  width: "50%",
  border: 0,
  borderRadius: "5px",
};

export default function TransferOwnerShipModal({
  open,
  setOpen,
  text,
  onTransfer,
  onRequestComplete,
}) {
  const [transfering, setTransfering] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setOpen(false);

  const tranferHandler = async () => {
    try {
    setTransfering(true);
      const res = await onTransfer();
      onRequestComplete(res);
      handleClose();
    } catch (err) {
      console.log("error in TransferModal -> tranferHandler", err);
      const message = err.response.data.message;
      setError(message);
    } finally {
        setTransfering(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && (
            <Typography color="warning" align="center">
              {error}
            </Typography>
          )}
          <Stack
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <WarningAmberIcon color="error" />
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              align="center"
            >
              Transfer
            </Typography>
          </Stack>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 1 }}
            align="center"
          >
            Are you sure you want to Tranfer OwnerShip to <strong>{text}</strong>?
          </Typography>

          <Stack
            flexDirection="row"
            justifyContent="space-between"
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
              onClick={tranferHandler}
              disabled={transfering}
            >
              Transfer
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
