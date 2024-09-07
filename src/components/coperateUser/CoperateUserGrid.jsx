import { useState, useCallback, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { DataGrid } from "@mui/x-data-grid";

import CoperateUserGridMenu from "./CoperateUserGridMenu";
import ApiService from "../../api.service";

export default function CoperateUserGrid() {
  const [rows, setRows] = useState([]);
  const fetchData = useCallback(async () => {
    const data = await ApiService.get("admin/cooperate-customer");
    console.log(data);
    setRows(
      data.map((d) => ({
        ...d,
        id: d._id,
        available_hours: d.hours.available_hours,
        total_hours: d.hours.total_hours,
        used_hours: d.hours.used_hours,
      }))
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
}

const columns = [
  { field: "username", headerName: "Username", flex: 1, editable: false },
  {
    field: "total_hours",
    headerName: "Total Hours",
    type: "number",
    flex: 1,
    editable: false,
  },
  {
    field: "used_hours",
    headerName: "Used Hours",
    type: "number",
    flex: 1,
    editable: false,
  },
  {
    field: "available_hours",
    headerName: "Available Hours",
    type: "number",
    flex: 1,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    flex: 1,
    editable: false,
  },
  { field: "phone", headerName: "Phone", flex: 1, editable: false },

  {
    field: "actions",
    type: "actions",
    flex: 1,
    renderCell: (param) => {
      return <CoperateUserGridMenu param={param} />;
    },
  },
];
