import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Stack, TextField } from "@mui/material";
import { flightMaintainceUnavailablitySchema } from "../../schema/validateSchema";
import {
  getMinTime,
  getToday,
  oneMonthFromToday,
} from "../../utilis/dateFormat";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
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

export default function FlightMaintainceUnavailablityEditAddModal({}) {
  let initialValues = {
    end_time: oneMonthFromToday(),
    start_time: getToday(),
  };

  const submitHandler = async (values) => {
    console.log("values", values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: flightMaintainceUnavailablitySchema,
    onSubmit: submitHandler,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={(value) => setFieldValue("birthday", value, true)}
              value={values.birthday}
              re
              renderInput={(params) => (
                <TextField
                  error={Boolean(touched.birthday && errors.birthday)}
                  helperText={touched.birthday && errors.birthday}
                  label="Birthday"
                  margin="normal"
                  name="birthday"
                  variant="standard"
                  fullWidth
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
    </form>
  );
}
