import React, { createContext, useState } from "react";

const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const userDataString = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(userDataString));
  const [activeStep, setActiveStep] = useState(0);
  const [profileID, setprofileID] = useState(0);
  const [leadData, setLead] = useState();
  const [lead, setlead] = useState();

  const [leadData, setLead] = useState();
  const [lead, setlead] = useState();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    bank_name: "",
    salary: "",
    account_number: "",
    iban_number: "",
    account_holder_name: "",
    cnic: "",
    mobile_number: "",
    date_of_joining: "",
    date_of_birth: "",
    designation: "",
    description: "",
    nationality: "",
    religion: "",
    number_of_children: "",
    marital_status: "",
    gender: "",
    employment_of_spouse: "",
    address: "",
    emergency_phone_number: "",
    emergency_contact_primary_name: "",
    emergency_contact_primary_relationship: "",
    emergency_contact_primary_phone: "",
    emergency_contact_secondary_name: "",
    emergency_contact_secondary_relationship: "",
    emergency_contact_secondary_phone: "",
  });
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        activeStep,
        setActiveStep,
        formData,
        setFormData,
        profileID,
        setprofileID,
        activeStep,
        setActiveStep,
        formData,
        setFormData,
        profileID,
        setprofileID,
        leadData,
        lead,
        setlead,
        setLead,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
