import React, { useState } from "react";
import { Avatar_02 } from "../../Routes/ImagePath";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { BASE_URL } from "../../constants/urls";

const PersonalInformationModelPopup = () => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const userDataString = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(userDataString));

  const [educationList, setEducationList] = useState([
    {
      institution: "",
      subject: "",
      startDate: null,
      completeDate: null,
      degree: "",
      grade: "",
    },
  ]);
  const addMoreEducation = () => {
    setEducationList([
      ...educationList,
      {
        institution: "",
        subject: "",
        startDate: null,
        completeDate: null,
        degree: "",
        grade: "",
      },
    ]);
  };

  const deleteEducation = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  const handleInputChange1 = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  const handleDateChangeEducation = (index, field, date) => {
    const updatedList = [...educationList];
    updatedList[index][field] = date;
    setEducationList(updatedList);
  };

  const [experienceList, setExperienceList] = useState([
    {
      companyName: "",
      location: "",
      jobPosition: "",
      periodFrom: null,
      periodTo: null,
    },
  ]);

  // Handle input changes for text fields (company name, job position, location)
  const handleInputChange = (index, field, value) => {
    const newExperienceList = [...experienceList];
    newExperienceList[index][field] = value; // Update the specific field in the experience list
    setExperienceList(newExperienceList);
  };
  const handleDateChange1 = (date, index) => {
    const newExperienceList = [...experienceList];
    newExperienceList[index].periodFrom = date; // Update the periodFrom date
    setExperienceList(newExperienceList);
  };

  // Handle date change for "Period To"
  const handleDateChange2 = (date, index) => {
    const newExperienceList = [...experienceList];
    newExperienceList[index].periodTo = date; // Update the periodTo date
    setExperienceList(newExperienceList);
  };
  // Handle date change for "Period From"

  // To delete an experience from the list

  const addMoreExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        companyName: "",
        location: "",
        jobPosition: "",
        periodFrom: null,
        periodTo: null,
      },
    ]);
  };

  const deleteExperience = (index) => {
    const updatedList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedList);
  };

  const handleDateChange3 = (date) => {
    setSelectedDate1(date);
  };

  const handleDateChange4 = (date) => {
    setSelectedDate2(date);
  };

  const domain = [
    { value: 1, label: "Select Department" },
    { value: 2, label: "Web Development+" },
    { value: 3, label: "IT Management" },
    { value: 4, label: "Marketing" },
  ];

  const developer = [
    { value: 1, label: "Select Department" },
    { value: 2, label: "Web Development+" },
    { value: 3, label: "IT Management" },
    { value: 4, label: "Marketing" },
  ];

  const reporter = [
    { value: 2, label: "Wilmer Deluna" },
    { value: 3, label: "Lesley Grauer" },
    { value: 4, label: "Jeffery Lalor" },
  ];

  const status = [
    { value: 1, label: "Single" },
    { value: 2, label: "Married" },
  ];

  const gender = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
  ];

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

  // const handleSubmitExperience = async (e) => {
  //   e.preventDefault();
  //   const formData = experienceList.map((experience) => ({
  //     company_name: experience.companyName,
  //     location: experience.location,
  //     start_date: experience.periodFrom,
  //     end_date: experience.periodTo,
  //     job_title: experience.jobPosition,
  //   }));

  //   try {
  //     const authToken = localStorage.getItem("BearerToken");
  //     const response = await fetch(`${BASE_URL}work/`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("Form submitted successfully");
  //     } else {
  //       console.error("Failed to submit form");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleSubmitExperience = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("BearerToken");
    console.log("experience list", experienceList);
    const formData = experienceList.map((experience) => ({
      company_name: experience.companyName,
      location: experience.location,
      start_date: experience.periodFrom
        ? experience.periodFrom.toISOString().split("T")[0]
        : null,
      end_date: experience.periodTo
        ? experience.periodTo.toISOString().split("T")[0]
        : null,
      job_title: experience.jobPosition,
      profile: userData?.user.profile.id,
    }));

    try {
      // Create an array of API request promises
      console.log("form data", formData);
      const apiRequests = formData.map((data) =>
        fetch(`${BASE_URL}work/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      );

      // Wait until all requests are completed
      const responses = await Promise.all(apiRequests);

      // Check if all requests were successful
      const allSuccessful = responses.every((response) => response.ok);

      if (allSuccessful) {
        console.log("All forms submitted successfully");
        // Navigate to another route (assuming you're using react-router-dom)
        // Replace '/your-next-page' with the actual route you want to navigate to
        // navigate("/your-next-page");
        console.log("addedd all");
      } else {
        console.error("Some forms failed to submit");
      }
    } catch (error) {
      console.error("Error submitting forms:", error);
    }
  };

  const handleSubmitEducation = async () => {
    const data = {
      institute_name: educationList[0].institution,
      degree: educationList[0].degree,
      duration: "4 years",
      profile: userData?.user.profile.id,
    };
    const authToken = localStorage.getItem("BearerToken");
    try {
      const response = await fetch(`${BASE_URL}education/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Profile Info Modal */}
      <div id="profile_info" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile Information</h5>
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
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-img-wrap edit-img">
                      <img
                        className="inline-block"
                        src={userData?.user?.profile?.profile_photo}
                        alt="user"
                      />
                      <div className="fileupload btn">
                        <span className="btn-text">edit</span>
                        <input className="upload" type="file" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={userData?.user.first_name}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={userData?.user.last_name}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Birth Date</label>
                          <div>
                            <DatePicker
                              selected={selectedDate1}
                              onChange={handleDateChange1}
                              className="form-control floating datetimepicker"
                              type="date"
                              placeholderText={
                                userData?.user?.profile?.date_of_birth
                              }
                              dateFormat="dd-MM-yyyy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">Gender</label>
                          <Select
                            options={gender}
                            placeholder={userData?.user?.profile?.gender}
                            styles={customStyles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={userData?.user?.profile?.address}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Not Available"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Not Available"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Not Available"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={userData?.user?.profile?.mobile_number}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Department <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={domain}
                        placeholder="Select Department"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={developer}
                        placeholder="Select Department"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Reports To <span className="text-danger">*</span>
                      </label>

                      <Select
                        options={reporter}
                        placeholder="Not Available"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Modal */}
      <div
        id="emergency_contact_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
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
            <div className="modal-body">
              <form>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block mb-3 mb-3">
                          <label className="col-form-label">Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info Modal */}
      <div
        id="personal_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
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
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">Passport No</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Passport Expiry Date
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={selectedDate1}
                          onChange={handleDateChange3}
                          className="form-control floating datetimepicker"
                          type="date"
                          placeholderText="04/10/2023"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">Tel</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Nationality <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">Religion</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={selectedDate1}
                          onChange={handleDateChange3}
                          className="form-control floating datetimepicker"
                          type="date"
                          placeholderText="04/10/2023"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Marital status <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={status}
                        placeholder="-"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">
                        Employment of spouse
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3 mb-3">
                      <label className="col-form-label">No. of children </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      <div
        id="education_info"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Education Informations</h5>
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
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div>
                    {educationList.map((education, index) => (
                      <div className="card" key={index}>
                        <div className="card-body">
                          <h3 className="card-title">
                            Education Information #{index + 1}
                            <Link
                              to="#"
                              className="delete-icon"
                              onClick={() => deleteEducation(index)}
                            >
                              <i className="fa-regular fa-trash-can" />
                            </Link>
                          </h3>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-block mb-3 form-focus focused">
                                <input
                                  type="text"
                                  value={education.institution}
                                  onChange={(e) =>
                                    handleInputChange1(
                                      index,
                                      "institution",
                                      e.target.value
                                    )
                                  }
                                  className="form-control floating"
                                />
                                <label className="focus-label">
                                  Institution
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block mb-3 form-focus focused">
                                <input
                                  type="text"
                                  value={education.subject}
                                  onChange={(e) =>
                                    handleInputChange1(
                                      index,
                                      "subject",
                                      e.target.value
                                    )
                                  }
                                  className="form-control floating"
                                />
                                <label className="focus-label">Subject</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block mb-3 form-focus focused">
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={education.startDate}
                                    onChange={(date) =>
                                      handleDateChangeEducation(
                                        index,
                                        "startDate",
                                        date
                                      )
                                    }
                                    className="form-control floating datetimepicker"
                                    dateFormat="dd-MM-yyyy"
                                  />
                                </div>
                                <label className="focus-label">
                                  Starting Date
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block mb-3 form-focus focused">
                                <div className="cal-icon">
                                  <DatePicker
                                    selected={education.completeDate}
                                    onChange={(date) =>
                                      handleDateChangeEducation(
                                        index,
                                        "completeDate",
                                        date
                                      )
                                    }
                                    className="form-control floating datetimepicker"
                                    dateFormat="dd-MM-yyyy"
                                  />
                                </div>
                                <label className="focus-label">
                                  Complete Date
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block mb-3 form-focus focused">
                                <input
                                  type="text"
                                  value={education.degree}
                                  onChange={(e) =>
                                    handleInputChange1(
                                      index,
                                      "degree",
                                      e.target.value
                                    )
                                  }
                                  className="form-control floating"
                                />
                                <label className="focus-label">Degree</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-block mb-3 form-focus focused">
                                <input
                                  type="text"
                                  value={education.grade}
                                  onChange={(e) =>
                                    handleInputChange1(
                                      index,
                                      "grade",
                                      e.target.value
                                    )
                                  }
                                  className="form-control floating"
                                />
                                <label className="focus-label">Grade</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="add-more">
                      <Link to="#" onClick={addMoreEducation}>
                        <i className="fa-solid fa-plus-circle" /> Add More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                    onClick={handleSubmitEducation}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      <div
        id="experience_info"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Experience Informations</h5>
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
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  {/* {experienceList.map((experience, index) => (
                    <div className="card" key={index}>
                      <div className="card-body">
                        <h3 className="card-title">
                          Experience Informations #{index + 1}
                          <Link
                            to="#"
                            className="delete-icon"
                            onClick={() => deleteExperience(index)}
                          >
                            <i className="fa-regular fa-trash-can" />
                          </Link>
                        </h3>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block mb-3 mb-3 form-focus focused">
                              <input
                                type="text"
                                className="form-control floating"
                                //defaultValue="Digital Devlopment Inc"
                              />
                              <label className="focus-label">
                                Company Name
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3 mb-3 form-focus focused">
                              <input
                                type="text"
                                className="form-control floating"
                                //defaultValue="United States"
                              />
                              <label className="focus-label">
                                Job Position
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3 mb-3 form-focus focused">
                              <div className="cal-icon">
                                <DatePicker
                                  selected={selectedDate1}
                                  onChange={handleDateChange3}
                                  className="form-control floating datetimepicker"
                                  type="date"
                                  //placeholderText="04/10/2023"
                                  dateFormat="dd-MM-yyyy"
                                />
                              </div>
                              <label className="focus-label">Period From</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3 mb-3 form-focus focused">
                              <div className="cal-icon">
                                <DatePicker
                                  selected={selectedDate2}
                                  onChange={handleDateChange4}
                                  className="form-control floating datetimepicker"
                                  type="date"
                                  //placeholderText="04/10/2023"
                                  dateFormat="dd-MM-yyyy"
                                />
                              </div>
                              <label className="focus-label">Period To</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3 mb-3 form-focus focused">
                              <input
                                type="text"
                                className="form-control floating"
                                //defaultValue="United States"
                              />
                              <label className="focus-label">Location</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */}

                  {experienceList.map((experience, index) => (
                    <div className="card" key={index}>
                      <div className="card-body">
                        <h3 className="card-title">
                          Experience Information #{index + 1}
                          <Link
                            to="#"
                            className="delete-icon"
                            onClick={() => deleteExperience(index)}
                          >
                            <i className="fa-regular fa-trash-can" />
                          </Link>
                        </h3>
                        <div className="row">
                          {/* Company Name */}
                          <div className="col-md-6">
                            <div className="input-block mb-3 form-focus focused">
                              <input
                                type="text"
                                className="form-control floating"
                                value={experience.companyName}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "companyName",
                                    e.target.value
                                  )
                                }
                              />
                              <label className="focus-label">
                                Company Name
                              </label>
                            </div>
                          </div>

                          {/* Job Position */}
                          <div className="col-md-6">
                            <div className="input-block mb-3 form-focus focused">
                              <input
                                type="text"
                                className="form-control floating"
                                value={experience.jobPosition}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "jobPosition",
                                    e.target.value
                                  )
                                }
                              />
                              <label className="focus-label">
                                Job Position
                              </label>
                            </div>
                          </div>

                          {/* Period From */}
                          <div className="col-md-6">
                            <div className="input-block mb-3 form-focus focused">
                              <div className="cal-icon">
                                <DatePicker
                                  selected={experience.periodFrom}
                                  onChange={(date) =>
                                    handleDateChange1(date, index)
                                  }
                                  className="form-control floating datetimepicker"
                                  dateFormat="dd-MM-yyyy"
                                />
                              </div>
                              <label className="focus-label">Period From</label>
                            </div>
                          </div>

                          {/* Period To */}
                          <div className="col-md-6">
                            <div className="input-block mb-3 form-focus focused">
                              <div className="cal-icon">
                                <DatePicker
                                  selected={experience.periodTo}
                                  onChange={(date) =>
                                    handleDateChange2(date, index)
                                  }
                                  className="form-control floating datetimepicker"
                                  dateFormat="dd-MM-yyyy"
                                />
                              </div>
                              <label className="focus-label">Period To</label>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="col-md-6">
                            <div className="input-block mb-3 form-focus focused">
                              <input
                                type="text"
                                className="form-control floating"
                                value={experience.location}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "location",
                                    e.target.value
                                  )
                                }
                              />
                              <label className="focus-label">Location</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="add-more">
                    <Link to="#" onClick={addMoreExperience}>
                      <i className="fa-solid fa-plus-circle" /> Add More
                    </Link>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                    onClick={handleSubmitExperience}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Family Info Modal */}
      <div
        id="family_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Family Informations</h5>
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
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Family Member{" "}
                        <Link to="#" className="delete-icon">
                          <i className="fa-regular fa-trash-can" />
                        </Link>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Name <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Relationship{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Date of birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Informations{" "}
                        <Link to="#" className="delete-icon">
                          <i className="fa-regular fa-trash-can" />
                        </Link>
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Name <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Relationship{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Date of birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3 mb-3">
                            <label className="col-form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <Link to="#">
                          <i className="fa-solid fa-plus-circle" /> Add More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformationModelPopup;
