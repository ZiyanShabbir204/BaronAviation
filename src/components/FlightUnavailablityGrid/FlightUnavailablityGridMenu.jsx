import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightMaintainceUnavailablityEditAddModal from "../flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal";

export default function FlightUnavailablityGridMenu({param}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen,setEditOpen] = useState(null)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("param",param)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const DeleteHandler = () => {
    setDeleteOpen(true);
  };
  const editHandler = ()=>{
    setEditOpen(true)
  }

  return (
    <div>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight start from ${param.row.start_time} and end at ${param.row.end_time}`}
      />
      <FlightMaintainceUnavailablityEditAddModal open={editOpen} setOpen={setEditOpen} flag="edit" param= {param.row}/>

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
      </Menu>
    </div>
  );
}
