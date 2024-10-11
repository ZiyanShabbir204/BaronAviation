import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { adminRoles, allowedRoute } from "../../utilis/admin.roles";


export default function Private() {
  const { user, loading } = useAuth();
  const {pathname} = useLocation();

  if (loading) {
    return null;
  }

  if (user == null) {
    return <Navigate to={"/login"} />;
  }

  const userRole = user.role
  const targetedRouteInfo = adminRoles.find(routeInfo => pathname.includes(routeInfo.route))
  const canAccess =  targetedRouteInfo?.accessBy.includes(userRole)
  if(!canAccess && !allowedRoute.includes(pathname)){
    return <Navigate to={"not-found"}/>
  }
  console.log("user",user)

  return <Outlet />;
}
