import React, { useState } from "react";
// import { avatar1 } from "../../../Routes/ImagePath";
// import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../constants/urls";
const AddContact = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [title, setTitle] = useState();
  const [company, setCompany] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  const validateForm = () => {
    return firstName && lastName && title && company && email && number;
  };

  const handleSaveContact = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      Swal.fire("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("title", title);
    formData.append("company", company);
    formData.append("email", email);
    formData.append("phone_number", number);
    try {
      const authToken = localStorage.getItem("BearerToken");
      const response = await axios.post(`${BASE_URL}contact/`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Contact saved successfully:", response.data);
      Swal.fire("contact saved successfully").then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error saving Contact:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveContact(e);
  };
  return (
    <div
      className="modal custom-modal fade custom-modal-two modal-padding"
      id="add_contact"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header header-border justify-content-between p-0">
            <h5 className="modal-title">Add New Contact</h5>
            <button
              style={{ backgroundColor: "#667eea", borderColor: "white" }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span style={{ color: "white" }}>x</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <form onSubmit={handleSubmit}>
              <div className="contact-input-set">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Title <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Company <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Eamil <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 text-end form-wizard-button">
                    <button className="btn btn-primary" type="submit">
                      Save Contact
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
