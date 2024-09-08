import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import AdminCoperateUserAddEditModal from "../adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import { adminUserEditSchema } from "../../schema/validateSchema";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";
export default function AddAdminGridMenu({ data }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const initialValues = {
    username: data.username,
    role: data.role_name,
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
        schema={adminUserEditSchema}
        initialValues={initialValues}
        isRoleExist
        userId={data.id}
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      />
    </>
  );
}
