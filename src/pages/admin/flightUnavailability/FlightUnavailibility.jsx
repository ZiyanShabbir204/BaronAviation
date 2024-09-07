import React, { useState } from "react";
import FlightMaintainceUnavailablityEditAddModal from "../../../components/flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import FlightUnavailablityGridMenu from "../../../components/FlightUnavailablityGridMenu/FlightUnavailablityGridMenu";

const FlightUnavailibility = () => {
  const [addOpen, setAddOpen] = useState(null);

  return (
    <div>
      <FlightMaintainceUnavailablityEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        flag="add"
      />
      <Widget
        addBtnlabel="Add Flight Unavailablity"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid rows={rows} columns={columns} />
      </Widget>
    </div>
  );
};

export default FlightUnavailibility;

const columns = [
  { field: "flight_no", headerName: "Flight", width: 160, editable: false },
  {
    field: "start_time",
    headerName: "Start Time",
    type: "dateTime",
    width: 200,
    editable: false,
  },
  {
    field: "end_time",
    headerName: "End Time",
    type: "dateTime",
    width: 200,
    editable: false,
  },
  {
    field: "edit_by",
    headerName: "Edit By",
    width: 180,
    editable: false,
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 220,
    editable: false,
  },
  {
    field: "actions",
    type: "actions",
    width: 100,
    renderCell: (param) => {
      return <FlightUnavailablityGridMenu param={param} />;
    },
  },
];

const rows = [
  {
    id: 12,
    flight_no: "ABC12345",
    edit_by: "John Doe",
    reason: "Technical delay",
  },
  {
    id: 1,
    flight_no: "ABC12345",

    edit_by: "John Doe",
    reason: "Technical delay",
  },
  {
    id: 2,
    flight_no: "DEF67890",

    edit_by: "Jane Smith",
    reason: "Weather conditions",
  },
  {
    id: 3,
    flight_no: "GHI23456",

    edit_by: "Mark Johnson",
    reason: "Crew unavailability",
  },
  {
    id: 4,
    flight_no: "JKL78901",

    edit_by: "Emma Davis",
    reason: "Airport restrictions",
  },
  {
    id: 5,
    flight_no: "MNO34567",

    edit_by: "Michael Brown",
    reason: "Passenger issues",
  },
  {
    id: 6,
    flight_no: "PQR89012",

    edit_by: "Olivia Wilson",
    reason: "Flight rescheduling",
  },
  {
    id: 7,
    flight_no: "STU45678",

    edit_by: "Noah Taylor",
    reason: "Fueling delay",
  },
  {
    id: 8,
    flight_no: "VWX01234",

    edit_by: "Liam White",
    reason: "Security check",
  },
  {
    id: 9,
    flight_no: "YZA56789",

    edit_by: "Sophia Harris",
    reason: "Luggage misplacement",
  },
  {
    id: 10,
    flight_no: "BCD90123",

    edit_by: "James Clark",
    reason: "Flight rerouting",
  },
];
