import React, { useContext,useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext from "../../../contexts/UserContext";
import { registerUserEdu } from "../../../helpers/users";
import { Button } from "@mui/material";
const schema = yup.object({
  institute_name: yup.string().required("Institute Name is required"),
  degree: yup.string().required("Degree is required").trim(),
  duration: yup.string().required("Duration is required").trim(),
});

const RegisterEducation = (props) => {
  const { setActiveStep, formData, setFormData,setprofileID, profileID } = useContext(UserContext);
  


  useEffect(() => {
    setprofileID(localStorage.getItem("ProfileId"));
    console.log("setprofileID", profileID);
  }, [profileID]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const onSubmit = async (data,) => {
    console.log("RegisterEducation" ,profileID,data);
    try {
      const result = await registerUserEdu(data,profileID);
      if (result === true) {
        setFormData(data); 
        setActiveStep(5);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleBack = () => {
    setActiveStep(3);
  };
  return (
    <div className="container">
      <div className="account-box">
        <div className="account-wrapper">
          <h3 className="account-title">Education Information</h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-block mb-3">
                <label>Institute</label>
                <Controller
                  name="institute_name"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`form-control ${
                        errors?.institute_name ? "error-input" : ""
                      }`}
                      type="text"
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e); 
                      }}
                      {...field}
                    />
                  )}
                />
                <span className="text-danger">
                  {errors?.institute_name?.message}
                </span>
              </div>
              {/* First Name and Last Name */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Degree/Program</label>
                  <Controller
                    name="degree"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.degree ? "error-input" : ""
                        }`}
                        type="text"
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e); 
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">{errors?.degree?.message}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Duration</label>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.duration ? "error-input" : ""
                        }`}
                        type="number"
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e); 
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.duration?.message}
                  </span>
                </div>
              </div>

              <div className="input-block mb-3">
                <label>Institute</label>
                <Controller
                  name="institute_name2"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`form-control ${
                        errors?.institute_name2 ? "error-input" : ""
                      }`}
                      type="text"
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e); 
                      }}
                      {...field}
                    />
                  )}
                />
                <span className="text-danger">
                  {errors?.institute_name2?.message}
                </span>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Degree/Program</label>
                  <Controller
                    name="degree2"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.degree2 ? "error-input" : ""
                        }`}
                        type="text"
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e); 
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.degree2?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Duration</label>
                  <Controller
                    name="duration2"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.duration2 ? "error-input" : ""
                        }`}
                        type="number"
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e); 
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.duration2?.message}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        style={{
          position:"fixed",
          display: "flex",
          justifyContent: "space-between",
          bottom: "20px",
          width:"500px"
        }}
      >
        <Button
          disabled={false}
          onClick={handleBack}
          variant="outlined"
          style={{ width: "150px", marginLeft: "5px" }}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={false}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          style={{ width: "150px", marginRight: "5px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RegisterEducation;
