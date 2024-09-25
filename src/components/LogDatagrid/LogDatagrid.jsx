import { useCallback, useEffect, useState } from "react";
import ApiService from "../../api.service";
import Datagrid from "../Datagrid/Datagrid";
import { dateFormat } from "../../utilis/dateFormat";

export default function LogDatagrid({ value }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async (roleName) => {
    setLoading(true);
    const res = await ApiService.get(`admin/login-logs/${roleName}`);
    setLoading(false);

    const resWithId = res.map((r) => ({
      ...r,
      id: r._id,
    }));

    setData(resWithId);
  }, []);
  useEffect(() => {
    fetchData(value);
  }, [value]);

  return <Datagrid loading={loading} columns={columns} rows={data} />;
}

const columns = [
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    renderCell: (param) => {
      return param.row.user.username;
    },
  },
  {
    field: "email",
    headerName: "User email",
    flex: 1,
    renderCell: (param) => {
      return param.row.user.email;
    },
  },

  {
    field: "role",
    headerName: "Role",
    flex: 1,
    renderCell: (param) => {
      return param.row.role.name;
    },
  },
  {
    field: "createdAt",
    headerName: "Login at",
    flex: 1,
    renderCell: (param) => {
      return dateFormat(param.row.createdAt);
    },
  },
];
