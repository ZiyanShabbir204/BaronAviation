import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal.jsx";
import FlightMaintainceUnavailablityEditAddModal from "../flightMaintainceUnavailablityEditAddModal/FlightMaintainceUnavailablityEditAddModal";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";
export default function MaintainceUnavailablityGridMenu({
  data,
  onRequestComplete,
}) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);

  const deleteHandler = async () => {
    return ApiService.delete(`admin/flight-unavailability/${data.id}`);
  };

  return (
    <div>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight start from ${data.start_time} and end at ${data.end_time}`}
        onDelete={deleteHandler}
        onRequestComplete={onRequestComplete}
      />
      <FlightMaintainceUnavailablityEditAddModal
        open={editOpen}
        setOpen={setEditOpen}
        data={data}
        reason="maintenance"
        onRequestComplete={onRequestComplete}
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />
    </div>
  );
}
