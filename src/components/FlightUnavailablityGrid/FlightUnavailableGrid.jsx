import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';

import {
  randomCreatedDate,
  randomTraderName,

} from '@mui/x-data-grid-generator';

import FlightUnavailablityGridMenu from './FlightUnavailablityGridMenu';

export default function FlightUnavailableGrid() {
  return (
    <div style={{ width: '100%', height:"400px" }}>
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
  { field: 'start_time', headerName: 'Start Time',type: "dateTime", width: 200, editable: false },
  { field: 'end_time', headerName: 'End Time',type: "dateTime", width: 200, editable: false },
  {
    field: 'edit_by',
    headerName: 'Edit By',
    width: 200,
    editable: false
  },
  {
    field: 'reason',
    headerName: 'Reason',
    width: 320,
    editable: false
  },
  {
    field: 'actions',
    type: 'actions',
    width: 100,
    renderCell: (param) => {
        return <FlightUnavailablityGridMenu param = {param}/>
    }
  },
];

const rows = [
  {
    id: 1,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "John Doe",
    reason: "Technical delay",
  },
  {
    id: 2,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Jane Smith",
    reason: "Weather conditions",
  },
  {
    id: 3,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Mark Johnson",
    reason: "Crew unavailability",
  },
  {
    id: 4,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Emma Davis",
    reason: "Airport restrictions",
  },
  {
    id: 5,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Michael Brown",
    reason: "Passenger issues",
  },
  {
    id: 6,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Olivia Wilson",
    reason: "Flight rescheduling",
  },
  {
    id: 7,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Noah Taylor",
    reason: "Fueling delay",
  },
  {
    id: 8,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Liam White",
    reason: "Security check",
  },
  {
    id: 9,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Sophia Harris",
    reason: "Luggage misplacement",
  },
  {
    id: 10,
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "James Clark",
    reason: "Flight rerouting",
  },
];
