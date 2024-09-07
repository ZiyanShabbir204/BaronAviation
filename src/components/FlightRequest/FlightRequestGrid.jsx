import { useCallback, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import Status from "./Status";
import {
  randomCreatedDate,
  randomTraderName,
} from "@mui/x-data-grid-generator";
import FlightRequestGridMenu from "./FlightRequestGridMenu";
import ApiService from "../../api.service";

const columns = [
  {
    field: "user",
    headerName: "User",
    flex: 1,

    renderCell: (param) => {
      return param.row.user.username;
    },
  },
  { field: "to", headerName: "To", flex: 1, editable: false },
  { field: "from", headerName: "From", flex: 1, editable: false },

  // {
  //   field: "start_time",
  //   headerName: "Start Time",
  //   type: "dateTime",
  //   width: 200,
  //   editable: false,
  // },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    flex: 1,

    renderCell: (param) => {
      return <Status status={param.row.status} />;
    },
  },
  {
    field: "handle_by",
    headerName: "Handle By",
    type: "action",
    flex: 1,

    renderCell: (param) => {
      return param.row.handle_by ? param.row.handle_by : "N/A";
    },
  },
  {
    field: "actions",
    type: "actions",
    flex: 1,

    renderCell: (param) => {
      return <FlightRequestGridMenu param={param} />;
    },
  },
];

export default function FlightRequestGrid() {
  const [rows, setRows] = useState([]);
  const fetchData = useCallback(async () => {
    const data = await ApiService.get("flight-booking");
    console.log(data);
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
    <div style={{ width: "100%", height: "400px" }}>
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
