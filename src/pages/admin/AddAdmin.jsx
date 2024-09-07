import React, { useState } from "react";
import AdminCoperateUserAddEditModal from "../../components/adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import { adminUserAddEditSchema } from "../../schema/validateSchema";
import Widget from "../../components/widget/Widget";
import Datagrid from "../../components/Datagrid/Datagrid";
import useFetchRow from "../../hooks/useFetchRow";
import AddAdminGridMenu from "../../components/AddAdminGridMenu/AddAdminGridMenu";
const AddAdmin = () => {
  const [open, setOpen] = useState(false);
  const { rows } = useFetchRow("admin");
  const initialValues = {
    username: "",
    password: "",
    role: "",
    email: "",
    phone: "",
  };

  return (
    <>
      <AdminCoperateUserAddEditModal
        open={open}
        setOpen={setOpen}
        schema={adminUserAddEditSchema}
        initialValues={initialValues}
        roleAbled={true}
        passwordAbled={true}
      />
      <Widget addBtnlabel="Add Admin" onAddClick={() => setOpen(true)}>
        <Datagrid rows={rows} columns={columns} />
      </Widget>
    </>
  );
};

export default AddAdmin;

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
