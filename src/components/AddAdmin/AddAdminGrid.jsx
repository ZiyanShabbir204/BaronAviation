import { useState, useCallback, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import ApiService from "../../api.service";

import {
  randomCreatedDate,
  randomTraderName,
} from "@mui/x-data-grid-generator";
import AddAdminGridMenu from "./AddAdminGridMenu";

export default function AddAdminGrid() {
  const [rows, setRows] = useState([]);
  const fetchData = useCallback(async () => {
    const data = await ApiService.get("admin");
    setRows(
      data.map((d) => ({
        ...d,
        id: d._id,
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
    field: "email",
    headerName: "Email",
    type: "email",
    flex: 1,
    editable: false,
  },
  { field: "phone", headerName: "Phone", flex: 1, editable: false },
  { field: "role_name", headerName: "role", flex: 1, editable: false },

  {
    field: "actions",
    type: "actions",
    flex: 1,
    renderCell: (param) => {
      return <AddAdminGridMenu param={param} />;
    },
  },
];


