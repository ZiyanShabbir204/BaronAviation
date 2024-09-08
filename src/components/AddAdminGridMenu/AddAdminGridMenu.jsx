import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import AdminCoperateUserAddEditModal from "../adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import { adminUserAddEditSchema } from "../../schema/validateSchema";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";
export default function AddAdminGridMenu({ data }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);

  const initialValues = {
    username: data.username,
    password: data.password,
    role: data.role,
    email: data.email,
    phone: data.phone,
  };

  const deleteHandler = async () => {
    return ApiService.delete(`admin/${data.id}`);
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
        schema={adminUserAddEditSchema}
        initialValues={initialValues}
        isRoleExist
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />
    </>
  );
}
