import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import { Divider } from "@mui/material";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightRequestEditModal from "../FlightRequestEditModal/FlightRequestEditModal";

export default function FlightRequestGridMenu({ param }) {
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

  return (
    <div>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight from ${param.row.from} to ${param.row.to}`}
      />
      <FlightRequestEditModal open={editOpen} setOpen={setEditOpen} />
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={editHandler}>Edit</MenuItem>
        <MenuItem onClick={DeleteHandler}>Delete</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Approved</MenuItem>
        <MenuItem onClick={handleClose}>Pending</MenuItem>
        <MenuItem onClick={handleClose}>Declined</MenuItem>
      </Menu>
    </div>
  );
}
