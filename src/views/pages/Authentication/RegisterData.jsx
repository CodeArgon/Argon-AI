import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext from "../../../contexts/UserContext";
import { Button } from "@mui/material";
const schema = yup.object({
  date_of_birth: yup.string().required("Date of Birth is required").trim(),
  date_of_joining: yup.string().required("Date of Joining is required").trim(),
  designation: yup.string().required("Designation is required").trim(),
  address: yup.string().required("Address is required").trim(),
  marital_status: yup.string().required("Marital Status is required").trim(),
  nationality: yup.string().required("Nationality is required").trim(),
  gender: yup.string().required("Gender is required").trim(),
  religion: yup.string().required("Religion is required").trim(),
  employment_of_spouse: yup
    .string()
    .required("Employment of Spouse is required")
    .trim(),
  number_of_children: yup.number().required("Number of Children is required"),
});

const RegisterData = (props) => {
  const { setActiveStep, formData, setFormData } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const onSubmit = async (data) => {
    console.log("Yooo", data);
    try {
      // const result = await registerUser(data);
      const result = true;
      if (result === true) {
        setFormData(data);
        setActiveStep(2);
      } else {
        console.log("Submitted Data Fail");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleBack = () => {
    setActiveStep(0);
  };
  return (
    <div className="container">
      <div className="account-box">
        <div className="account-wrapper">
          <h3 className="account-title">Register Data</h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Date of Joining</label>
                  <Controller
                    name="date_of_joining"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.date_of_joining ? "error-input" : ""
                        }`}
                        type="date"
                        value={formData.date_of_joining}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.date_of_joining?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Date of Birth</label>
                  <Controller
                    name="date_of_birth"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.date_of_birth ? "error-input" : ""
                        }`}
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.date_of_birth?.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Designation</label>
                  <Controller
                    name="designation"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.designation ? "error-input" : ""
                        }`}
                        type="text"
                        value={formData.designation}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.designation?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Nationality</label>
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.nationality ? "error-input" : ""
                        }`}
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.nationality?.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Religion</label>
                  <Controller
                    name="religion"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.religion ? "error-input" : ""
                        }`}
                        type="text"
                        value={formData.religion}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.religion?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Number of Children</label>
                  <Controller
                    name="number_of_children"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.number_of_children ? "error-input" : ""
                        }`}
                        type="number"
                        value={formData.number_of_children}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.number_of_children?.message}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Marital Status</label>
                  <Controller
                    name="marital_status"
                    control={control}
                    render={({ field }) => (
                      <select
                        className={`form-control ${
                          errors?.marital_status ? "error-input" : ""
                        }`}
                        value={formData.marital_status}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Maried">Married</option>
                      </select>
                    )}
                    // render={({ field }) => (
                    //   <input className={`form-control ${errors?.marital_status ? "error-input" : ""}`} type="text" {...field} />
                    // )}
                  />
                  <span className="text-danger">
                    {errors?.marital_status?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Gender</label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <select
                        className={`form-control ${
                          errors?.gender ? "error-input" : ""
                        }`}
                        value={formData.gender}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">other</option>
                      </select>
                    )}
                    // render={({ field }) => (
                    //   <input className={`form-control ${errors?.gender ? "error-input" : ""}`} type="text" {...field} />
                    // )}
                  />
                  <span className="text-danger">{errors?.gender?.message}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Employment of Spouse</label>
                  <Controller
                    name="employment_of_spouse"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.employment_of_spouse ? "error-input" : ""
                        }`}
                        type="text"
                        value={formData.employment_of_spouse}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.employment_of_spouse?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Address</label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.address ? "error-input" : ""
                        }`}
                        type="text"
                        value={formData.address}
                        onChange={(e) => {
                          field.onChange(e);
                          handleInputChange(e);
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="text-danger">
                    {errors?.address?.message}
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

export default RegisterData;
