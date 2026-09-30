import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

export default function RoleHome() {
  const { role } = useRole();
  return <Navigate to={role === "admin" ? "/admin" : "/profile"} replace />;
}
