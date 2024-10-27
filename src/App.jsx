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
import { SnackbarProvider } from "notistack";
import Logs from "./pages/admin/logs/Logs";
import NotFound from "./pages/admin/notFound/NotFound";
import IndexRoute from "./components/indexRoute/IndexRoute";
import FlightTimeLogDatagrid from "./components/FlightTimeLogDatagrid/FlightTimeLogDatagrid";
import Task from "./pages/admin/task/Task";

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
              element: <IndexRoute />,
            },
            {
              path: "flight-unavailability",
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
              path: "maintenance-unavailability",
              element: <MaintainceUnavailablity />,
            },
            {
              path: "add-admin",
              element: <AddAdmin />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "logs",
              element: <Logs />,
            },
            {
              path: "flight-summary",
              element: <FlightTimeLogDatagrid />,
            },
            {
              path: "not-found",
              element: <NotFound />,
            },
            
            {
              path: "*",
              element: <NotFound />,
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
      path: 'task',
      element: <Task/>
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
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
