import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { emailrgx } from "../../../views/pages/Authentication/RegEx";
// import Select from "react-select";
import UserContext from "../../../contexts/UserContext";
import { registerUserData } from "../../../helpers/users";

const AddUserModal = () => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  const { formData, setFormData } = useContext(UserContext);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      cnic: "",
      role: null,
      gender: null,
      address: "",
      mobile_number: "",
      date_of_birth: "",
      designation: "",
      nationality: "",
      religion: "",
      profile_picture: null,
    },
    validationSchema: yup.object({
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
      first_name: yup
        .string()
        .required("First Name is required")
        .matches(/^[A-Za-z\s]+$/, "First Name must contain only letters")
        .trim(),
      last_name: yup
        .string()
        .required("Last Name is required")
        .matches(/^[A-Za-z\s]+$/, "Last Name must contain only letters")
        .trim(),
      cnic: yup
        .string()
        .required("CNIC is required")
        .matches(/^\d+$/, "CNIC must contain only digits")
        .min(13, "CNIC must be at least 13 digits")
        .max(13, "CNIC must be at most 13 digits")
        .trim(),
      mobile_number: yup
        .string()
        .required("Mobile Number is required")
        .matches(/^\d+$/, "CNIC must contain only digits")
        .trim(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),

      date_of_birth: yup.string().required("Date of Birth is required").trim(),
      designation: yup.string().required("Designation is required").trim(),
      address: yup.string().required("Address is required").trim(),
      nationality: yup.string().required("Nationality is required").trim(),
      gender: yup.string().required("Gender is required").trim(),
      religion: yup.string().required("Religion is required").trim(),
    }),
    onSubmit: async (values) => {
      console.log("Submitted Data:", values);
      try {
        const result = await registerUserData(values);
        if (result) {
          setFormData(values);
          console.log("Data saved successfully");
        } else {
          console.log("Data submission failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add User</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                {/* First Name */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="first_name" className="col-form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <div className="text-danger">
                        {formik.errors.first_name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="last_name" className="col-form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                      <div className="text-danger">
                        {formik.errors.last_name}
                      </div>
                    )}
                  </div>
                </div>

                {/* CNIC */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="cnic" className="col-form-label">
                      CNIC <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="cnic"
                      name="cnic"
                      type="text"
                      placeholder="CNIC"
                      onChange={formik.handleChange}
                      value={formik.values.cnic}
                    />
                    {formik.touched.cnic && formik.errors.cnic && (
                      <div className="text-danger">{formik.errors.cnic}</div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="email" className="col-form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label>Password</label>
                    <div
                      className="pass-group"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={passwordEye ? "password" : "text"}
                        className={`form-control ${
                          formik.touched.password && formik.errors.password
                            ? "error-input"
                            : ""
                        }`}
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "5%",
                          top: "30%",
                          cursor: "pointer",
                        }}
                        onClick={() => setPasswordEye(!passwordEye)}
                        className={`fa toggle-password ${
                          passwordEye ? "fa-eye-slash" : "fa-eye"
                        }`}
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label>Confirm Password</label>
                    <div
                      className="pass-group"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={confirmPasswordEye ? "password" : "text"}
                        className={`form-control ${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "error-input"
                            : ""
                        }`}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "5%",
                          top: "30%",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setConfirmPasswordEye(!confirmPasswordEye)
                        }
                        className={`fa toggle-password ${
                          confirmPasswordEye ? "fa-eye-slash" : "fa-eye"
                        }`}
                      />
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-danger">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="mobile_number" className="col-form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="mobile_number"
                      name="mobile_number"
                      placeholder="Mobile Number"
                      className={`form-control ${
                        formik.touched.mobile_number &&
                        formik.errors.mobile_number
                          ? "error-input"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.mobile_number}
                    />
                    {formik.touched.mobile_number &&
                      formik.errors.mobile_number && (
                        <div className="text-danger">
                          {formik.errors.mobile_number}
                        </div>
                      )}
                  </div>
                </div>

                {/* Role */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="role" className="col-form-label">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      className={`form-control ${
                        formData?.role === "" ? "error-input" : ""
                      }`}
                      onChange={handleInputChange}
                      value={formData.role || ""}
                      styles={customStyles}
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Division Lead">Leads</option>
                      <option value="HR">HR</option>
                      <option value="BD">BD</option>
                      <option value="IT">IT</option>
                    </select>

                    {formik.touched.role && formik.errors.role && (
                      <div className="text-danger">
                        {formik.errors.role.label}
                        {formData.role === "" && (
                          <span className="text-danger">Role is required</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="gender" className="col-form-label">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className={`form-control ${
                        formData?.gender === "" ? "error-input" : ""
                      }`}
                      onChange={handleInputChange}
                      // value={formData.gender || ""}
                      value={formik.values.gender}
                      styles={customStyles}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    {formik.touched.gender && formik.errors.gender && (
                      <div className="text-danger">
                        {formik.errors.gender.label}
                        {formData.gender === "" && (
                          <span className="text-danger">
                            Gender is required
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="address" className="col-form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      className={`form-control ${
                        formik.touched.address && formik.errors.address
                          ? "error-input"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="text-danger">{formik.errors.address}</div>
                    )}
                  </div>
                </div>

                {/* DOB */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="date_of_birth" className="col-form-label">
                      DOB <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      className={`form-control ${
                        formik.touched.date_of_birth &&
                        formik.errors.date_of_birth
                          ? "error-input"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.date_of_birth}
                    />
                    {formik.touched.date_of_birth &&
                      formik.errors.date_of_birth && (
                        <div className="text-danger">
                          {formik.errors.date_of_birth}
                        </div>
                      )}
                  </div>
                </div>

                {/* Religion */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="religion" className="col-form-label">
                      Religion <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="religion"
                      name="religion"
                      placeholder="Religion"
                      className={`form-control ${
                        formik.touched.religion && formik.errors.religion
                          ? "error-input"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.religion}
                    />
                    {formik.touched.religion && formik.errors.religion && (
                      <div className="text-danger">
                        {formik.errors.religion}
                      </div>
                    )}
                  </div>
                </div>

                {/* Nationality */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="nationality" className="col-form-label">
                      Nationality <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      placeholder="Nationality"
                      className={`form-control ${
                        formik.touched.nationality && formik.errors.nationality
                          ? "error-input"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.nationality}
                    />
                    {formik.touched.nationality &&
                      formik.errors.nationality && (
                        <div className="text-danger">
                          {formik.errors.nationality}
                        </div>
                      )}
                  </div>
                </div>

                {/* Designation */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="designation" className="col-form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      placeholder="Designation"
                      className={`form-control ${
                        formik.touched.designation && formik.errors.designation
                          ? "error-input"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                      value={formik.values.designation}
                    />
                    {formik.touched.designation &&
                      formik.errors.designation && (
                        <div className="text-danger">
                          {formik.errors.designation}
                        </div>
                      )}
                  </div>
                </div>

                {/* Picture */}
                <div className="col-sm-6">
                  <div className="input-block mb-3">
                    <label htmlFor="profile_picture" className="col-form-label">
                      Picture <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      id="profile_picture"
                      name="profile_picture"
                      className="form-control"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "profile_picture",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                    {formik.touched.profile_picture && formik.errors.profile_picture && (
                      <div className="text-danger">{formik.errors.profile_picture}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="submit-section">
                <button
                  className="btn btn-primary submit-btn"
                  // data-bs-dismiss="modal"
                  // aria-label="Close"
                  // type="reset"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
