import { useCallback, useState, useEffect } from "react";
import ApiService from "../../api.service";
import { DataGrid } from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
} from "@mui/x-data-grid-generator";

import FlightUnavailablityGridMenu from "./FlightUnavailablityGridMenu";

export default function FlightUnavailableGrid() {
  const [rows, setRows] = useState([]);
  const fetchData = useCallback(async () => {
    const data = await ApiService.get(
      "admin/flight-unavailability/unavailability"
    );
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

const columns = [
  {
    field: "start_time",
    headerName: "Start Time",
    type: "string",
    flex: 1,
    editable: false,
  },
  {
    field: "end_time",
    headerName: "End Time",
    type: "string",
    flex: 1,
    editable: false,
  },
  {
    field: "added_by",
    headerName: "Added By",
    flex: 1,
    editable: false,
  },

  {
    field: "actions",
    type: "actions",
    width: 100,
    renderCell: (param) => {
      return <FlightUnavailablityGridMenu param={param} />;
    },
  },
];
