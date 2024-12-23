import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, Stack, TextField } from "@mui/material";
import { flightMaintainceUnavailablitySchema } from "../../schema/validateSchema";
import ApiService from "../../api.service";
import {
  generateDateNearestFiveMinutes,
  generateEndDateAndTimeNearestFiveMinutes,
  generateForwardDateNearestFiveMinutes,
  getDateForUnavailability,
  getMinTime,
} from "../../utilis/dateFormat";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
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

export default function FlightMaintainceUnavailablityEditAddModal({
  open,
  setOpen,
  data,
  reason,
  onRequestComplete,
}) {
  const { enqueueSnackbar } = useSnackbar();

  let initialValues = {
    edit_by: "",
    end_time: generateEndDateAndTimeNearestFiveMinutes(),
    reason: "",
    start_time: generateDateNearestFiveMinutes(),
    comment_by_admin: "",
  };

  if (data) {
    initialValues = {
      edit_by: data.edit_by,
      end_time: data.end_time,
      reason: data.reason,
      start_time: data.start_time,
      comment_by_admin: data.comment_by_admin,
    };
  }

  const submitHandler = async (values) => {
    try {
      let res;
      if (data) {
        res = await ApiService.put(`admin/flight-unavailability/${data.id}`, {
          ...values,
          start_time: values.start_time,
          end_time: values.end_time,
          reason,
        });
      } else {
        res = await ApiService.post("admin/flight-unavailability", {
          ...values,
          start_time: values.start_time,
          end_time: values.end_time,
          reason,
        });
      }

      handleClose();
      onRequestComplete && onRequestComplete(res);
      enqueueSnackbar(
        data
          ? "Flight unavailability has been updated."
          : "Flight unavailability has been created.",
        {
          variant: "success",
        }
      );
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
      return `${label} Maintenance Unavailability`;
    }

    return `${label} Flight Unavailability`;
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack direction="column">
                <DateTimePicker
                  fullWidth
                  format="dd/MM/yyyy h:m a"
                  id="start_time"
                  name="start_time"
                  label="Start Time"
                  value={generateForwardDateNearestFiveMinutes()}
                  minDate={getDateForUnavailability()}
                  minTime={getDateForUnavailability()}
                  onChange={(date) => formik.setFieldValue("start_time", date)}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    field: {
                      readOnly: true,
                    },
                    textField: {
                      helperText:
                        formik.touched.start_time && formik.errors.start_time,
                    },
                  }}
                  sx={{ mt: 2 }}
                />

                <DateTimePicker
                  fullWidth
                  format="dd/MM/yyyy h:m a"
                  id="end_time"
                  name="end_time"
                  label="End Time"
                  value={new Date(formik.values.end_time)}
                  minDate={formik.values.start_time}
                  minTime={getMinTime(
                    formik.values.start_time,
                    formik.values.end_time
                  )}
                  onChange={(date) => formik.setFieldValue("end_time", date)}
                  onBlur={formik.handleBlur}
                  slotProps={{
                    field: {
                      readOnly: true,
                    },
                    textField: {
                      helperText:
                        formik.touched.end_time && formik.errors.end_time,
                      // error:  formik.touched.start_time &&
                      // Boolean(formik.errors.start_time)
                    },
                  }}
                  sx={{ mt: 2 }}
                />
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
                  rows={2}
                  sx={{ mt: 2 }}
                />
              </Stack>
            </LocalizationProvider>
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
