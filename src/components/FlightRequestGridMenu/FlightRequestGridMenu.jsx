import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightRequestEditAddModal from "../flightRequestEditModal/FlightRequestEditAddModal";
import ApiService from "../../api.service";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";

export default function FlightRequestGridMenu({ data }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const deleteHandler = async () => {
    return ApiService.delete(`flight-booking/${data.id}`);
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight from ${data.from} to ${data.to}`}
        onDelete={deleteHandler}
      />
      <FlightRequestEditAddModal
        open={editOpen}
        setOpen={setEditOpen}
        flag="edit"
        param={data}
      />
      <EditDeleteMenu
        onEdit={() => setEditOpen(true)}
        onDelete={() => setDeleteOpen(true)}
      >
        <Divider />
        <MenuItem>Approved</MenuItem>
        <MenuItem>Pending</MenuItem>
        <MenuItem>Declined</MenuItem>
      </EditDeleteMenu>
    </>
  );
}
