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
    const endDate = new Date(date)
    endDate.setHours(23,59,59)
    const endDateStr = endDate.toISOString()

    const res = await ApiService.get(
      `flight-booking?date_type=${type}&start_date=${date}&end_date=${endDateStr}`
    );
    setLoading(false);
    console.log("res", res);

    // useEffect(() => {
    //   const r = data.map((row) => {
    //     if (row.status !== "approve") {
    //       return row;
    //     }
    //     return {
    //       ...row,
    //       status: "approved",
    //     };
    //   });
    //   setData(r);
    // }, [data]);

    const resWithId = res.map((r) => {
      if(r.status !== "approve"){
        return {
          ...r,
          id:r._id
        } 
      }
      return{
        ...r,
        status: "approved",
        id:r._id

      }
      // ...r,
      // id: r._id,
    });

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
      {
        field: "status",
        headerName: "Status",
        width: 200,
        filterOperators: stringFilterOperators,
        renderCell: (param) => {
          // console.log("status",param.row.status)
          return <Status  status={param.row.status}/> ;
        },
      },
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
