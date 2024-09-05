import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';
import Status from './Status';
import {
  randomCreatedDate,
  randomTraderName,

} from '@mui/x-data-grid-generator';
import FlightRequestGridMenu from './FlightRequestGridMenu';


export default function FlightRequestGrid() {
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
  { field: 'to', headerName: 'To', width: 200, editable: false },
  { field: 'from', headerName: 'From', width: 200, editable: false },
  { field: 'start_time', headerName: 'Start Time',type: "dateTime", width: 200, editable: false },
  {
    field: 'status',
    headerName: 'Status',
    type: "actions",
    width: 180,
    renderCell : (param) => {
        console.log("param", param)
        return <Status status={param.row.status}/>

    }
  },
  {
    field: 'handle_by',
    headerName: 'Handle By',
    type: "action",
    renderCell: (param)=>{
        return param.row.handle_by ? param.row.handle_by : "N/A"
        
    },
    width: 220,
  },
  {
    field: 'actions',
    type: 'actions',
    width: 100,
    renderCell: (param) => {
        return <FlightRequestGridMenu param={param}/>
    }
  },
];

const rows = [
    {
        id: 11,
        to: "Los Angeles",
        from: "New York",
        start_time: randomCreatedDate(),
        status: "approved",
        handle_by: "John Doe",
      },
    {
        id: 1,
        to: "Los Angeles",
        from: "New York",
        start_time: randomCreatedDate(),
        status: "approved",
        handle_by: "John Doe",
      },
      {
        id: 2,
        to: "Chicago",
        from: "Houston",
        start_time: randomCreatedDate(),
        status: "pending",
        handle_by: null,
      },
      {
        id: 3,
        to: "San Francisco",
        from: "Miami",
        start_time: randomCreatedDate(),
        status: "declined",
        handle_by: "Jane Smith",
      },
      {
        id: 4,
        to: "Boston",
        from: "Seattle",
        start_time:randomCreatedDate(),
        status: "approved",
        handle_by: "Michael Brown",
      },
      {
        id: 5,
        to: "Dallas",
        from: "Denver",
        start_time: randomCreatedDate(),
        status: "pending",
        handle_by: null,
      },
      {
        id: 6,
        to: "Atlanta",
        from: "Orlando",
        start_time: randomCreatedDate(),
        status: "approved",
        handle_by: "Emma Johnson",
      },
      {
        id: 7,
        to: "Philadelphia",
        from: "Las Vegas",
        start_time:randomCreatedDate(),
        status: "declined",
        handle_by: "Liam Williams",
      },
      {
        id: 8,
        to: "Phoenix",
        from: "San Diego",
        start_time: randomCreatedDate(),
        status: "approved",
        handle_by: null,
      },
      {
        id: 9,
        to: "Austin",
        from: "Nashville",
        start_time: randomCreatedDate(),
        status: "pending",
        handle_by: "Olivia Jones",
      },
      {
        id: 10,
        to: "Detroit",
        from: "Charlotte",
        start_time: randomCreatedDate(),
        status: "declined",
        handle_by: null,
      },
    ];