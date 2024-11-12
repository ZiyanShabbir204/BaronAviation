import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import { Stack, TextField, Button } from "@mui/material";
import { flightTimeLogDataSchema } from "../../schema/validateSchema";
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

export default function FlightTimeLogDatePicker({ onFilter }) {
  let initialValues = {
    end_time: getToday() ,
    start_time:oneMonthFromToday()  ,
    type: "createdAt"
  };


  const submitHandler = async (values) => {
    onFilter(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: flightTimeLogDataSchema,
    onSubmit: submitHandler,
  });
  useEffect(() => {
    onFilter(initialValues);
  }, []);

  return (
    // <Stack direction="row" justifyContent="flex-end">
    <form onSubmit={formik.handleSubmit}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        justifyContent="center"
      >
        <Select
          labelId="demo-select-small-label"
          id="type"
          name="type"
          label="Type"
          value={formik.values.type}
          onChange={(e) => formik.setFieldValue("type", e.target.value)}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          size="small"
          autoWidth
        >
          <MenuItem value={"start_time"}>Flight Start Time</MenuItem>
          <MenuItem value={"createdAt"}>Flight Booked At</MenuItem>
        </Select>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={4} alignItems="center">
            <DatePicker
              fullWidth
              id="start_time"
              name="start_time"
              label="Start Date"
              value={new Date(formik.values.start_time)}
              onChange={(date) => formik.setFieldValue("start_time", date)}
              onBlur={formik.handleBlur}
              slotProps={{
                textField: {
                  helperText:
                    formik.touched.start_time && formik.errors.start_time,
                  size: "small",
                },
              }}
              sx={{ mt: 2 }}
            />

            <DatePicker
              fullWidth
              id="end_time"
              name="end_time"
              label="End Date"
              value={new Date(formik.values.end_time)}
              minDate={formik.values.start_time}
              minTime={getMinTime(
                formik.values.start_time,
                formik.values.end_time
              )}
              onChange={(date) => formik.setFieldValue("end_time", date)}
              onBlur={formik.handleBlur}
              slotProps={{
                textField: {
                  helperText: formik.touched.end_time && formik.errors.end_time,
                  size: "small",
                },
              }}
              sx={{ mt: 2 }}
            />
          </Stack>
        </LocalizationProvider>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          type="submit"
        >
          Search
        </Button>
      </Stack>
    </form>
  );
}
