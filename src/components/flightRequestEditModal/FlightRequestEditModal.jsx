import { useState } from "react";

import Modal from "@mui/material/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useFormik } from "formik";
import {
  flightRequestEditModalSchema,
  validationSchema,
} from "../../schema/validateSchema";

import AddIcon from '@mui/icons-material/Add';

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
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

export default function FlightRequestEditModal({ open, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      to: "",
      from: "",
      handle_by: "",
      start_time: "",
    },
    validationSchema: flightRequestEditModalSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <Typography component="h1" variant="h5">
            Edit
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="to"
              name="to"
              label="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.to && Boolean(formik.errors.to)}
              helperText={formik.touched.to && formik.errors.to}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="from"
              name="from"
              label="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.from && Boolean(formik.errors.from)}
              helperText={formik.touched.from && formik.errors.from}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="handle_by"
              name="handle_by"
              label="Handle By"
              type="text"
              value={formik.values.handle_by}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.handle_by && Boolean(formik.errors.handle_by)
              }
              helperText={formik.touched.handle_by && formik.errors.handle_by}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="start_time"
              name="start_time"
              label="Start Time"
              type="text"
              value={formik.values.start_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.start_time && Boolean(formik.errors.start_time)
              }
              helperText={formik.touched.start_time && formik.errors.start_time}
              sx={{ mt: 2 }}
            />

            <Stack sx={{ mt: 1 }}></Stack>
            <Stack
              flexDirection="row"
              justifyContent='space-between'
              marginTop="20px"
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClose}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
