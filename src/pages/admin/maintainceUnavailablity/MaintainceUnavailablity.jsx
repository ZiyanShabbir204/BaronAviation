import React, {useState}from 'react'
import MaintainceUnavailablityGrid from '../../../components/MaintainceUnavailablity/MaintainceUnavailablityGrid'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import FlightMaintainceUnavailablityEditAddModal from '../../../components/flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal'

const MaintainceUnavailablity = () => {
  const [addOpen,setAddOpen] = useState(null)

  const addHandler = ()=>{
    setAddOpen(true)
  }
  return (
    <div> 
      <FlightMaintainceUnavailablityEditAddModal
        open={addOpen}
        setOpen={setAddOpen}
        flag="add"
      
      />
    <Stack direction="row" justifyContent="flex-end" marginBottom="15px" >
        <Button variant="contained" endIcon={<AddIcon />} sx={{width:"fit-content"}} onClick={addHandler}>
          Add Maintaince Unavailablity
        </Button>
      </Stack>

    <MaintainceUnavailablityGrid/>
</div>
  )
}

export default MaintainceUnavailablity