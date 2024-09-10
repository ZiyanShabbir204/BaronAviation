import { useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightRequestEditAddModal from "../flightRequestEditModal/FlightRequestEditAddModal";
import ApiService from "../../api.service";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";

export default function FlightRequestGridMenu({ data, onRequestComplete }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
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
    } catch (err) {
      console.log("error in FlightRequestGridMenu -> updateStatus", err);
    }
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight from ${data.from} to ${data.to}`}
        onDelete={deleteHandler}
        onRequestComplete={onRequestComplete}
      />
      <FlightRequestEditAddModal
        open={editOpen}
        setOpen={setEditOpen}
        data={data}
        onRequestComplete={onRequestComplete}
      />
      <EditDeleteMenu
        onEdit={() => setEditOpen(true)}
        onDelete={() => setDeleteOpen(true)}
        ref={menuRef}
      >
        <Divider />
        <MenuItem onClick={() => updateStatus("approve")}>Approved</MenuItem>
        <MenuItem onClick={() => updateStatus("pending")}>Pending</MenuItem>
        <MenuItem onClick={() => updateStatus("declined")}>Declined</MenuItem>
      </EditDeleteMenu>
    </>
  );
}
