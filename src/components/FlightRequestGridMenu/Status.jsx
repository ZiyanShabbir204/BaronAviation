import React from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
const CHIPS = {
  approved: {
    icon: <CheckIcon color="success" />,
    label: "Approved",
  },
  pending: {
    icon: <QuestionMarkIcon color="warning" />,
    label: "Pending",
  },
  declined: {
    icon: <CloseIcon color="error" />,
    label: "Declined",
  },
};
const Status = ({ status }) => {
  const { icon, label } = CHIPS[status];
  return (
    <Chip
      icon={icon}
      label={label}
      variant="outlined"
      sx={{ width: "103px" }}
    />
  );
};

export default Status;
