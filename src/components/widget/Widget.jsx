import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";

const Widget = ({ addBtnlabel, onAddClick, children }) => {
  return (
    <>
      <Stack direction="row" justifyContent="flex-end" marginBottom="15px">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ width: "fit-content" }}
          onClick={onAddClick}
        >
          {addBtnlabel}
        </Button>
      </Stack>
      {children}
    </>
  );
};

export default Widget;
