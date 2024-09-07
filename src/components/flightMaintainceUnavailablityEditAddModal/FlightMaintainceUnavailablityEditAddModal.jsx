import { useState } from "react";

import Modal from "@mui/material/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useFormik } from "formik";

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
import { flightMaintainceUnavailablitySchema } from "../../schema/validateSchema";
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

export default function FlightMaintainceUnavailablityEditAddModal({ open, setOpen ,param,flag}) {
  
  const handleClose = () => setOpen(false);
  const formik =  useFormik({
    initialValues:  param ?{
      edit_by: param?.edit_by,
      end_time: param?.end_time,
      reason: param?.reason,
      start_time: param?.start_time,
    } : {
      edit_by: "",
      end_time: "",
      reason: "",
      start_time: "",
    } ,
    validationSchema: flightMaintainceUnavailablitySchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  

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
            {param ? "Edit" : "Add"}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
           
            <TextField
              fullWidth
              id="end_time"
              name="end_time"
              label="end_time"
              value={formik.values.end_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.end_time && Boolean(formik.errors.end_time)}
              helperText={formik.touched.end_time && formik.errors.end_time}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="reason"
              name="reason"
              label="Reason"
              type="text"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.reason && Boolean(formik.errors.reason)
              }
              helperText={formik.touched.reason && formik.errors.reason}
              sx={{ mt: 2 }}
            />
             <TextField
              fullWidth
              id="edit_by"
              name="edit_by"
              label="edit_by"
              value={formik.values.edit_by}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.edit_by && Boolean(formik.errors.edit_by)}
              helperText={formik.touched.edit_by && formik.errors.edit_by}
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
