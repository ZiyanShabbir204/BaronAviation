import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LogDatagrid from "../../../components/LogDatagrid/LogDatagrid";
import FlightTimeLogDatagrid from "../../../components/FlightTimeLogDatagrid/FlightTimeLogDatagrid";

export default function Logs() {
  const [value, setValue] = useState("admin");

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Admins" id="simple-tab-0" value="admin" />
          <Tab
            label="Corperate Client"
            id="simple-tab-1"
            value="corperate-client"
          />
          <Tab label="Customer" id="simple-tab-2" value="customer" />
        </Tabs>
      </Box>

      <Box
        sx={{
          marginTop: 3,
        }}
      >
        <LogDatagrid value={value} />
      </Box>
    </Box>
  );
}
