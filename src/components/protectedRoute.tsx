// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = localStorage.getItem("trackeyUser");

  if (!user) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
