export const adminRoles = [
  {
    title: "Active Bookings",
    route: "flight-request",
    accessBy: ["booking_agent", "sys_admin", "owner"],
  },
  {
    title: "Maintenance Unavailability",
    route: "maintenance-unavailability",
    accessBy: ["maintenance_worker", "sys_admin", "owner"],
  },

  {
    title: "Flight Unavailability",
    route: "flight-unavailability",
    accessBy: ["sys_admin", "owner"],
  },
  {
    title: "Corporate Client",
    route: "coperate-user",
    accessBy: ["sys_admin", "owner"],
  },
  {
    title: "Admin",
    route: "add-admin",
    accessBy: ["sys_admin", "owner"],
  },
  {
    title: "Customers",
    route: "users",
    accessBy: ["sys_admin", "owner"],
  },
  {
    title: "Logs",
    route: "logs",
    accessBy: ["sys_admin", "owner"],
  },
  {
    title: "Flight Summary",
    route: "flight-summary",
    accessBy: ["sys_admin", "owner"],
  },
];

export const allowedRoute = ["/not-found", "/"];
