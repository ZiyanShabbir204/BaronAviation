import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import {
  editHoursSchema,
  flightRequestEditModalSchema,
} from "../../schema/validateSchema";

import AddIcon from "@mui/icons-material/Add";

import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import ApiService from "../../api.service";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function EditHourModal({ open, setOpen, data }) {
  const [error, setError] = useState("");

  const handleClose = () => setOpen(false);

  const submitHandler = async (values) => {
    try {
      await ApiService.put("admin/cooperate-customer/hours", {
        ...values,
        user_id: data.id,
      });
      handleClose();
    } catch (err) {
      console.log("Error in FlightRequestEditAddModal -> submitHandler", err);
      const errorMessage = err.response.data.message || err.response.data.error;
      setError(errorMessage);
    }
  };

  const formik = useFormik({
    initialValues: {
      new_total_hours: data.hours.total_hours,
      new_used_hours: data.hours.used_hours,
    },
    validationSchema: editHoursSchema,
    onSubmit: submitHandler,
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography component="h1" variant="h5">
          Edit hours
        </Typography>
        {error && (
          <Typography color="warning" align="center">
            {error}
          </Typography>
        )}
        <form style={{ marginTop: "20px" }} onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <TextField
              fullWidth
              id="new_total_hours"
              name="new_total_hours"
              label="Total Hours"
              type="number"
              value={formik.values.new_total_hours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.new_total_hours &&
                Boolean(formik.errors.new_total_hours)
              }
              helperText={
                formik.touched.new_total_hours && formik.errors.new_total_hours
              }
            />
            <TextField
              fullWidth
              id="new_used_hours"
              name="new_used_hours"
              label="Used Hours"
              type="number"
              value={formik.values.new_used_hours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.new_used_hours &&
                Boolean(formik.errors.new_used_hours)
              }
              helperText={
                formik.touched.new_used_hours && formik.errors.new_used_hours
              }
            />
            <Stack flexDirection="row" justifyContent="space-between">
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
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
