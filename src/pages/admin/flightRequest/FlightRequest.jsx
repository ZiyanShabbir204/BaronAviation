import React, { useState, useCallback, useEffect, useMemo } from "react";
import FlightRequestEditAddModal from "../../../components/flightRequestEditModal/FlightRequestEditAddModal";
import Widget from "../../../components/widget/Widget";
import Datagrid from "../../../components/Datagrid/Datagrid";
import ApiService from "../../../api.service";
import Status from "../../../components/FlightRequestGridMenu/Status";
import FlightRequestGridMenu from "../../../components/FlightRequestGridMenu/FlightRequestGridMenu";
import useFetchRow from "../../../hooks/useFetchRow";
import { dateFormat } from "../../../utilis/dateFormat";
import { Typography } from "@mui/material";
import CommentCell from "../../../components/CommentCell/CommentCell";
import {
  dateFilterOperators,
  stringFilterOperators,
} from "../../../utilis/gridFilterFormat";
const FlightRequest = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows, rowsLoading } = useFetchRow("flight-booking");
  // console.log("rows flight booking",rows)

  const columns = useMemo(
    () => [
      {
        field: "user",
        headerName: "User",
        valueGetter: (param) => param.username,
        filterOperators: stringFilterOperators,
        renderCell: (param) => {
          return param.row.user.username;
        },
      },
     
      {
        field: "from",
        filterOperators: stringFilterOperators,
        headerName: "From",
        editable: false,
        width: 160,
      },
      {
        field: "to",
        filterOperators: stringFilterOperators,
        headerName: "To",
        editable: false,
        width: 160,
      },

      {
        field: "start_time",
        headerName: "Start Time",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        width: 200,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.start_time);
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        width: 200,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.createdAt);
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        filterOperators: stringFilterOperators,
        renderCell: (param) => {
          return <Status status={param.row.status} />;
        },
      },
      {
        field: "status_updated_at",
        headerName: "Status Updated",
        type: "date",
        valueGetter: (value) => new Date(value),
        filterOperators: dateFilterOperators,
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.status_updated_at
            ? dateFormat(param.row.status_updated_at)
            : "N/A";
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
        field: "handle_by",
        headerName: "Handle By",
        filterOperators: stringFilterOperators,
        type: "action",
        valueGetter: (param) => (param ? param.username : "N/A"),
        renderCell: (param) => {
          return param.row.handle_by ? param.row.handle_by.username : "N/A";
        },
      },
      {
        field: "actions",
        type: "actions",
        renderCell: (param) => {
          return (
            <FlightRequestGridMenu
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

  return (
    <>
      {addOpen && <FlightRequestEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        flag="add"
        onRequestComplete={requestCompleteHandler}
      />}
      <Widget
        addBtnlabel="Add Active booking"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid rows={rows} columns={columns} loading={rowsLoading} />
      </Widget>
    </>
  );
};

export default FlightRequest;
