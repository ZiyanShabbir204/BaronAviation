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

import RemoveIcon from "@mui/icons-material/Remove";
import ApiService from "../../api.service";
import React, { useEffect, useState, useRef } from "react";
import {
  generateDateNearestFiveMinutes,
  getMinTime,
} from "../../utilis/dateFormat";
import { useSnackbar } from "notistack";
import TravelersModal from "./FlightDetailForm";
import FlightDetailForm from "./FlightDetailForm";
import TravelersFrom from "./TravelersFrom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
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
  const [startDateLoading, setStartDateLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(0);

  const [apiReqData, setApiReqData] = useState({
    flightDetails: undefined,
    travelerDetails: undefined,
  });

  const handleClose = () => setOpen(false);

  const travelFormBackHandler = (values) => {
    console.log("values", values);
    setApiReqData((prev) => ({
      ...prev,
      travelerDetails: [...values.attendants],
    }));
    setValue(0);
  };

  const onSubmitFlightDetail = (values) => {
    setApiReqData((prev) => ({
      ...prev,
      flightDetails: {
        ...values,
      },
    }));
    setValue(1);
  };

  useEffect(() => {
    if (data) {
      console.log("data", data);

      const adultCount = data.attendants.filter(
        (a) => a.type === "Adult"
      ).length;
      const childCount = data.attendants.filter(
        (a) => a.type !== "Adult"
      ).length;
      setApiReqData({
        flightDetails: {
          to: data.to,
          from: data.from,
          username: data.user?.username,
          start_time: data.start_time,
          end_time: data.end_time,
          comment_by_admin: data.comment_by_admin,
          adults: adultCount,
          children: childCount,
        },

        travelerDetails: data.attendants.map((a) => ({
          firstName: a.first_name,
          lastName: a.last_name,
          identityNumber: a.identity_number,
          gender: a.gender,
          age: a.age,
          email: a.email,
          weight: a.weight,
          type: a.type,
        })),
      });
    }
  }, [data]);

  const onSubmitTravelersFrom = async (values) => {
    const apiData = {
      to: apiReqData.flightDetails.to,
      from: apiReqData.flightDetails.from,
      start_time: apiReqData.flightDetails.start_time,
      end_time: apiReqData.flightDetails.end_time,
      username: apiReqData.flightDetails.username,
      attendants: values.attendants.map((a) => ({
        first_name: a.firstName,
        last_name: a.lastName,
        identity_number: a.identityNumber,
        gender: a.gender,
        age: a.age,
        email: a.email,
        weight: a.weight,
        type: a.type,
      })),
    };

    try {
      let res;

      if (data) {
        res = await ApiService.put(`flight-booking/${data.id}`, apiData);
      } else {
        res = await ApiService.post("flight-booking", apiData);
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

          <Tabs
            value={value}
            aria-label="basic tabs example"
            sx={{
              mt: 2,
            }}
          >
            <Tab
              label="Flight Details"
              id="simple-tab-1"
              aria-controls="simple-tabpanel-1"
              disabled
              className="flight-request-tabs"
            />
            <Tab
              label="Traveler Details"
              id="simple-tab-2"
              aria-controls="simple-tabpanel-2"
              disabled
              className="flight-request-tabs"
            />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <FlightDetailForm
              onSubmit={onSubmitFlightDetail}
              data={apiReqData.flightDetails}
              isEditState={data}
              onCancel={handleClose}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TravelersFrom
              onBack={travelFormBackHandler}
              onCancel={handleClose}
              adults={apiReqData.flightDetails?.adults || 1}
              kids={apiReqData.flightDetails?.children || 0}
              onSubmit={onSubmitTravelersFrom}
              data={apiReqData.travelerDetails}
            />
          </CustomTabPanel>
        </Box>
      </Modal>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
    </div>
  );
}
