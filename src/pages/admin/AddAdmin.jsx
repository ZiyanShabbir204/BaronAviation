import React from "react";
import AddAdminGrid from "../../components/AddAdmin/AddAdminGrid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";

const AddAdmin = () => {
  return (
    <div>
      <Stack direction="row" justifyContent="flex-end" marginBottom="15px" >
        <Button variant="contained" endIcon={<AddIcon />} sx={{width:"fit-content"}}>
          Add Admin
        </Button>
      </Stack>

      <AddAdminGrid />
    </div>
  );
};

export default AddAdmin;
