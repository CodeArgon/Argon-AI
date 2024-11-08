import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useRole } from "../contexts/RoleContext";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { userRole } = useRole();

  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Navigate to="/unauthorized" />
        )
      }
    />
  );
};

export default ProtectedRoute;
