import { useCallback, useEffect, useState } from "react";
import ApiService from "../../api.service";
import Datagrid from "../Datagrid/Datagrid";
import { logDateFormat } from "../../utilis/dateFormat";
import React from "react";
import { Stack, Button } from "@mui/material";
import FlightTimeLogDatePicker from "../FlightTimeLogDatePicker/FlightTimeLogDatePicker";

export default function FlightTimeLogDatagrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (values) => {
    try {
      const res = await ApiService.get(
        `admin/login-logs/flight-time?start=${values.start_time}&end=${values.end_time}&type=${values.type}`
      );

      const resWithId = res.map((r) => ({
        ...r,
        id: JSON.stringify(r._id),
      }));
      setData(resWithId);
      setLoading(false);

      // console.log("logs response", res);
    } catch (error) {
      console.log("logs response error", error);
    }
  };

  return (
    <Stack gap="24px">
      <FlightTimeLogDatePicker onFilter={(values) => fetchData(values)} />
      <Datagrid loading={loading} columns={columns} rows={data} />
    </Stack>
  );
}

const columns = [
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    renderCell: (param) => {
      const year = param.row._id.year;
      const month = param.row._id.month - 1;
      const day = param.row._id.day + 1;
      const date = new Date(year, month, day);
      return logDateFormat(date);
    },
  },
  
 
  {
    field: "from",
    headerName: "From",
    flex: 1,
    renderCell: (param) => {
      const values = param.row.from;
      const formatted = Object.entries(values).sort((a, b) => b[1] - a[1]).reduce(
        (acc, [key, value]) => `${acc} ${key}(${value})`,
        ""
      );
      return formatted;
    },
  },
  {
    field: "to",
    headerName: "To",
    flex: 1,
    renderCell: (param) => {
      const values = param.row.to;
      const formatted = Object.entries(values).sort((a, b) => b[1] - a[1]).reduce(
        (acc, [key, value]) => `${acc} ${key}(${value})`,
        ""
      );
      return formatted;
    },
  },
];
