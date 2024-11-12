import { useState } from "react";
import ApiService from "../../api.service";
import Datagrid from "../Datagrid/Datagrid";
import { logDateFormat } from "../../utilis/dateFormat";
import React from "react";
import { Stack } from "@mui/material";
import FlightTimeLogDatePicker from "../FlightTimeLogDatePicker/FlightTimeLogDatePicker";
import { dateFilterOperators } from "../../utilis/gridFilterFormat";
import FlightSummaryGridMenu from "../FlightSummaryGridMenu/FlightSummaryGridMenu";

export default function FlightTimeLogDatagrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("createdAt");

  const fetchData = async (values) => {
    try {
      setType(values.type);

      values.start_time.setHours(0, 0, 0);
      values.end_time.setHours(23, 59, 59);

      const startTimeStr = values.start_time.toISOString();
      const endTimeStr = values.end_time.toISOString();
      console.log("value",values)
      const res = await ApiService.get(
        `flight-booking?date_type=${values.type}&start_date=${startTimeStr}&end_date=${endTimeStr}`
      );
      const flights = {}
      const flightData = []
      res.forEach(value => {
        const key = logDateFormat(value[values.type])
        if(flights[key]){
          flights[key].push(value)
        }
        else{
          flights[key] = [value]
        }
        
      });

      Object.keys(flights).forEach(key => {
        const new_date = new Date(key)
        const date =  new_date.toISOString()
        const temp_obj = {
          date,
          noOfFlight: flights[key].length
        }
        flightData.push(temp_obj)
        
      });
      const flightDataWithId = flightData.map((r) => ({
        ...r,
        id: JSON.stringify(r.date),
      
      }));
      setData(flightDataWithId);
      setLoading(false);
    } catch (error) {
      console.log("logs response error", error);
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      filterOperators: dateFilterOperators,
      type: "date",
      valueGetter: (value) => new Date(value),
      renderCell: (param) => {
        return logDateFormat(param.row.date);
      },
    },
    {
      field: "noOfFlight",
      headerName: "No. of flights",
      flex: 1,
      valueGetter: (value) => {
        return value;
      },
    },
    
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      renderCell: (param) => {
        return <FlightSummaryGridMenu data={param.row} type={type} />;
      },
    },
  ];

  return (
    <Stack gap="24px">
      <FlightTimeLogDatePicker onFilter={(values) => fetchData(values)} />
      <Datagrid loading={loading} columns={columns} rows={data} />
    </Stack>
  );
}
