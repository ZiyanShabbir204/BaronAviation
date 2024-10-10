import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/auth.context'

const IndexRoute = () => {
    const {user} = useAuth()
    const pathname = useLocation()
    
    if(user.role === "maintenance_worker"){
        console.log("index");
        return <Navigate to="maintaince-unavailablity"/>
    }
    
    
    return <Navigate to="/flight-request" />
  
}

export default IndexRoute