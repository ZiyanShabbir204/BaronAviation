import React ,{useState}from 'react'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";
import FlightRequestGrid from '../../../components/FlightRequest/FlightRequestGrid'
import FlightRequestEditAddModal from '../../../components/flightRequestEditModal/FlightRequestEditAddModal';

const FlightRequest = () => {
  const [addOpen,setAddOpen] = useState(null)

  const addHandler = ()=>{
    setAddOpen(true)
  }


  return (
    <div>
      <FlightRequestEditAddModal open={addOpen} setOpen={setAddOpen} flag="add"/>
      <Stack direction="row" justifyContent="flex-end" marginBottom="15px" >
        <Button variant="contained" endIcon={<AddIcon />} sx={{width:"fit-content"}} onClick={addHandler}>
          Add Flight Request
        </Button>
      </Stack>
        <FlightRequestGrid/>
        
      
    </div>
  )
}

export default FlightRequest
