import React, { useMemo, useState } from "react";
import AdminCoperateUserAddEditModal from "../../components/adminCoperateUserAddEditModal/AdminCoperateUserAddEditModal.jsx";
import { adminUserAddSchema, userAddSchema } from "../../schema/validateSchema";
import Widget from "../../components/widget/Widget";
import Datagrid from "../../components/Datagrid/Datagrid";
import useFetchRow from "../../hooks/useFetchRow";
import AddAdminGridMenu from "../../components/AddAdminGridMenu/AddAdminGridMenu";
import { stringFilterOperators } from "../../utilis/gridFilterFormat";
const Users = () => {
  const [open, setOpen] = useState(false);
  const { rows, fetchRows, rowsLoading } = useFetchRow("admin/users");
  const columns = useMemo(
    () => [
      {
        field: "first_name",
        headerName: "First Name",
        filterOperators: stringFilterOperators,
        flex: 1,
        editable: false,
        renderCell: (param) =>{
          return param.row.first_name?param.row.first_name: "N/A" 

        }
      },
      {
        field: "last_name",
        headerName: "Last Name",
        filterOperators: stringFilterOperators,
        flex: 1,
        editable: false,
        renderCell: (param)=>{
          return param.row.last_name ? param.row.last_name : "N/A"
        }
      },
      {
        field: "username",
        headerName: "Username",
        flex: 1,
        filterOperators: stringFilterOperators,
        editable: false,
      },

      {
        field: "email",
        headerName: "Email",
        filterOperators: stringFilterOperators,
        type: "email",
        flex: 1,
        editable: false,
      },
      {
        field: "phone",
        headerName: "Phone",
        filterOperators: stringFilterOperators,
        flex: 1,
        editable: false,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        renderCell: (param) => {
          return (
            <AddAdminGridMenu data={param.row} onRequestComplete={reqHandler} />
          );
        },
      },
    ],
    []
  );

  const reqHandler = () => {
    fetchRows();
  };

  const initialValues = {
    username: "",
    password: "",
    email: "",
    phone: "",
    first_name:"",
    last_name:""
  };

  return (
    <>
      {open && (
        <AdminCoperateUserAddEditModal
          open={open}
          setOpen={setOpen}
          schema={userAddSchema}
          initialValues={initialValues}
          onRequestComplete={reqHandler}
          title="Customer"
        />
      )}
      <Widget addBtnlabel="Add Customer" onAddClick={() => setOpen(true)}>
        <Datagrid rows={rows} columns={columns} loading={rowsLoading} />
      </Widget>
    </>
  );
};

export default Users;
