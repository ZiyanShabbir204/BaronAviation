import React, { useMemo, useState } from "react";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import FlightUnavailablityGridMenu from "../../../components/FlightUnavailablityGridMenu/FlightUnavailablityGridMenu";
import useFetchRow from "../../../hooks/useFetchRow";
import { dateFormat } from "../../../utilis/dateFormat";
import {
  dateFilterOperators,
  stringFilterOperators,
} from "../../../utilis/gridFilterFormat";
import FlightMaintainceUnavailablityEditAddModal from "../../../components/flightMaintainceUnavailablityEditAddModal/FlightMaintainceUnavailablityEditAddModal";
import CommentCell from "../../../components/CommentCell/CommentCell";

const FlightUnavailibility = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows, rowsLoading } = useFetchRow(
    "admin/flight-unavailability/unavailability"
  );

  const columns = useMemo(
    () => [
      {
        field: "start_time",
        headerName: "Start Time",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.start_time);
        },
      },
      {
        field: "end_time",
        headerName: "End Time",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        flex: 1,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.end_time);
        },
      },
      {
        field: "added_by",
        headerName: "Added By",
        filterOperators: stringFilterOperators,
        flex: 1,
        editable: false,
        valueGetter: (param) => param.username,
        renderCell: (param) => param.row.added_by.username,
      },
      {
        field: "comment_by_admin",
        headerName: "Admin Comment",
        filterOperators: stringFilterOperators,
        type: "text",
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.comment_by_admin ? (
            <CommentCell message={param.row.comment_by_admin} />
          ) : (
            "N/A"
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
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
      {addOpen && (
        <FlightMaintainceUnavailablityEditAddModal
          open={addOpen}
          setOpen={setAddOpen}
          reason="unavailability"
          onRequestComplete={requestHanlder}
        />
      )}
      <Widget
        addBtnlabel="Add Flight Unavailability"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid rows={rows} columns={columns} loading={rowsLoading} />
      </Widget>
    </div>
  );
};

export default FlightUnavailibility;
