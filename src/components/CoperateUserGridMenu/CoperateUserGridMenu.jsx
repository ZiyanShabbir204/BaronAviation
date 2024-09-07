import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import { coperateUserAddEditSchema } from "../../schema/validateSchema";
import AdminCoperateUserAddEditModal from "../adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";

export default function CoperateUserGridMenu({ param }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);

  const initialValues = {
    username: param.row.username,
    total_hours: param.row.total_hours,
    email: param.row.email,
    phone: param.row.phone,
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`${param.row.username}`}
      />
      <AdminCoperateUserAddEditModal
        open={editOpen}
        setOpen={setEditOpen}
        schema={coperateUserAddEditSchema}
        initialValues={initialValues}
        totalHoursAbled={true}
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />
    </>
  );
}
