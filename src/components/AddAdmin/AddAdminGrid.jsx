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

const rows = [
  {
    id: 1,
    username: "JohnDoe",
<<<<<<< HEAD
=======
    total_hours: 120,
>>>>>>> main
    use_hourse: 75,
    availbale_hourse: 45,
    email: "johndoe@example.com",
    phone: 9876543210,
<<<<<<< HEAD
    role: "sys_admin",
=======
>>>>>>> main
  },
  {
    id: 2,
    username: "JaneSmith",
<<<<<<< HEAD
=======
    total_hours: 150,
>>>>>>> main
    use_hourse: 100,
    availbale_hourse: 50,
    email: "janesmith@example.com",
    phone: 9876543211,
<<<<<<< HEAD
    role: "booking_agent",
=======
>>>>>>> main
  },
  {
    id: 3,
    username: "MichaelBrown",
<<<<<<< HEAD
=======
    total_hours: 90,
>>>>>>> main
    use_hourse: 50,
    availbale_hourse: 40,
    email: "michaelbrown@example.com",
    phone: 9876543212,
<<<<<<< HEAD
    role: "maintenance_worker",
=======
>>>>>>> main
  },
  {
    id: 4,
    username: "EmmaJohnson",
<<<<<<< HEAD
=======
    total_hours: 200,
>>>>>>> main
    use_hourse: 180,
    availbale_hourse: 20,
    email: "emmajohnson@example.com",
    phone: 9876543213,
<<<<<<< HEAD
    role: "sys_admin",
=======
>>>>>>> main
  },
  {
    id: 5,
    username: "LiamWilliams",
<<<<<<< HEAD
=======
    total_hours: 100,
>>>>>>> main
    use_hourse: 60,
    availbale_hourse: 40,
    email: "liamwilliams@example.com",
    phone: 9876543214,
<<<<<<< HEAD
    role: "booking_agent",
=======
>>>>>>> main
  },
  {
    id: 6,
    username: "OliviaJones",
<<<<<<< HEAD
=======
    total_hours: 130,
>>>>>>> main
    use_hourse: 90,
    availbale_hourse: 40,
    email: "oliviajones@example.com",
    phone: 9876543215,
<<<<<<< HEAD
    role: "maintenance_worker",
=======
>>>>>>> main
  },
  {
    id: 7,
    username: "NoahTaylor",
<<<<<<< HEAD
=======
    total_hours: 110,
>>>>>>> main
    use_hourse: 70,
    availbale_hourse: 40,
    email: "noahtaylor@example.com",
    phone: 9876543216,
<<<<<<< HEAD
    role: "sys_admin",
=======
>>>>>>> main
  },
  {
    id: 8,
    username: "AvaLee",
<<<<<<< HEAD
=======
    total_hours: 140,
>>>>>>> main
    use_hourse: 100,
    availbale_hourse: 40,
    email: "avalee@example.com",
    phone: 9876543217,
<<<<<<< HEAD
    role: "booking_agent",
=======
>>>>>>> main
  },
  {
    id: 9,
    username: "IsabellaMartin",
<<<<<<< HEAD
=======
    total_hours: 160,
>>>>>>> main
    use_hourse: 120,
    availbale_hourse: 40,
    email: "isabellamartin@example.com",
    phone: 9876543218,
<<<<<<< HEAD
    role: "maintenance_worker",
=======
>>>>>>> main
  },
  {
    id: 10,
    username: "SophiaDavis",
<<<<<<< HEAD
=======
    total_hours: 170,
>>>>>>> main
    use_hourse: 130,
    availbale_hourse: 40,
    email: "sophiadavis@example.com",
    phone: 9876543219,
<<<<<<< HEAD
    role: "sys_admin",
  },
];
=======
  },
];
>>>>>>> main
