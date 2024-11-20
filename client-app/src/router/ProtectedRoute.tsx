import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../state/useUserStore";


const ProtectedRoute: React.FC = () => {
  const { user } = useUserStore(); 
  const location = useLocation();

  if (user === null || localStorage.getItem('jwt') === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
