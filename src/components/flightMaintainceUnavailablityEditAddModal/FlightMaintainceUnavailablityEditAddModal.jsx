import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";

import AddIcon from "@mui/icons-material/Add";

import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { flightMaintainceUnavailablitySchema } from "../../schema/validateSchema";
import ApiService from "../../api.service";

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

export default function FlightMaintainceUnavailablityEditAddModal({
  open,
  setOpen,
  data,
  reason,
}) {
  let initialValues = {
    edit_by: "",
    end_time: "",
    reason: "",
    start_time: "",
  };

  if (data) {
    initialValues = {
      edit_by: data.edit_by,
      end_time: data.end_time,
      reason: data.reason,
      start_time: data.start_time,
    };
  }

  const submitHandler = async (values) => {
    try {
      //Todo change when update date and time picker
      await ApiService.post("admin/flight-unavailability", {
        ...values,
        start_time: "2024-02-25T10:00:00Z",
        end_time: "2024-02-25T10:00:00Z",
        reason,
      });
      handleClose();
    } catch (err) {
      console.log("Error in FlightRequestEditAddModal -> submitHandler", err);
      const errorMessage = err.response.data.message || err.response.data.error;
      setError(errorMessage);
    }
  };

  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues,
    validationSchema: flightMaintainceUnavailablitySchema,
    onSubmit: submitHandler,
  });

  const getHeaderLabel = () => {
    let label;

    label = data ? "Edit" : "Add";

    if (reason === "maintenance") {
      return `${label} maintenance unavailability`;
    }

    return `${label} unavailability`;
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
            {getHeaderLabel()}
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
              label="End time"
              value={formik.values.end_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.end_time && Boolean(formik.errors.end_time)}
              helperText={formik.touched.end_time && formik.errors.end_time}
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
