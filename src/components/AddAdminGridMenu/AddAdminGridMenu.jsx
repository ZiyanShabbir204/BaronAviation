import { useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal";
import AdminCoperateUserAddEditModal from "../adminCoperateUserAddEditModal/adminCoperateUserAddEditModal";
import {
  adminUserEditSchema,
  userEditSchema,
} from "../../schema/validateSchema";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";
import { Divider, MenuItem } from "@mui/material";
import TransferOwnerShipModal from "../transferOwnershipModal/TransferOwnershipModal";
import { useAuth } from "../../contexts/auth.context";
export default function AddAdminGridMenu({
  data,
  onRequestComplete,
  isRoleExist,
}) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const [transferModalOpen, setTransferModalOpen] = useState(null);
  const { user } = useAuth();

  const initialValues = {
    username: data.username,
    role: data.role_name,
    email: data.email,
    phone: data.phone,
  };

  const deleteHandler = async () => {
    return ApiService.delete(`admin/${data.id}`);
  };
  const transferOwnerShipClickHandler = async () => {
    await ApiService.put(`admin/transfer-ownership/${data.id}`);
  };

  console.log("user", user);

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`${data.username}`}
        onDelete={deleteHandler}
        onRequestComplete={onRequestComplete}
      />
      <TransferOwnerShipModal
        open={transferModalOpen}
        setOpen={setTransferModalOpen}
        text={`${data.username}`}
        onTransfer={transferOwnerShipClickHandler}
        onRequestComplete={onRequestComplete}
      />
      <AdminCoperateUserAddEditModal
        open={editOpen}
        setOpen={setEditOpen}
        schema={userEditSchema}
        initialValues={initialValues}
        userId={data.id}
        isRoleExist={isRoleExist}
        onRequestComplete={onRequestComplete}
        title="Edit Admin"
      />

      <EditDeleteMenu
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      >
        {user.role === "owner" && (
          <>
            <Divider />
            <MenuItem onClick={() => setTransferModalOpen(true)}>
              Transfer Ownership
            </MenuItem>
          </>
        )}
      </EditDeleteMenu>
    </>
  );
}
