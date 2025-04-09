import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Stack, TextField } from "@mui/material";
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

export default function InvoiceModal({
  open,
  setOpen,
  onSendInvoice,
  onRequestComplete,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState();
  const handleClose = () => setOpen(false);

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const res = await onSendInvoice(invoiceAmount);
      onRequestComplete(res);
      handleClose();
    } catch (err) {
      console.log("error in DeleteModal -> deleteHandler", err);
      const message = err.response.data.message;
      setError(message);
    } finally {
      setLoading(false);
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
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
          >
            Send Invoice
          </Typography>
          <TextField
            label="Enter Invoice Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={invoiceAmount}
            onChange={(evt) => setInvoiceAmount(evt.target.value)}
            sx={{
              marginTop: "20px",
            }}
          />

          <Stack
            flexDirection="row"
            justifyContent="space-between"
            marginTop="20px"
          >
            <Button
              variant="outlined"
              color="warning"
              startIcon={<CloseIcon />}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={loading && <CircularProgress size={24} />}
              onClick={deleteHandler}
              disabled={loading}
            >
              Send Invoice
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
