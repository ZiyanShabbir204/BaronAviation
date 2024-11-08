import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Button, Box, Typography, Stack, IconButton } from "@mui/material";
import ApiService from "../../api.service";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { dateFormat } from "../../utilis/dateFormat";
import {
  dateFilterOperators,
  numericFilterOperators,
  stringFilterOperators,
} from "../../utilis/gridFilterFormat";
import HoursLogDataGrid from "../HoursLogDataGrid/HoursLogDataGrid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function HoursLogModal({
  open,
  setOpen,
  data,
  onRequestComplete,
}) {
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Close Icon in top-right corner */}
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            position: "absolute", 
            top: 8, 
            right: 8, 
            m: -1,
            color: "red" 
          }}
        >
          <CloseIcon />
        </IconButton>
        <HoursLogDataGrid value={data._id} />
      </Box>
    </Modal>
  );
}