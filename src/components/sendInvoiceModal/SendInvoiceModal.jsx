import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, Stack, TextField } from "@mui/material";
import { flightMaintainceUnavailablitySchema, invoiceSendSchema } from "../../schema/validateSchema";
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

export default function SendInvoiceModal({
  open,
  setOpen,
  data,
  onRequestComplete,
}) {
    const[error,setError] = useState(null)
  const { enqueueSnackbar } = useSnackbar();

  let initialValues = {
    bill:""
 
  };

  const submitHandler = async (values) => {
    console.log("dataaaaa",data._id)
    console.log("dataaaaa idd",data.id)

    try {
      let res;
      const response = await ApiService.post(`/invoice/send`,{
        ...values,
        flight_id:data._id,
        user:data.user._id
      })
    //   if (data) {
    //     res = await ApiService.put(`admin/flight-unavailability/${data.id}`, {
    //       ...values,
    //       start_time: values.start_time,
    //       end_time: values.end_time,
    //       reason,
    //     });
    //   } else {
    //     res = await ApiService.post("admin/flight-unavailability", {
    //       ...values,
    //       start_time: values.start_time,
    //       end_time: values.end_time,
    //       reason,
    //     });
    //   }

      handleClose();
      onRequestComplete && onRequestComplete(res);
      enqueueSnackbar(
        "Invoice has been send",
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
    validationSchema: invoiceSendSchema,
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
            Send Invoice
          </Typography>
          <form onSubmit={formik.handleSubmit}>
          <TextField
              fullWidth
              id="bill"
              name="bill"
              label="Invoice Amount"
              type="number"
              value={formik.values.bill}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bill && Boolean(formik.errors.bill)
              }
              helperText={
                formik.touched.bill && formik.errors.bill
              }
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
