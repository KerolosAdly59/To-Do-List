import {  useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../UseAuth/UseAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!loading) {
      setCanRender(true);
    }
  }, [loading]);

  if (!canRender) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
