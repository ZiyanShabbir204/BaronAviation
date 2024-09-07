import React, { useState, useCallback, useEffect } from "react";
import FlightRequestEditAddModal from "../../../components/flightRequestEditModal/FlightRequestEditAddModal";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import ApiService from "../../../api.service";
import Status from "../../../components/FlightRequestGridMenu/Status";
import FlightRequestGridMenu from "../../../components/FlightRequestGridMenu/FlightRequestGridMenu";
import useFetchRow from "../../../hooks/useFetchRow";
const FlightRequest = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows } = useFetchRow("flight-booking");

  return (
    <>
      <FlightRequestEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        flag="add"
      />
      <Widget
        addBtnlabel="Add Flight Request"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid rows={rows} columns={columns} />
      </Widget>
    </>
  );
};

const columns = [
  {
    field: "user",
    headerName: "User",
    flex: 1,

    renderCell: (param) => {
      return param.row.user.username;
    },
  },
  { field: "to", headerName: "To", flex: 1, editable: false },
  { field: "from", headerName: "From", flex: 1, editable: false },

  // {
  //   field: "start_time",
  //   headerName: "Start Time",
  //   type: "dateTime",
  //   width: 200,
  //   editable: false,
  // },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    flex: 1,

    renderCell: (param) => {
      return <Status status={param.row.status} />;
    },
  },
  {
    field: "handle_by",
    headerName: "Handle By",
    type: "action",
    flex: 1,

    renderCell: (param) => {
      return param.row.handle_by ? param.row.handle_by : "N/A";
    },
  },
  {
    field: "actions",
    type: "actions",
    flex: 1,

    renderCell: (param) => {
      return <FlightRequestGridMenu data={param.row} />;
    },
  },
];

export default FlightRequest;
