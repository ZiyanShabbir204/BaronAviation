import { useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import DeleteModal from "../deleteModal/DeleteModal.jsx";
import FlightRequestEditAddModal from "../flightRequestEditModal/FlightRequestEditAddModal";
import ApiService from "../../api.service";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import { useSnackbar } from "notistack";
import InvoiceModal from "../invoiceModal/InvoiceModal.jsx";

export default function FlightRequestGridMenu({ data, onRequestComplete }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const menuRef = useRef();
  const deleteHandler = async () => {
    return ApiService.delete(`flight-booking/${data.id}`);
  };

  const updateStatus = async (status) => {
    try {
      await ApiService.put(`flight-booking/${data.id}/change-status`, {
        status,
      });
      menuRef.current.closeMenu();
      onRequestComplete && onRequestComplete();

      enqueueSnackbar("Status has been updated.", {
        variant: "success",
      });
    } catch (err) {
      console.log("error in FlightRequestGridMenu -> updateStatus", err);
    }
  };

  return (
    <>
      <InvoiceModal open={invoiceOpen} setOpen={setInvoiceOpen} />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight from ${data.from} to ${data.to}`}
        onDelete={deleteHandler}
        onRequestComplete={onRequestComplete}
      />
      {editOpen && (
        <FlightRequestEditAddModal
          open={editOpen}
          setOpen={setEditOpen}
          data={data}
          onRequestComplete={onRequestComplete}
        />
      )}
      <EditDeleteMenu
        onEdit={() => setEditOpen(true)}
        onDelete={() => setDeleteOpen(true)}
        ref={menuRef}
      >
        <Divider />
        <MenuItem onClick={() => updateStatus("approve")}>Approved</MenuItem>
        <MenuItem onClick={() => updateStatus("pending")}>Pending</MenuItem>
        <MenuItem onClick={() => updateStatus("declined")}>Declined</MenuItem>
        <Divider />
        <MenuItem onClick={() => setInvoiceOpen(true)}>Send Invoice</MenuItem>
      </EditDeleteMenu>
    </>
  );
}
