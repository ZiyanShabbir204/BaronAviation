import { useRef, useState } from "react";
import DeleteModal from "../deleteModal/DeleteModal.jsx";
import { coperateUserEditSchema } from "../../schema/validateSchema";
import AdminCoperateUserAddEditModal from "../adminCoperateUserAddEditModal/AdminCoperateUserAddEditModal.jsx";
import EditDeleteMenu from "../EditDeleteMenu/EditDeleteMenu";
import ApiService from "../../api.service";
import { Divider, MenuItem } from "@mui/material";
import EditHourModal from "../EditHourModal/EditHourModal";
import HoursLogModal from "../HoursLogModal/HoursLogModal.jsx";

export default function CoperateUserGridMenu({ data, onRequestComplete }) {
  const [deleteOpen, setDeleteOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const [hourModalOpen, setHourModalOpen] = useState(null);
  const [hourLogModalOpen, setHourLogModalOpen] = useState(null);
  const menuRef = useRef();

  const initialValues = {
    username: data.username,
    total_hours: data.hours.total_hours,
    email: data.email,
    phone: data.phone,
  };

  const deleteHandler = async () => {
    return ApiService.delete(`admin/cooperate-customer/${data.id}`);
  };

  const EditHourClickHandler = () => {
    setHourModalOpen(true);
    menuRef.current.closeMenu();
  };

  const HoursLogClickHandler = () => {
    setHourLogModalOpen(true);
    menuRef.current.closeMenu();
  };

  return (
    <>
      <EditDeleteMenu
        ref={menuRef}
        onDelete={() => setDeleteOpen(true)}
        onEdit={() => setEditOpen(true)}
      >
        <Divider />
        <MenuItem onClick={EditHourClickHandler}>Edit Hours</MenuItem>
        <MenuItem onClick={HoursLogClickHandler}>Hours History</MenuItem>
      </EditDeleteMenu>

      {/* Modals */}
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        text={`${data.username}`}
        onDelete={deleteHandler}
        onRequestComplete={onRequestComplete}
      />
      <AdminCoperateUserAddEditModal
        open={editOpen}
        setOpen={setEditOpen}
        schema={coperateUserEditSchema}
        initialValues={initialValues}
        onRequestComplete={onRequestComplete}
        isTotalHoursExist
        userId={data.id}
        title="Edit corporate client"
      />

      <EditHourModal
        open={hourModalOpen}
        setOpen={setHourModalOpen}
        data={data}
        onRequestComplete={onRequestComplete}
      />
      <HoursLogModal
        open={hourLogModalOpen}
        setOpen={setHourLogModalOpen}
        data={data}
        onRequestComplete={onRequestComplete}
      />
    </>
  );
}
