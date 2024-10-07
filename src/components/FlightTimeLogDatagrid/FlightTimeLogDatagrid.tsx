import { useCallback, useEffect, useState } from "react";
import ApiService from "../../api.service";
import Datagrid from "../Datagrid/Datagrid";
import { dateFormat } from "../../utilis/dateFormat";
import React from "react";
import { Stack } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function FlightTimeLogDatagrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState([
    new Date(),
    new Date(),
  ]);

  const fetchData = useCallback(async (startDate: any, endDate: any) => {
    setLoading(true);
    const res = await ApiService.get(`admin/login-logs/`);
    setLoading(false);

    const resWithId = res.map((r) => ({
      ...r,
      id: r._id,
    }));

    setData(resWithId);
  }, []);
  //   useEffect(() => {
  //     fetchData("", "");
  //   }, []);

  return (
    <Stack>
           <LocalizationProvider dateAdapter={AdapterDateFns}>
           <DateRangePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />

            </LocalizationProvider>
      <Datagrid loading={loading} columns={columns} rows={data} />
    </Stack>
  );
}

const columns = [
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    renderCell: (param) => {
      return param.row.user.username;
    },
  },
  {
    field: "email",
    headerName: "User email",
    flex: 1,
    renderCell: (param) => {
      return param.row.user.email;
    },
  },

  {
    field: "role",
    headerName: "Role",
    flex: 1,
    renderCell: (param) => {
      return param.row.role.name;
    },
  },
  {
    field: "createdAt",
    headerName: "Login at",
    flex: 1,
    renderCell: (param) => {
      return dateFormat(param.row.createdAt);
    },
  },
];
