import * as React from 'react';

import { DataGrid } from '@mui/x-data-grid';

import {
  randomCreatedDate,
  randomTraderName,

} from '@mui/x-data-grid-generator';
import MaintainceUnavailablityGridMenu from './MaintainceUnavailablityGridMenu';



export default function MaintainceUnavailablityGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
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
  { field: 'flight_no', headerName: 'Flight', width: 160, editable: false },
  { field: 'start_time', headerName: 'Start Time',type: "dateTime", width: 200, editable: false },
  { field: 'end_time', headerName: 'End Time',type: "dateTime", width: 200, editable: false },
  {
    field: 'edit_by',
    headerName: 'Edit By',
    width: 180,
    editable: false
  },
  {
    field: 'reason',
    headerName: 'Reason',
    width: 220,
    editable: false
  },
  {
    field: 'actions',
    type: 'actions',
    width: 100,
    renderCell: (param) => {
        return <MaintainceUnavailablityGridMenu param={param}/>
    }
  },
];

const rows = [
  {
    id: 1,
    flight_no: "ABC12345",
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "John Doe",
    reason: "Technical delay",
  },
  {
    id: 2,
    flight_no: "DEF67890",
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Jane Smith",
    reason: "Weather conditions",
  },
  {
    id: 3,
    flight_no: "GHI23456",
    start_time: randomCreatedDate(),
    end_time: randomCreatedDate(),
    edit_by: "Mark Johnson",
    reason: "Crew unavailability",
  },
  {
    id: 4,
    flight_no: "JKL78901",
    start_time: randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "Emma Davis",
    reason: "Airport restrictions",
  },
  {
    id: 5,
    flight_no: "MNO34567",
    start_time:  randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "Michael Brown",
    reason: "Passenger issues",
  },
  {
    id: 6,
    flight_no: "PQR89012",
    start_time:  randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "Olivia Wilson",
    reason: "Flight rescheduling",
  },
  {
    id: 7,
    flight_no: "STU45678",
    start_time:  randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "Noah Taylor",
    reason: "Fueling delay",
  },
  {
    id: 8,
    flight_no: "VWX01234",
    start_time:  randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "Liam White",
    reason: "Security check",
  },
  {
    id: 9,
    flight_no: "YZA56789",
    start_time:  randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "Sophia Harris",
    reason: "Luggage misplacement",
  },
  {
    id: 10,
    flight_no: "BCD90123",
    start_time:  randomCreatedDate(),
    end_time:  randomCreatedDate(),
    edit_by: "James Clark",
    reason: "Flight rerouting",
  },
];
