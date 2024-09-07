import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import { Divider } from "@mui/material";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightRequestEditAddModal from "../flightRequestEditModal/FlightRequestEditAddModal";
import ApiService from "../../api.service";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";

export default function FlightRequestGridMenu({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const DeleteHandler = () => {
    setDeleteOpen(true);
  };
  const editHandler = () => {
    setEditOpen(true);
  };

  const onDeleteHandler = async () => {
    try {
      await ApiService.delete(`flight-booking/${data.id}`);
    } catch (err) {
      console.log("err in FlightRequestGridMenu.jsx -> onDeleteHandler", err);
    }
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight from ${data.from} to ${data.to}`}
        onDelete={onDeleteHandler}
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
        <MenuItem onClick={handleClose}>Approved</MenuItem>
        <MenuItem onClick={handleClose}>Pending</MenuItem>
        <MenuItem onClick={handleClose}>Declined</MenuItem>
      </EditDeleteMenu>
    </>
  );
}
