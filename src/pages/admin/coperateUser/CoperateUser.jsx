import React,{useState} from "react";
import CoperateUserGrid from "../../../components/coperateUser/coperateUserGrid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import AdminCoperateUserAddEditModal from "../../../components/adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import { coperateUserAddEditSchema } from "../../../schema/validateSchema";
const CoperateUser = () => {
  const [open,setOpen] = useState(false)
  const initialValues = { 
    username:"",
    password:"",
    total_hours:"",
    email:"",
    phone:""
  }
  const addHandler = ()=>{
    setOpen(true)
  }
  return (
    <div>
      <AdminCoperateUserAddEditModal
        open={open}
        setOpen={setOpen}
        schema={coperateUserAddEditSchema}
        initialValues={initialValues}
        passwordAbled={true}
        total_hours={true}
      />
      <Stack direction="row" justifyContent="flex-end" marginBottom="15px">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ width: "fit-content" }}
          onClick={addHandler}
        >
          Add Coperate User
        </Button>
      </Stack>

      <CoperateUserGrid />
    </div>
  );
};

export default CoperateUser;
