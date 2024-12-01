import { useCallback, useEffect, useState } from "react";
import ApiService from "../../api.service";
import Datagrid from "../Datagrid/Datagrid";
import { getGridStringOperators } from "@mui/x-data-grid";
import { dateFormat } from "../../utilis/dateFormat";
import {
  dateFilterOperators,
  stringFilterOperators,
} from "../../utilis/gridFilterFormat";

export default function LogDatagrid({ value }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async (roleName) => {
    setLoading(true);
    const res = await ApiService.get(`admin/login-logs/${roleName}`);
    setLoading(false);

    console.log("res", res);

    const resWithId = res
      .filter((r) => !!r.user?.username)
      .map((r) => ({
        ...r,
        id: r._id,
        username: r.user.username,
        email: r.user.email,
        roleName: r.role.name,
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
    filterOperators: stringFilterOperators,
    renderCell: (param) => {
      return param.row.username;
    },
  },
  {
    field: "email",
    headerName: "User email",
    filterOperators: stringFilterOperators,
    flex: 1,
    renderCell: (param) => {
      console.log("param", param);

      return param.row.email;
    },
  },

  {
    field: "roleName",
    headerName: "Role",
    filterOperators: stringFilterOperators,
    flex: 1,
    renderCell: (param) => {
      return param.row.roleName;
    },
  },
  {
    field: "createdAt",
    headerName: "Login at",
    filterOperators: dateFilterOperators,
    type: "date",
    valueGetter: (value) => new Date(value),
    flex: 1,
    renderCell: (param) => {
      return dateFormat(param.row.createdAt);
    },
  },
];
