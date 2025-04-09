import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { flightRequestEditModalSchema } from "../../schema/validateSchema";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  CircularProgress,
  IconButton,
  Popover,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import ApiService from "../../api.service";
import React, { useEffect, useState, useRef } from "react";
import { getMinTime } from "../../utilis/dateFormat";
import EastIcon from "@mui/icons-material/East";
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

export default function FlightDetailForm({
  data,
  onSubmit,
  isEditState,
  onCancel,
}) {
  const [intervalSet, setIntervalSet] = useState(new Set());
  const [startDateLoading, setStartDateLoading] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startTimeError, setStartTimeError] = useState("");
  const [travelerAnchorEl, setTravelerAnchorEl] = useState(null);
  const [errorTravelerMessage, setTravelerMessage] = useState("");
  const dropDownContainer = useRef();

  let initialValues = {
    to: "",
    from: "",
    username: "",
    start_time: undefined,
    end_time: "",
    comment_by_admin: "",
  };

  useEffect(() => {
    if (data) {
      setAdults(data.adults);
      setChildren(data.children);
      formik.setValues({
        to: data.to,
        from: data.from,
        username: data.username,
        start_time: data.start_time,
        end_time: !!data.end_time ? data.end_time : undefined,
        comment_by_admin: data.comment_by_admin,
      });
    }
  }, [data]);
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentActiveDD("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const submitHandler = (values) => {
    if (startTimeError) return;
    onSubmit({
      ...values,
      adults,
      children,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: flightRequestEditModalSchema,
    onSubmit: submitHandler,
  });

  function generateIntervals(startDate, endDate, min) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const intervals = [];

    if (!end) {
      return [start];
    }

    if (start >= end) {
      console.error("Start date must be earlier than end date");
      return [];
    }

    while (start <= end) {
      intervals.push(new Date(start).toISOString());
      start.setMinutes(start.getMinutes() + min);
    }

    return intervals;
  }

  async function getDisableInterval(month, year) {
    setStartDateLoading(true);
    try {
      const { flights, unavailability } = await ApiService.get(
        `get-month-Unavailablities?month=${month}&year=${year}`
      );

      const newIntervalSet = new Set();
      unavailability.forEach((d) => {
        const intervals = generateIntervals(d.start_time, d.end_time, 5);
        intervals.forEach((i) => newIntervalSet.add(i));
      });

      flights.forEach((d) => {
        const intervals = generateIntervals(d.start_time, d.end_time, 5);
        intervals.forEach((i) => newIntervalSet.add(i));
      });
      setIntervalSet(newIntervalSet);
      setStartDateLoading(false);
    } catch (err) {
      console.error("err -> getDisableInterval", err);
    }
  }

  const dateChangeHandler = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    getDisableInterval(month, year);
  };

  const handleTravelerClick = (event) => {
    setTravelerAnchorEl(event.currentTarget);
  };

  const handleTravelerClose = () => {
    setTravelerAnchorEl(null);
  };

  const handleIncrease = (setter, value) => {
    if (adults + children < 5) {
      setter(value + 1);
    } else {
      setTravelerMessage("Only up to 5 travelers are allowed.");
    }
  };

  const handleDecrease = (setter, value) => {
    if (value > 0 && adults + children > 1) {
      setter(value - 1);
      setTravelerMessage("");
    }
  };

  const changeStartTimeHandler = (date) => {
    formik.setFieldValue("start_time", date);

    const inIsoFormat = date.toISOString();
    const isDisable = intervalSet.has(inIsoFormat);
    if (isDisable) {
      setStartTimeError("Selected date and time is not available");
    } else {
      setStartTimeError("");
    }
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          style={{
            maxHeight: "calc(100vh - 260px)",
            overflowY: "auto",
          }}
        >
          <TextField
            fullWidth
            id="from"
            name="from"
            label="From"
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
            label="To"
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
            disabled={isEditState}
            sx={{ mt: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack>
              <DateTimePicker
                fullWidth
                id="start_time"
                name="start_time"
                label="Flight Start Time"
                format="dd/MM/yyyy h:m a"
                value={
                  formik.values.start_time
                    ? new Date(formik.values.start_time)
                    : undefined
                }
                onChange={changeStartTimeHandler}
                slotProps={{
                  field: {
                    readOnly: true,
                  },
                  textField: {
                    placeholder: "Flight Start Time",
                    error: Boolean(
                      (formik.touched.start_time && formik.errors.start_time) ||
                        startTimeError
                    ),
                    helperText:
                      (formik.touched.start_time && formik.errors.start_time) ||
                      startTimeError,
                  },
                }}
                shouldDisableTime={(value, view) => {
                  const inIsoFormat = value.toISOString();
                  return intervalSet.has(inIsoFormat);
                }}
                onMonthChange={dateChangeHandler}
                onYearChange={dateChangeHandler}
                onOpen={() => dateChangeHandler(new Date())}
                loading={startDateLoading}
                renderLoading={() => <CircularProgress />}
                sx={{ mt: 2 }}
              />
            </Stack>

            <Stack>
              <DateTimePicker
                fullWidth
                id="end_time"
                name="end_time"
                label="Flight End Time"
                format="dd/MM/yyyy h:m a"
                value={
                  formik.values.end_time
                    ? new Date(formik.values.end_time)
                    : undefined
                }
                onChange={(date) => formik.setFieldValue("end_time", date)}
                minDate={formik.values.start_time}
                minTime={getMinTime(
                  formik.values.start_time,
                  formik.values.end_time
                )}
                slotProps={{
                  field: {
                    readOnly: true,
                  },
                  textField: {
                    placeholder: "Flight End Time",
                    error: Boolean(
                      formik.touched.end_time && formik.errors.end_time
                    ),
                    helperText:
                      formik.touched.end_time && formik.errors.end_time,
                  },
                }}
                className="flight-end-time"
                sx={{ mt: 2 }}
              />
            </Stack>
          </LocalizationProvider>
          <TextField
            label="Travelers"
            value={`${adults} Adults, ${children} Children`}
            onClick={handleTravelerClick}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupsIcon />
                </InputAdornment>
              ),
            }}
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
              formik.touched.comment_by_admin && formik.errors.comment_by_admin
            }
            multiline
            fullWidth
            rows={2}
            sx={{ mt: 2 }}
          />
        </div>
        <Stack sx={{ mt: 1 }}></Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          marginTop="20px"
        >
          <Button
            variant="outlined"
            color="error"
            onClick={onCancel}
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EastIcon />}
            type="submit"
          >
            Next
          </Button>
        </Stack>
      </form>

      <Popover
        open={Boolean(travelerAnchorEl)}
        anchorEl={travelerAnchorEl}
        onClose={handleTravelerClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "20px", width: "300px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Adults</Typography>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => handleDecrease(setAdults, adults)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{adults}</Typography>
              <IconButton onClick={() => handleIncrease(setAdults, adults)}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Kid (1–10 years)</Typography>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => handleDecrease(setChildren, children)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{children}</Typography>
              <IconButton onClick={() => handleIncrease(setChildren, children)}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>

          {errorTravelerMessage && (
            <Typography variant="caption" align="center" width="100%">
              {errorTravelerMessage}
            </Typography>
          )}
        </div>
      </Popover>
    </>
  );
}
