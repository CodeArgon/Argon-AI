// src/context/RoleContext.js
import React, { createContext, useContext, useState } from "react";

// Create RoleContext
const RoleContext = createContext();

// Custom hook to use RoleContext easily

// Create RoleProvider to wrap around the app
export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("guest"); // Default to guest

  const value = {
    userRole,
    setUserRole, // This will allow us to change the role later
  };

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};
