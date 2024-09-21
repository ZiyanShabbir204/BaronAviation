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
const FlightRequest = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows, rowsLoading } = useFetchRow("flight-booking");

  const columns = useMemo(
    () => [
      {
        field: "user",
        headerName: "User",

        renderCell: (param) => {
          return param.row.user.username;
        },
      },
      { field: "to", headerName: "To", editable: false, width: 160 },
      { field: "from", headerName: "From", editable: false, width: 160 },

      {
        field: "start_time",
        headerName: "Start Time",
        type: "text",
        width: 200,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.start_time);
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        renderCell: (param) => {
          return <Status status={param.row.status} />;
        },
      },
      {
        field: "status_updated_at",
        headerName: "Status Updated",
        type: "text",
        width: 200,
        editable: false,
        renderCell: (param) => {
          return dateFormat(param.row.start_time);
        },
      },
      {
        field: "comment_by_admin",
        headerName: "Admin Comment",
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
        field: "comment_by_user",
        headerName: "User Comment",
        type: "text",
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.comment_by_user ? (
            <CommentCell message={param.row.comment_by_user} />
          ) : (
            "N/A"
          );
        },
      },

      {
        field: "handle_by",
        headerName: "Handle By",
        type: "action",

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
      <FlightRequestEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        flag="add"
        onRequestComplete={requestCompleteHandler}
      />
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
