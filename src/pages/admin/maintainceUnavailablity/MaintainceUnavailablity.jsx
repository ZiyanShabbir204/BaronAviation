import { useState, useCallback, useEffect, useMemo } from "react";
import FlightMaintainceUnavailablityEditAddModal from "../../../components/flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import ApiService from "../../../api.service";
import MaintainceUnavailablityGridMenu from "../../../components/MaintainceUnavailablityGridMenu/MaintainceUnavailablityGridMenu";
import useFetchRow from "../../../hooks/useFetchRow";

const MaintainceUnavailablity = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows } = useFetchRow(
    "admin/flight-unavailability/maintenance"
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
            <MaintainceUnavailablityGridMenu
              onRequestComplete={requestHandler}
              data={param.row}
            />
          );
        },
      },
    ],
    []
  );

  const requestHandler = () => {
    fetchRows();
  };

  return (
    <>
      <FlightMaintainceUnavailablityEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        reason="maintenance"
        onRequestComplete={requestHandler}
      />

      <Widget
        addBtnlabel="Add Maintaince Unavailablity"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid rows={rows} columns={columns} />
      </Widget>
    </>
  );
};

export default MaintainceUnavailablity;
