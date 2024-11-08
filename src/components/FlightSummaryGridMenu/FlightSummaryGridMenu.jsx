import { useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import DeleteModal from "../deleteModal/DeleteModal.jsx";
import FlightRequestEditAddModal from "../flightRequestEditModal/FlightRequestEditAddModal";
import ApiService from "../../api.service";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import { useSnackbar } from "notistack";
import ViewDetailMenu from "../ViewDetailMenu/ViewDetailMenu.jsx";
import ViewDetailsModal from "../ViewDetailsModal/ViewDetailsModal.jsx";

export default function FlightSummaryGridMenu({ data, type }) {
  const [viewDetailOpen, setViewDetailOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const menuRef = useRef();
  const deleteHandler = async () => {
    return ApiService.delete(`flight-booking/${data.id}`);
  };

  const updateStatus = async (status) => {
    try {
      await ApiService.put(`flight-booking/${data.id}/change-status`, {
        status,
      });
      menuRef.current.closeMenu();
      onRequestComplete && onRequestComplete();

      enqueueSnackbar("Status has been updated.", {
        variant: "success",
      });
    } catch (err) {
      console.log("error in FlightRequestGridMenu -> updateStatus", err);
    }
  };

  return (
    <>
    <ViewDetailsModal
     open={viewDetailOpen}
     setOpen={setViewDetailOpen}
     data={data}
     type = {type}
    
    />


      <ViewDetailMenu
        ref={menuRef}
        onViewDetail={() => setViewDetailOpen(true)}
      ></ViewDetailMenu>

     
    </>
  );
}
