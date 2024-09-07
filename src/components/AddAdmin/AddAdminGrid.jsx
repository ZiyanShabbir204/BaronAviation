import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { DataGridPro, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';

import {
  randomCreatedDate,
  randomTraderName,

} from '@mui/x-data-grid-generator';
import AddAdminGridMenu from './AddAdminGridMenu';



export default function AddAdminGrid() {
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
  { field: 'username', headerName: 'Username', width: 200, editable: false },
  { field: 'role', headerName: 'Role',type: "text", width: 140, editable: false },
  { field: 'use_hourse', headerName: 'User Hours',type: "number", width: 140, editable: false },
  { field: 'availbale_hourse', headerName: 'Available Hours',type: "number", width: 140, editable: false },
  { field: 'email', headerName: 'Email',type: "email", width: 200, editable: false },
  { field: 'phone', headerName: 'Phone', width: 200, editable: false },

  {
    field: 'actions',
    type: 'actions',
    width: 50,
    renderCell: (param) => {
        return <AddAdminGridMenu  param={param}/>
    }
  },
];

const rows = [
  {
    id: 1,
    username: "JohnDoe",
    use_hourse: 75,
    availbale_hourse: 45,
    email: "johndoe@example.com",
    phone: 9876543210,
    role: "sys_admin",
  },
  {
    id: 2,
    username: "JaneSmith",
    use_hourse: 100,
    availbale_hourse: 50,
    email: "janesmith@example.com",
    phone: 9876543211,
    role: "booking_agent",
  },
  {
    id: 3,
    username: "MichaelBrown",
    use_hourse: 50,
    availbale_hourse: 40,
    email: "michaelbrown@example.com",
    phone: 9876543212,
    role: "maintenance_worker",
  },
  {
    id: 4,
    username: "EmmaJohnson",
    use_hourse: 180,
    availbale_hourse: 20,
    email: "emmajohnson@example.com",
    phone: 9876543213,
    role: "sys_admin",
  },
  {
    id: 5,
    username: "LiamWilliams",
    use_hourse: 60,
    availbale_hourse: 40,
    email: "liamwilliams@example.com",
    phone: 9876543214,
    role: "booking_agent",
  },
  {
    id: 6,
    username: "OliviaJones",
    use_hourse: 90,
    availbale_hourse: 40,
    email: "oliviajones@example.com",
    phone: 9876543215,
    role: "maintenance_worker",
  },
  {
    id: 7,
    username: "NoahTaylor",
    use_hourse: 70,
    availbale_hourse: 40,
    email: "noahtaylor@example.com",
    phone: 9876543216,
    role: "sys_admin",
  },
  {
    id: 8,
    username: "AvaLee",
    use_hourse: 100,
    availbale_hourse: 40,
    email: "avalee@example.com",
    phone: 9876543217,
    role: "booking_agent",
  },
  {
    id: 9,
    username: "IsabellaMartin",
    use_hourse: 120,
    availbale_hourse: 40,
    email: "isabellamartin@example.com",
    phone: 9876543218,
    role: "maintenance_worker",
  },
  {
    id: 10,
    username: "SophiaDavis",
    use_hourse: 130,
    availbale_hourse: 40,
    email: "sophiadavis@example.com",
    phone: 9876543219,
    role: "sys_admin",
  },
];