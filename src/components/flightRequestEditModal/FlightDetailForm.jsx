import Modal from "@mui/material/Modal";
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
  Box,
  Typography,
  Stack,
  TextareaAutosize,
  InputAdornment,
  CircularProgress,
  IconButton,
  Popover,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RemoveIcon from "@mui/icons-material/Remove";
import ApiService from "../../api.service";
import React, { useEffect, useState, useRef } from "react";
import {
  generateDateNearestFiveMinutes,
  getMinTime,
} from "../../utilis/dateFormat";
import { useSnackbar } from "notistack";
import TravelersModal from "./FlightDetailForm";
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
  const [travelerAnchorEl, setTravelerAnchorEl] = useState(null);
  const [errorTravelerMessage, setTravelerMessage] = useState("");
  const dropDownContainer = useRef();

  let initialValues = {
    to: "",
    from: "",
    username: "",
    start_time: generateDateNearestFiveMinutes(),
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

  const dataTest = [
    {
      _id: "66d1f4d1fc72f157fe8bbd01",
      start_time: "2024-11-01T09:00:00.000Z",
      end_time: "2024-11-01T11:00:00.000Z",
      added_by: "66cfa28a58d84f6c24b49201",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "66d1f4e1fc72f157fe8bbd02",
      start_time: "2024-11-02T13:00:00.000Z",
      end_time: "2024-11-02T15:00:00.000Z",
      added_by: "66cfa28a58d84f6c24b49201",
      reason: "other",
      __v: 0,
    },
    {
      _id: "66dcdbec8295c62b39413d03",
      start_time: "2024-11-03T10:00:00.000Z",
      end_time: "2024-11-03T12:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "66e0d8c7a8e1a3d64a500a04",
      start_time: "2024-11-04T20:25:00.000Z",
      end_time: "2024-11-04T22:25:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "66e1f9f92a382f1a305dee05",
      start_time: "2024-11-05T09:15:00.000Z",
      end_time: "2024-11-05T10:45:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "66e1fadbebfea1fc166e4536",
      start_time: "2024-11-06T14:00:00.000Z",
      end_time: "2024-11-06T16:00:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "other",
      __v: 0,
    },
    {
      _id: "66e1fadfebfea1fc166e4547",
      start_time: "2024-11-07T17:30:00.000Z",
      end_time: "2024-11-07T19:00:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "66e1faebebfea1fc166e4548",
      start_time: "2024-11-08T08:00:00.000Z",
      end_time: "2024-11-08T10:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "66e1fb12ebfea1fc166e4549",
      start_time: "2024-11-09T21:30:00.000Z",
      end_time: "2024-11-09T23:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "other",
      __v: 0,
    },
    {
      _id: "66e1fb38d7507f39da35cfb0",
      start_time: "2024-11-10T11:00:00.000Z",
      end_time: "2024-11-10T13:00:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "66e1fb58a16c652fbe064231",
      start_time: "2024-11-11T07:30:00.000Z",
      end_time: "2024-11-11T09:45:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "66e1fb9156ec9d8715c7ec73",
      start_time: "2024-11-12T15:00:00.000Z",
      end_time: "2024-11-12T16:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "66e1fbcf642fadc1601a9d41",
      start_time: "2024-11-13T12:00:00.000Z",
      end_time: "2024-11-13T14:00:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "66e1fc749238d0f374f48492",
      start_time: "2024-11-14T10:00:00.000Z",
      end_time: "2024-11-14T12:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "66e1fd9017fc9446aa3c411d",
      start_time: "2024-11-15T18:00:00.000Z",
      end_time: "2024-11-15T19:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "other",
      __v: 0,
    },
    {
      _id: "66e1fdb70a310f255fbe3f90",
      start_time: "2024-11-16T14:00:00.000Z",
      end_time: "2024-11-16T16:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "66e1fde4e8cb60fced8b0241",
      start_time: "2024-11-17T09:15:00.000Z",
      end_time: "2024-11-17T11:15:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "6715eec07483debd10d7beb9",
      start_time: "2024-11-18T12:30:00.000Z",
      end_time: "2024-11-18T14:30:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "maintenance",
      __v: 0,
    },
    {
      _id: "6715f3187483debd10d7bf09",
      start_time: "2024-11-19T15:00:00.000Z",
      end_time: "2024-11-19T17:00:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
    {
      _id: "6715f6ff7483debd10d7bf2a",
      start_time: "2024-11-20T11:00:00.000Z",
      end_time: "2024-11-20T13:00:00.000Z",
      added_by: "66d427fe26dcffc9928fc7ee",
      reason: "unavailability",
      __v: 0,
    },
  ];

  function generateIntervals(startDate, endDate, min) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const intervals = [];

    if (!end) {
      return [start];
    }

    if (start >= end) {
      throw new Error("Start date must be earlier than end date");
    }

    while (start <= end) {
      intervals.push(new Date(start).toISOString());
      start.setMinutes(start.getMinutes() + min);
    }

    return intervals;
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function getDisableInterval(month, year) {
    setStartDateLoading(true);
    const startDate = new Date(year, month, 1);
    startDate.setDate(startDate.getDate() - 2);

    const endDate = new Date(year, month + 1, 2);

    console.log("startDate", startDate);
    console.log("endDate", endDate);

    try {
      const res = await ApiService.get(
        `get-month-Unavailablities?month=${month}&year=${year}`
      );

      const newIntervalSet = new Set();
      res.forEach((d) => {
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
                value={new Date(formik.values.start_time)}
                onChange={(date) => formik.setFieldValue("start_time", date)}
                slotProps={{
                  textField: {
                    helperText:
                      formik.touched.start_time && formik.errors.start_time,
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
                label="Flight end Time"
                format="dd/MM/yyyy h:m a"
                value={new Date(formik.values.end_time)}
                onChange={(date) => formik.setFieldValue("end_time", date)}
                minDate={formik.values.start_time}
                minTime={getMinTime(
                  formik.values.start_time,
                  formik.values.end_time
                )}
                slotProps={{
                  textField: {
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