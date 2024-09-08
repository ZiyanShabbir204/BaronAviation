import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { flightRequestEditModalSchema } from "../../schema/validateSchema";

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

export default function FlightRequestEditAddModal({
  open,
  setOpen,
  data,
  onRequestComplete,
}) {
  const [error, setError] = useState("");
  let initialValues = {
    to: "",
    from: "",
    username: "",
    start_time: "",
  };

  if (data) {
    initialValues = {
      to: data.to,
      from: data.from,
      username: data.username,
      start_time: data.start_time,
    };
  }
  const handleClose = () => setOpen(false);

  const submitHandler = async (values) => {
    try {
      //Todo change when update date and time picker
      const res = await ApiService.post("flight-booking", {
        ...values,
        start_time: "2024-02-25T10:00:00Z",
      });
      onRequestComplete && onRequestComplete(res);
      handleClose();
    } catch (err) {
      console.log("Error in FlightRequestEditAddModal -> submitHandler", err);
      const errorMessage = err.response.data.message || err.response.data.error;
      setError(errorMessage);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: flightRequestEditModalSchema,
    onSubmit: submitHandler,
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
            {data ? "Edit" : "Add"} flight request
          </Typography>
          {error && (
            <Typography color="warning" align="center">
              {error}
            </Typography>
          )}
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
              id="username"
              name="username"
              label="Username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
              justifyContent="space-between"
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
                type="submit"
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
