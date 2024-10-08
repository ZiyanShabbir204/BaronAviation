import React, { useMemo, useState } from "react";
import AdminCoperateUserAddEditModal from "../../../components/adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import { coperateUserAddSchema } from "../../../schema/validateSchema";
import Widget from "../../../components/widget/Widget";
import useFetchRow from "../../../hooks/useFetchRow";
import Datagrid from "../../../components/Datagrid/Datagrid";
import CoperateUserGridMenu from "../../../components/CoperateUserGridMenu/CoperateUserGridMenu";
import {
  numericFilterOperators,
  stringFilterOperators,
} from "../../../utilis/gridFilterFormat";
const CoperateUser = () => {
  const [open, setOpen] = useState(false);
  const { rows, fetchRows, rowsLoading } = useFetchRow(
    "admin/cooperate-customer"
  );

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
        field: "phone",
        headerName: "Phone",
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
        field: "total_hours",
        headerName: "Total Hours",
        type: "number",
        filterOperators: numericFilterOperators,
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return param.row.hours.total_hours;
        },
      },
      {
        field: "used_hours",
        headerName: "Used Hours",
        type: "number",

        filterOperators: numericFilterOperators,
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return param.row.hours.used_hours;
        },
      },
      {
        field: "available_hours",
        headerName: "Available Hours",
        filterOperators: numericFilterOperators,
        type: "number",
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return param.row.hours.available_hours;
        },
      },

      {
        field: "actions",
        type: "actions",
        renderCell: (param) => {
          return (
            <CoperateUserGridMenu
              data={param.row}
              onRequestComplete={requestCompleteHandler}
            />
          );
        },
      },
    ],
    []
  );

  const requestCompleteHandler = () => {
    fetchRows();
  };

  const initialValues = {
    username: "",
    password: "",
    total_hours: "",
    email: "",
    phone: "",
  };
  return (
    <>
      <AdminCoperateUserAddEditModal
        open={open}
        setOpen={setOpen}
        schema={coperateUserAddSchema}
        initialValues={initialValues}
        isTotalHoursExist
        onRequestComplete={requestCompleteHandler}
        title="Add Corperate Client"
      />
      <Widget
        addBtnlabel="Add Corporate client"
        onAddClick={() => setOpen(true)}
      >
        <Datagrid rows={rows} columns={columns} loading={rowsLoading} />
      </Widget>
    </>
  );
};

export default CoperateUser;
