import { useCallback, useEffect, useState, useMemo } from "react";
import ApiService from "../../api.service";
import Datagrid from "../Datagrid/Datagrid";
import { getGridStringOperators } from "@mui/x-data-grid";
import { dateFormat } from "../../utilis/dateFormat";
import {
  dateFilterOperators,
  numericFilterOperators,
  stringFilterOperators,
} from "../../utilis/gridFilterFormat";
import CommentCell from "../CommentCell/CommentCell";
import Status from "../FlightRequestGridMenu/Status";

export default function ViewDetailsDataGrid({ value, type }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async (date, type) => {
    setLoading(true);

    
    const end_date = new Date(date);

    // Set to end of the day (23:59:59) in PKT for October 28
    end_date.setUTCDate(end_date.getUTCDate() + 1); // Move to the next day (Oct 28 in UTC)
    end_date.setUTCHours(18, 59, 59, 999); // Set to 23:59:59.999 PKT (UTC+5)
    const end_time = end_date.toISOString()
    console.log("start date", date);
    console.log("type", type);
    console.log("end date", end_time);

    const res = await ApiService.get(
      `flight-booking?date_type=${type}&start_date=${date}&end_date=${end_time}`
    );
    setLoading(false);
    console.log("res", res);

    const resWithId = res.map((r) => ({
      ...r,
      id: r._id,
    }));

    // console.log("resssss",resWithId)

    setData(resWithId);
  }, []);
  useEffect(() => {
    fetchData(value, type);
  }, [value]);
  const columns = useMemo(
    () => [
      {
        field: "user",
        headerName: "User",
        valueGetter: (param) => param?.username,
        filterOperators: stringFilterOperators,
        renderCell: (param) => {
          return param.row.user?.username ? param.row.user.username : "N/A";
        },
      },

      {
        field: "from",
        filterOperators: stringFilterOperators,
        headerName: "From",
        editable: false,
        width: 160,
      },
      {
        field: "to",
        filterOperators: stringFilterOperators,
        headerName: "To",
        editable: false,
        width: 160,
      },

      {
        field: "start_time",
        headerName: "Flight Start Time",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        width: 200,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.start_time);
        },
      },
      {
        field: "end_time",
        headerName: "Flight End Time",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.end_time ? dateFormat(param.row.end_time) : "N/A";
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        width: 200,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.createdAt);
        },
      },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   width: 200,
      //   filterOperators: stringFilterOperators,
      //   renderCell: (param) => {
      //     return <Status status={param.row.status} />;
      //   },
      // },
      {
        field: "status_updated_at",
        headerName: "Status Updated",
        type: "date",
        valueGetter: (value) => new Date(value),
        filterOperators: dateFilterOperators,
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.status_updated_at
            ? dateFormat(param.row.status_updated_at)
            : "N/A";
        },
      },
      {
        field: "comment_by_admin",
        headerName: "Admin Comment",
        filterOperators: stringFilterOperators,
        type: "text",
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.comment_by_admin ? (
            <CommentCell message={param.row.comment_by_admin} />
          ) : (
            "N/A"
          );
        },
      },

      {
        field: "handle_by",
        headerName: "Handle By",
        filterOperators: stringFilterOperators,
        type: "action",
        valueGetter: (param) => (param ? param.username : "N/A"),
        renderCell: (param) => {
          return param.row.handle_by ? param.row.handle_by.username : "N/A";
        },
      },
    ],
    []
  );
  return <Datagrid loading={loading} columns={columns} rows={data} />;
}
