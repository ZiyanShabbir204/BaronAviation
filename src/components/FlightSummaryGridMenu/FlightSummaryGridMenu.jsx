import { useRef, useState } from "react";
import ViewDetailMenu from "../ViewDetailMenu/ViewDetailMenu.jsx";
import ViewDetailsModal from "../ViewDetailsModal/ViewDetailsModal.jsx";

export default function FlightSummaryGridMenu({ data, type }) {
  const [viewDetailOpen, setViewDetailOpen] = useState(false);
  const menuRef = useRef();

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
