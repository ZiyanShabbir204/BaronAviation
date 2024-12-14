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

export default function HoursLogDataGrid({ value }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async (id) => {
    setLoading(true);
    const res = await ApiService.get(
      `admin/cooperate-customer/${id}/hours-log`
    );
    setLoading(false);

    const resWithId = res.map((r) => ({
      ...r,
      id: r._id,
      added_by: r.added_by.username,
    }));

    setData(resWithId);
  }, []);
  useEffect(() => {
    fetchData(value);
  }, [value]);
  const columns = useMemo(
    () => [
      {
        field: "added_by",
        headerName: "Added By",
        filterOperators: stringFilterOperators,
        flex: 1,
        editable: false,
      },
      {
        field: "createdAt",
        headerName: "Added At",
        filterOperators: dateFilterOperators,
        type: "date",
        valueGetter: (value) => new Date(value),
        flex: 1,
        renderCell: (param) => {
          return dateFormat(param.row.createdAt);
        },
      },
      {
        field: "total_hours",
        headerName: "New Total Hours",
        type: "number",
        filterOperators: numericFilterOperators,
        flex: 1,
        editable: false,
      },
      {
        field: "old_total_hours",
        headerName: "Old Total Hours",
        type: "number",
        filterOperators: numericFilterOperators,
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return param.row.old_total_hours ? param.row.old_total_hours : "N/A";
        },
      },

      {
        field: "used_hours",
        headerName: "New Used Hours",
        type: "number",
        filterOperators: numericFilterOperators,
        flex: 1,
        editable: false,
      },
      {
        field: "old_used_hours",
        headerName: "Old Used Hours",
        type: "number",
        filterOperators: numericFilterOperators,
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return param.row.old_used_hours ? param.row.old_used_hours : "N/A";
        },
      },
    ],
    []
  );
  return <Datagrid loading={loading} columns={columns} rows={data} />;
}
