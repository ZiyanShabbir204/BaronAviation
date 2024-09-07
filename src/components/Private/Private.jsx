import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

export default function Private() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user == null) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}
