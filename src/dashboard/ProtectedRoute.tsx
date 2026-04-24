import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authcontext";

// Rol["nombre"] = "admin" | "vendedor" | "cliente"
interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: Array<"admin" | "vendedor" | "cliente">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // allowedRoles es string[], user.rol.nombre es string → comparación directa
  if (allowedRoles && user && !allowedRoles.includes(user.rol.nombre)) {
    return <Navigate to={`/dashboard/${user.rol.nombre}`} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;