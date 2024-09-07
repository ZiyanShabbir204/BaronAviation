import React, { useState } from "react";
import AddAdminGrid from "../../components/AddAdmin/AddAdminGrid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import AdminCoperateUserAddEditModal from "../../components/adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import {adminUserAddEditSchema} from "../../schema/validateSchema"
import { Password } from "@mui/icons-material";
const AddAdmin = () => {
  const [open,setOpen] = useState(false)
  const initialValues = { 
    username:"",
    password:"",
    role:"",
    email:"",
    phone:""
  }
  const addHandler = ()=>{
    setOpen(true)
  }

  return (
   
    <div>
      <AdminCoperateUserAddEditModal open={open} setOpen={setOpen} schema={adminUserAddEditSchema} initialValues={initialValues} roleAbled={true} passwordAbled={true} />
      <Stack direction="row" justifyContent="flex-end" marginBottom="15px" >
        <Button variant="contained" endIcon={<AddIcon />} sx={{width:"fit-content"}} onClick={addHandler}>
          Add Admin
        </Button>
      </Stack>

      <AddAdminGrid />
    </div>
  );
};

export default AddAdmin;
