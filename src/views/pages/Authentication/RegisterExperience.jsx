import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext from "../../../contexts/UserContext";
import { Button } from "@mui/material";
import { registerUserExperience } from "../../../helpers/users";

const schema = yup.object({
  company_name: yup.string().required("Company Name is required"),
  job_title: yup.string().required("Designation is required").trim(),
  start_date: yup.string().required("Start Date is required").trim(),
  end_date: yup.string().required("End Date is required").trim(),
});

const RegisterExperience = (props) => {
  const { setActiveStep, formData, setFormData, profileID } =
    useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const onSubmit = async (data) => {
    console.log("RegisterExperience", data, " this");
    setFormData(data);
    try {
      const result = await registerUserExperience(data, profileID);
      if (result === true) {
        // setActiveStep(6);
        console.log("Move to next page");
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
    setActiveStep(4);
  };

  return (
    <div className="container">
      <div className="account-box">
        <div className="account-wrapper">
          <h3 className="account-title">Work Experience</h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Date of Joining</label>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.start_date ? "error-input" : ""
                        }`}
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.start_date?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>End Date</label>
                  <Controller
                    name="end_date"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.end_date ? "error-input" : ""
                        }`}
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.end_date?.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Company Name</label>
                  <Controller
                    name="company_name"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.company_name ? "error-input" : ""
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
                    {errors?.company_name?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Designation</label>
                  <Controller
                    name="job_title"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.job_title ? "error-input" : ""
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
                    {errors?.job_title?.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Date of Joining</label>
                  <Controller
                    name="start_date2"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.start_date2 ? "error-input" : ""
                        }`}
                        type="date"
                        value={formData.start_date2}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.start_date2?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>End Date</label>
                  <Controller
                    name="end_date2"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.end_date2 ? "error-input" : ""
                        }`}
                        type="date"
                        value={formData.end_date2}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.end_date2?.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Company Name</label>
                  <Controller
                    name="company_name2"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.company_name2 ? "error-input" : ""
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
                    {errors?.company_name2?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Designation</label>
                  <Controller
                    name="job_title2"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.job_title2 ? "error-input" : ""
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
                    {errors?.job_title2?.message}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          display: "flex",
          justifyContent: "space-between",
          bottom: "20px",
          width: "500px",
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

export default RegisterExperience;
