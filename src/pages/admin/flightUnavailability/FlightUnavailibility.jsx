import React, { useMemo, useState } from "react";
import FlightMaintainceUnavailablityEditAddModal from "../../../components/flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import FlightUnavailablityGridMenu from "../../../components/FlightUnavailablityGridMenu/FlightUnavailablityGridMenu";
import useFetchRow from "../../../hooks/useFetchRow";

const FlightUnavailibility = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows } = useFetchRow(
    "admin/flight-unavailability/unavailability"
  );

  const columns = useMemo(
    () => [
      {
        field: "start_time",
        headerName: "Start Time",
        type: "string",
        flex: 1,
        editable: false,
      },
      {
        field: "end_time",
        headerName: "End Time",
        type: "string",
        flex: 1,
        editable: false,
      },
      {
        field: "added_by",
        headerName: "Added By",
        flex: 1,
        editable: false,
      },
      {
        field: "actions",
        type: "actions",
        renderCell: (param) => {
          return (
            <FlightUnavailablityGridMenu
              data={param.row}
              onRequestComplete={requestHanlder}
            />
          );
        },
      },
    ],
    []
  );

  const requestHanlder = () => {
    fetchRows();
  };

  return (
    <div>
      <FlightMaintainceUnavailablityEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        reason="unavailability"
        onRequestComplete={requestHanlder}
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
