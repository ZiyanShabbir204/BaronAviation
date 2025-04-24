import { useState, useCallback, useEffect, useMemo } from "react";
import FlightMaintainceUnavailablityEditAddModal from "../../../components/flightMaintainceUnavailablityEditAddModal/FlightMaintainceUnavailablityEditAddModal";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import MaintainceUnavailablityGridMenu from "../../../components/MaintainceUnavailablityGridMenu/MaintainceUnavailablityGridMenu";
import useFetchRow from "../../../hooks/useFetchRow";
import { dateFormat } from "../../../utilis/dateFormat";
import {
  dateFilterOperators,
  stringFilterOperators,
} from "../../../utilis/gridFilterFormat";
import CommentCell from "../../../components/CommentCell/CommentCell";

const MaintainceUnavailablity = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows, rowsLoading } = useFetchRow(
    "admin/flight-unavailability/maintenance"
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
        field: "added_by",
        headerName: "Added By",
        filterOperators: stringFilterOperators,
        flex: 1,
        valueGetter: (param) => param?.username,
        editable: false,
        renderCell: (param) => param.row.added_by?.username,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
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
      {addOpen && (
        <FlightMaintainceUnavailablityEditAddModal
          open={addOpen}
          setOpen={setAddOpen}
          reason="maintenance"
          onRequestComplete={requestHandler}
        />
      )}

      <Widget
        addBtnlabel="Add Maintenance Unavailability"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid
          rows={rows}
          columns={columns}
          loading={rowsLoading}
          sortModel={[{ field: "start_time", sort: "desc" }]}
        />
      </Widget>
    </>
  );
};

export default MaintainceUnavailablity;
