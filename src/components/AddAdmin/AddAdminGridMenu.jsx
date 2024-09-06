import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import DeleteModal from "../deleteModal/DeleteModal";

export default function AddAdminGridMenu({ param }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("param", param);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const DeleteHandler = () => {
    setDeleteOpen(true);
  };

  return (
    <div>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`${param.row.username}`}
      />

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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={DeleteHandler}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
