import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import FlightMaintainceUnavailablityEditAddModal from "../flightMaintainceUnavailablityEditAddModal/flightMaintainceUnavailablityEditAddModal";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";

export default function MaintainceUnavailablityGridMenu({ param }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);

  return (
    <div>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`flight start from ${param.row.start_time} and end at ${param.row.end_time}`}
      />
      <FlightMaintainceUnavailablityEditAddModal
        open={editOpen}
        setOpen={setEditOpen}
        flag="edit"
        param={param.row}
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />
    </div>
  );
}
