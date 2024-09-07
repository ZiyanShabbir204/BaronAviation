import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import { coperateUserAddEditSchema } from "../../schema/validateSchema";
import AdminCoperateUserAddEditModal from "../adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";

export default function CoperateUserGridMenu({ data }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);

  const initialValues = {
    username: data.username,
    total_hours: data.total_hours,
    email: data.email,
    phone: data.phone,
  };

  const deleteHandler = async () => {
    return ApiService.delete(`admin/cooperate-customer/${data.id}`);
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`${data.username}`}
        onDelete={deleteHandler}
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
