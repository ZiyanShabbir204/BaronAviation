import { useState } from "react";

import "./App.css";
import LoginPage from "./pages/user/Login";
import Sign from "./pages/user/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddAdmin from "./pages/admin/AddAdmin";
import FlightRequest from "./pages/admin/flightRequest/FlightRequest";
import CoperateUser from "./pages/admin/coperateUser/CoperateUser";
import FlightUnavailibility from "./pages/admin/flightUnavailability/FlightUnavailibility";
import MaintainceUnavailablity from "./pages/admin/maintainceUnavailablity/MaintainceUnavailablity";
import ForgetPassword from "./pages/user/ForgetPassword";
import ChangePassword from "./pages/user/ChangePassword";
import Admin from "./pages/admin/Admin";
import { AuthProvider } from "./contexts/auth.context";
import Private from "./components/Private/Private";
import { Navigate } from "react-router-dom";
import Users from "./pages/user/Users";

function App() {
  const router = createBrowserRouter([
    {
      element: <Private />,
      children: [
        {
          path: "/",
          element: <Admin />,
          children: [
            {
              path: "/",
              element: <Navigate to="flight-request" />,
            },
            {
              path: "flight-unavailablity",
              element: <FlightUnavailibility />,
            },
            {
              path: "coperate-user",
              element: <CoperateUser />,
            },
            {
              path: "flight-request",
              element: <FlightRequest />,
            },
            {
              path: "maintaince-unavailablity",
              element: <MaintainceUnavailablity />,
            },
            {
              path: "add-admin",
              element: <AddAdmin />,
            },
            {
              path: "users",
              element: <Users/>,
            },

          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <Sign />,
    },
    {
      path: "forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
