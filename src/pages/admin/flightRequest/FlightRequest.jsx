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
  numericFilterOperators,
  stringFilterOperators,
} from "../../../utilis/gridFilterFormat";
const FlightRequest = () => {
  const [addOpen, setAddOpen] = useState(null);
  const { rows, fetchRows, rowsLoading } = useFetchRow("flight-booking");
  const [tempRows, setTempRows] = useState([]);

  useEffect(() => {
    const r = rows.map((row) => {
      const adultCount = row.attendants.filter(
        (a) => a.type === "Adult"
      ).length;
      const childCount = row.attendants.filter(
        (a) => a.type !== "Adult"
      ).length;

      const invoice = row.invoice;

      const invoiceData = {
        invoiceBill: invoice?.bill || "N/A",
        invoiceStatus: invoice?.status || "N/A",
      };

      if (row.status !== "approve") {
        return { ...row, adultCount, childCount, ...invoiceData };
      }

      return {
        ...row,
        status: "approved",
        ...invoiceData,
        adultCount,
        childCount,
      };
    });
    setTempRows(r);
  }, [rows]);

  const columns = useMemo(
    () => [
      {
        field: "booking_id",
        headerName: "Flight ID",
        filterOperators: stringFilterOperators,
        width: 220,
        renderCell: (param) => {
          return param.row.booking_id ? param.row.booking_id : "N/A";
        },
      },
      {
        field: "user",
        headerName: "User",
        valueGetter: (param) => param?.username,
        filterOperators: stringFilterOperators,
        renderCell: (param) => {
          return param.row.user?.username
            ? param.row.user.username
            : param.row.username || "N/A";
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
        headerName: "Flight Start Time",
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
        field: "end_time",
        headerName: "Flight End Time",
        type: "date",
        filterOperators: dateFilterOperators,
        valueGetter: (value) => new Date(value),
        width: 200,
        editable: false,
        renderCell: (param) => {
          return param.row.end_time ? dateFormat(param.row.end_time) : "N/A";
        },
      },
      {
        field: "createdAt",
        headerName: "Booked At",
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
        field: "invoiceStatus",
        headerName: "Invoice Status",
        width: 200,
        renderCell: (param) => {
          return <Status status={param.row.invoiceStatus} />;
        },
      },
      {
        field: "invoiceBill",
        headerName: "Invoice Amount",
        width: 200,
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
        field: "request_return",
        headerName: "Return Flight",
        valueGetter: (param) => {
          return param ? "Yes" : "No";
        },
        width: 120,
        renderCell: (param) => {
          return param.row.request_return ? "Yes" : "No";
        },
      },
      {
        field: "adultCount",
        headerName: "No. of Adult",
        filterOperators: numericFilterOperators,
        width: 150,
        type: "text",
      },
      {
        field: "childCount",
        headerName: "No. of Children",
        filterOperators: numericFilterOperators,
        width: 150,
        type: "text",
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
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
      {addOpen && (
        <FlightRequestEditAddModal
          open={addOpen}
          setOpen={setAddOpen}
          flag="add"
          onRequestComplete={requestCompleteHandler}
        />
      )}
      <Widget
        addBtnlabel="Add Active booking"
        onAddClick={() => setAddOpen(true)}
      >
        <Datagrid
          rows={tempRows}
          columns={columns}
          loading={rowsLoading}
          sortModel={[{ field: "booking_id", sort: "desc" }]}
        />
      </Widget>
    </>
  );
};

export default FlightRequest;
