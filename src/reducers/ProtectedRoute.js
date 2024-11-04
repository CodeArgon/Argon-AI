
import React from 'react';
import { useAuth } from './ProtectedRoutesReducer'; 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, element }) => {
  const { state } = useAuth(); 
    const { userRole, isAuthenticated } = state; 
    console.log(userRole);

 
  return isAuthenticated && allowedRoles.includes(userRole)
    ? element
    : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
