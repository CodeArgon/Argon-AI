import React, { useEffect, useContext } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { Formik, Form } from "formik";
import Register from "./Register";
import RegisterBankDetails from "./RegisterBankDetails";
import RegisterData from "./RegisterData";
import RegisterEducation from "./RegisterEducation";
import RegisterEmergencyContact from "./RegisterEmergencyContact";
import RegisterExperience from "./RegisterExperience";
import UserContext from "../../../contexts/UserContext";
const steps = [
  "Register",
  "Register Data",
  "Bank Details",
  "Emergency Contact",
  "Education",
  "Work Experience",
];

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
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
  emergency_phone_number: "",
  address: "",
  degree: "",
  institute_name: "",
  duration: "",
  emergency_contact_primary_name: "",
  emergency_contact_primary_relationship: "",
  emergency_contact_primary_phone: "",
  emergency_contact_secondary_name: "",
  emergency_contact_secondary_relationship: "",
  emergency_contact_secondary_phone: "",
  company_name: "",
  job_title: "",
};


const ProfileStepper = () => {
  const { activeStep, setActiveStep } = useContext(UserContext);

  useEffect(() => {
    console.log("activeStep", activeStep);
    // setActiveStep(0);
  }, [activeStep]);
 
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Register />;
      case 1:
        return <RegisterData />;
      case 2:
        return <RegisterBankDetails />;
      case 3:
        return <RegisterEmergencyContact />;
      case 4:
        return <RegisterEducation />;
      case 5:
        return <RegisterExperience />;
      default:
        return null;
    }
  };
  return (
    <div className="account-page" >
      <div className="main-wrapper" >
        <div className="account-content" >
          <Stepper className="fixed-stepper stepper-container"
            style={{ top: 0, position: "absolute", alignSelf: 'center', marginTop: "5px" }}
            activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="container" >

            {/* <div className="account-logo " >
              <Link to="/admin-dashboard">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </Link>
            </div> */}
            <Container>
              <Formik
                initialValues={initialValues}
              // validationSchema={validationSchema[activeStep]}
              // onSubmit={handleSubmit}
              >
                {({ values, isSubmitting, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 3,
                      }}
                    >
                      <Grid container justifyContent="center">
                        <Grid item xs={12} md={10}>
                          {getStepContent(activeStep)}
                        </Grid>
                      </Grid>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStepper;
