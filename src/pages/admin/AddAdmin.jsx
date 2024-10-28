import React, { useMemo, useState } from "react";
import AdminCoperateUserAddEditModal from "../../components/adminCoperateUserAddEditModal/AdminCoperateUserAddEditModal.jsx";
import { adminUserAddSchema } from "../../schema/validateSchema";
import Widget from "../../components/widget/Widget";
import Datagrid from "../../components/Datagrid/Datagrid";
import useFetchRow from "../../hooks/useFetchRow";
import AddAdminGridMenu from "../../components/AddAdminGridMenu/AddAdminGridMenu";
import { stringFilterOperators } from "../../utilis/gridFilterFormat";
const AddAdmin = () => {
  const [open, setOpen] = useState(false);
  const { rows, fetchRows, rowsLoading } = useFetchRow("admin");
  const columns = useMemo(
    () => [
      {
        field: "username",
        headerName: "Username",
        filterOperators: stringFilterOperators,

        flex: 1,
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
        field: "role_name",
        headerName: "role",
        filterOperators: stringFilterOperators,
        flex: 1,
        editable: false,
      },

      {
        field: "actions",
        type: "actions",
        renderCell: (param) => {
          return param.row.role_name === "owner" ? (
            <></>
          ) : (
            <AddAdminGridMenu
              data={param.row}
              onRequestComplete={reqHandler}
              isRoleExist
            />
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
    role: "sys_admin",
    email: "",
    phone: "",
  };

  return (
    <>
      {open && <AdminCoperateUserAddEditModal
        open={open}
        setOpen={setOpen}
        schema={adminUserAddSchema}
        initialValues={initialValues}
        isRoleExist
        onRequestComplete={reqHandler}
        title="Add Admin"
      />}
      <Widget addBtnlabel="Add Admin" onAddClick={() => setOpen(true)}>
        <Datagrid rows={rows} columns={columns} loading={rowsLoading} />
      </Widget>
    </>
  );
};

export default AddAdmin;
