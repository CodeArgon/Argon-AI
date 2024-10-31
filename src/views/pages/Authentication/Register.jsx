/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Applogo } from "../../../Routes/ImagePath";
import { emailrgx } from "../Authentication/RegEx";
import { registerUser } from "../../../helpers/users";
import Swal from "sweetalert2";

const schema = yup.object({
  email: yup
    .string()
    .matches(emailrgx, "Email is required")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required")
    .trim(),
  role: yup.string().required("User role is required"),
});

const Register = (props) => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [checkUser, setCheckUser] = useState(false);
  const [repeatPasswordEye, setRepeatPasswordEye] = useState(true);
  const [username, setUserName] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const details = localStorage.getItem("loginDetails");

  const onSubmit = async (data) => {
    try {
      console.log("this is the dataaaaaaaaaaaaaaaaaaaaaaaaaa", data);

      const result = await registerUser(data);
      if (result === true) {
        console.log("hereeeeeeeeeee ");
        Swal.fire("User Registered Successfully!");
        navigate("/login");
      } else {
        Swal.fire("User Not Registered");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              <Link to="/admin-dashboard">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </Link>
            </div>
            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Register</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                {/* Account Form */}
                <div>
                  <form>
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Username<span style={{ color: "red" }}> *</span>
                      </label>
                      <Controller
                        name="username"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            className={`form-control ${
                              errors?.email ? "error-input" : ""
                            }`}
                            type="text"
                            value={value}
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="false"
                          />
                        )}
                      />

                      <label className="col-form-label">
                        Email<span style={{ color: "red" }}> *</span>
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <input
                            className={`form-control ${
                              errors?.email ? "error-input" : ""
                            }`}
                            type="text"
                            value={value}
                            onChange={onChange}
                            autoComplete="false"
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors?.email?.message}
                      </span>
                      <span className="text-danger">
                        {checkUser ? "This Email is Already exist" : ""}
                      </span>

                      <label className="col-form-label">
                        User Role<span style={{ color: "red" }}> *</span>
                      </label>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <select
                            className={`form-control ${
                              errors?.role ? "error-input" : ""
                            }`}
                            value={value || ""}
                            onChange={onChange}
                          >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                            <option value="BD">BD</option>
                            <option value="Leads">Leads</option>
                            <option value="HR">HR</option>
                          </select>
                        )}
                      />
                      <span className="text-danger">
                        {errors?.role?.message}
                      </span>
                    </div>

                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Password<span style={{ color: "red" }}> *</span>
                      </label>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type={passwordEye ? "password" : "text"}
                              className={`form-control  ${
                                errors?.password ? "error-input" : ""
                              }`}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "30%",
                              }}
                              onClick={() => setPasswordEye(!passwordEye)}
                              className={`fa toggle-password ${
                                passwordEye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                        defaultValue=""
                      />
                      <span className="text-danger">
                        {errors?.password?.message}
                      </span>
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Repeat Password<span style={{ color: "red" }}> *</span>
                      </label>
                      <Controller
                        name="repeatPassword"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type={repeatPasswordEye ? "password" : "text"}
                              className={`form-control  ${
                                errors?.repeatPassword ? "error-input" : ""
                              }`}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "30%",
                              }}
                              onClick={() =>
                                setRepeatPasswordEye(!repeatPasswordEye)
                              }
                              className={`fa toggle-password ${
                                repeatPasswordEye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                        defaultValue=""
                      />
                      <span className="text-danger">
                        {errors?.repeatPassword?.message}
                      </span>
                    </div>
                    <div className="input-block text-center">
                      <Link
                        to="#"
                        className="btn btn-primary account-btn"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                  <div className="account-footer">
                    <p>
                      Already have an account? <Link to="/">Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;