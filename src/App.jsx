import { useState } from 'react'

import './App.css'
import LoginPage from  "./pages/user/Login"
import Sign from './pages/user/Signup';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddAdmin from './pages/admin/AddAdmin';
import FlightRequest from './pages/admin/flightRequest/FlightRequest';
import CoperateUser from "./pages/admin/coperateUser/CoperateUser"
import FlightUnavailibility from "./pages/admin/flightUnavailability/FlightUnavailibility"
import MaintainceUnavailablity from './pages/admin/maintainceUnavailablity/MaintainceUnavailablity';
import ForgetPassword from "./pages/user/ForgetPassword"
import ChangePassword from "./pages/user/ChangePassword"
import Admin from "./pages/admin/Admin"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element : <Admin/>,
      
      children:[
        {
          path: "flight-unavailablity",
          element: <FlightUnavailibility/>
        },
        {
          path: "coperate-user",
          element: <CoperateUser/>
        },
        {
          path: "flight-request",
          element: <FlightRequest/>
        },
        {
          path: "maintaince-unavailablity",
          element: <MaintainceUnavailablity/>
        }, {
          path: "add-admin",
          element: <AddAdmin/>
        },

      ]
    },
    {
      path: "/login",
      element: <LoginPage />,

    },
    {
      path:"signup",
      element:<Sign/>
    },
    {
      path: "forgetpassword",
      element:<ForgetPassword/>
    },
    {
      path: "changepassword",
      element:<ChangePassword/>

    },
   
  ]);

 

  return (
   <>
    <RouterProvider router={router} />
    
    </>
  )
}

export default App
