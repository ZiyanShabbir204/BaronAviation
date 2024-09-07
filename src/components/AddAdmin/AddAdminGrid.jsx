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
    total_hours: 120,
    use_hourse: 75,
    availbale_hourse: 45,
    email: "johndoe@example.com",
    phone: 9876543210,
  },
  {
    id: 2,
    username: "JaneSmith",
    total_hours: 150,
    use_hourse: 100,
    availbale_hourse: 50,
    email: "janesmith@example.com",
    phone: 9876543211,
  },
  {
    id: 3,
    username: "MichaelBrown",
    total_hours: 90,
    use_hourse: 50,
    availbale_hourse: 40,
    email: "michaelbrown@example.com",
    phone: 9876543212,
  },
  {
    id: 4,
    username: "EmmaJohnson",
    total_hours: 200,
    use_hourse: 180,
    availbale_hourse: 20,
    email: "emmajohnson@example.com",
    phone: 9876543213,
  },
  {
    id: 5,
    username: "LiamWilliams",
    total_hours: 100,
    use_hourse: 60,
    availbale_hourse: 40,
    email: "liamwilliams@example.com",
    phone: 9876543214,
  },
  {
    id: 6,
    username: "OliviaJones",
    total_hours: 130,
    use_hourse: 90,
    availbale_hourse: 40,
    email: "oliviajones@example.com",
    phone: 9876543215,
  },
  {
    id: 7,
    username: "NoahTaylor",
    total_hours: 110,
    use_hourse: 70,
    availbale_hourse: 40,
    email: "noahtaylor@example.com",
    phone: 9876543216,
  },
  {
    id: 8,
    username: "AvaLee",
    total_hours: 140,
    use_hourse: 100,
    availbale_hourse: 40,
    email: "avalee@example.com",
    phone: 9876543217,
  },
  {
    id: 9,
    username: "IsabellaMartin",
    total_hours: 160,
    use_hourse: 120,
    availbale_hourse: 40,
    email: "isabellamartin@example.com",
    phone: 9876543218,
  },
  {
    id: 10,
    username: "SophiaDavis",
    total_hours: 170,
    use_hourse: 130,
    availbale_hourse: 40,
    email: "sophiadavis@example.com",
    phone: 9876543219,
  },
];
