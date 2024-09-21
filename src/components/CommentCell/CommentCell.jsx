import { Typography, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export default function CommentCell({ message }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        width: "200px",
      }}
    >
      <Tooltip title={message} placement="left">
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "default",
          }}
        >
          {message}
        </Typography>
      </Tooltip>
    </Box>
  );
}
