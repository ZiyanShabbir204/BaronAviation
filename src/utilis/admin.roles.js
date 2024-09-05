export const adminRoles = [
  {
    title: "Flight Request",
    route: "flight-request",
    accessBy: ["booking_agent", "sys_admin"],
  },
  {
    title: "Add Maintaince Unavailablity",
    route: "maintaince-unavailablity",
    accessBy: ['maintenance_worker',"sys_admin"],
  },

  {
    title: "Add Flight Unavailablity",
    route: "flight-unavailablity",
    accessBy: ["sys_admin"],
  },
  {
    title: "Add Coperate User",
    route: "coperate-user",
    accessBy: ["sys_admin"],
  },
  {
    title: "Add Admin",
    route: "add-admin",
    accessBy:  ["sys_admin"],
  },
];
