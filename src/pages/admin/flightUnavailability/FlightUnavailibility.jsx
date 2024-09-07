import React,{useState} from 'react'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import FlightUnavailableGrid from '../../../components/FlightUnavailablityGrid/FlightUnavailableGrid'
import FlightMaintainceUnavailablityEditAddModal from '../../../components/flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal'


const FlightUnavailibility = () => {
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
          Add Flight Unavailablity
        </Button>
      </Stack>
      <FlightUnavailableGrid/>
    </div>
  )
}

export default FlightUnavailibility
