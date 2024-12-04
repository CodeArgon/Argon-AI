import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserContext from "../../../contexts/UserContext";
import { Button } from "@mui/material";
const schema = yup.object({
  bank_name: yup.string().required("Bank Name is required"),
  account_holder_name: yup.string()
  .required("account Holder Name is required")
  .matches(/^[A-Za-z\s]+$/, "account Holder Name must contain only letters"),
  account_number: yup.string()
  .required("Account Number is required")
  .matches(/^\d+$/, "Account Number must contain only digits")
  .trim(),
  iban_number: yup.string().required("IBAN is required").trim(),
  salary: yup.string().required("Duration is required").trim(),
});

const RegisterBankDetails = (props) => {
  const { setActiveStep, formData, setFormData } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const onSubmit = async (data) => {
    console.log("Submitted Data", data);
    console.log("formData", formData);
    try {
        setFormData(data);
        setActiveStep(3);
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
    setActiveStep(1);
  };
  return (
    <div className="container">
      <div className="account-box">
        <div className="account-wrapper">
          <h3 className="account-title">Bank Details</h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Bank Name</label>
                  <Controller
                    name="bank_name"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.bank_name ? "error-input" : ""
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
                    {errors?.bank_name?.message}
                  </span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Account Holder</label>
                  <Controller
                    name="account_holder_name"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.account_holder_name ? "error-input" : ""
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
                    {errors?.account_holder_name?.message}
                  </span>
                </div>
              </div>
              <div className="input-block mb-3">
                <label>IBAN</label>
                <Controller
                  name="iban_number"
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`form-control ${
                        errors?.iban_number ? "error-input" : ""
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
                  {errors?.iban_number?.message}
                </span>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Salary</label>
                  <Controller
                    name="salary"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.salary ? "error-input" : ""
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
                  <span className="text-danger">{errors?.salary?.message}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Account Number</label>
                  <Controller
                    name="account_number"
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.account_number ? "error-input" : ""
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
                    {errors?.account_number?.message}
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

export default RegisterBankDetails;
