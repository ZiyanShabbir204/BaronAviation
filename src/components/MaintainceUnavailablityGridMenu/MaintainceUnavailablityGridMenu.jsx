import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightMaintainceUnavailablityEditAddModal from "../flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";
export default function MaintainceUnavailablityGridMenu({ data }) {
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
      />
      <FlightMaintainceUnavailablityEditAddModal
        open={editOpen}
        setOpen={setEditOpen}
        data={data}
        reason="maintenance"
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />
    </div>
  );
}
