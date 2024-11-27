import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { flightRequestEditModalSchema } from "../../schema/validateSchema";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import ApiService from "../../api.service";
import { useState } from "react";
import { generateDateNearestFiveMinutes,getMinTime } from "../../utilis/dateFormat";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  let initialValues = {
    to: "",
    from: "",
    username: "",
    start_time: generateDateNearestFiveMinutes(),
    end_time: "",
    comment_by_admin: "",
  };

  if (data) {
    initialValues = {
      to: data.to,
      from: data.from,
      username: data.user?.username,
      start_time: data.start_time,
      end_time: data.end_time,
      comment_by_admin: data.comment_by_admin,
    };
  }
  const handleClose = () => setOpen(false);

  const submitHandler = async (values) => {
    try {
      let res;

      if (data) {
        res = await ApiService.put(`flight-booking/${data.id}`, values);
      } else {
        res = await ApiService.post("flight-booking", values);
      }

      onRequestComplete && onRequestComplete(res);

      enqueueSnackbar(
        data ? "Flight has been updated" : "Flight has been created",
        {
          variant: "success",
        }
      );
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
            {data ? "Edit" : "Add"} Active booking
          </Typography>
          {error && (
            <Typography color="warning" align="center">
              {error}
            </Typography>
          )}
          <form onSubmit={formik.handleSubmit}>
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
              id="username"
              name="username"
              label="Username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              disabled={data}
              sx={{ mt: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack>
                <DateTimePicker
                  fullWidth
                  id="start_time"
                  name="start_time"
                  label="Flight Start Time"
                  format="dd/MM/yyyy h:mm A"
                  value={new Date(formik.values.start_time)}
                  onChange={(date) => formik.setFieldValue("start_time", date)}
                  // onBlur={formik.handleBlur}
                  slotProps={{
                    textField: {
                      helperText:
                        formik.touched.start_time && formik.errors.start_time,
                      // error:  formik.touched.start_time &&
                      // Boolean(formik.errors.start_time)
                    },
                  }}
                  sx={{ mt: 2 }}
                />
              </Stack>

              <Stack>
                <DateTimePicker
                  fullWidth
                  id="end_time"
                  name="end_time"
                  label="Flight end Time"
                  format="dd/MM/yyyy"
                  value={new Date(formik.values.end_time)}
                  onChange={(date) => formik.setFieldValue("end_time", date)}
                  minDate={formik.values.start_time}
                  minTime={getMinTime(
                    formik.values.start_time,
                    formik.values.end_time
                  )}
                  // onBlur={formik.handleBlur}
                  slotProps={{
                    textField: {
                      helperText:
                        formik.touched.end_time && formik.errors.end_time,
                      // error:  formik.touched.start_time &&
                      // Boolean(formik.errors.start_time)
                    },
                  }}
                  className="flight-end-time"
                  sx={{ mt: 2 }}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              id="comment_by_admin"
              label="Comment by admin"
              name="comment_by_admin"
              value={formik.values.comment_by_admin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.comment_by_admin &&
                Boolean(formik.errors.comment_by_admin)
              }
              helperText={
                formik.touched.comment_by_admin &&
                formik.errors.comment_by_admin
              }
              multiline
              fullWidth
              rows={4}
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
