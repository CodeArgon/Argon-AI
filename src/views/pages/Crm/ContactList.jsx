import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants/urls";
import { avatar19 } from "../../../Routes/ImagePath";
import Select from "react-select";
import {
  // Facebook,
  // Mail,
  // MessageSquare,
  // Phone,
  // PhoneCall,
  Star,
} from "react-feather";
import DateRangePicker from "react-bootstrap-daterangepicker";
import ExportLeads from "../../../components/modelpopup/Crm/ExportLeads";
import DeleteContact from "../../../components/modelpopup/Crm/DeleteContact";
import AddContact from "../../../components/modelpopup/Crm/AddContact";
import EditContact from "../../../components/modelpopup/Crm/EditContact";
import AddNotes from "../../../components/modelpopup/Crm/AddNotes";
import dayjs from "dayjs";
import ImportContactModal from "../../../components/modelpopup/ImportContactModal";
const ContactList = () => {
  const [contactData, setContactData] = useState([]);

 

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const authToken = localStorage.getItem("BearerToken");
      try {
        const response = await fetch(`${BASE_URL}contact/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        const formattedData = data.map((user) => ({
          // id: user.id,
          title: user.title,
          company: user.company,
          phone_Number: user.phone_number,
          name: `${user.first_name} ${user.last_name}`.trim(),
          email: user.email,
          image: avatar19,
          created_date: dayjs(user.date_joined).format("DD MMM YYYY"),
          }));
        setContactData(formattedData);
        console.log("Contacts API: ", formattedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTeamMembers();
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleLabelClick = () => {
    setFocused(true);
  };
  const handleInputBlur = () => {
    if (inputValue === "") {
      setFocused(false);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value !== "" && !focused) {
      setFocused(true);
    }
  };
  //
  const [inputValue1, setInputValue1] = useState("");

  const [focused1, setFocused1] = useState(false);

  const handleLabelClick1 = () => {
    setFocused1(true);
  };
  const handleInputBlur1 = () => {
    if (inputValue1 === "") {
      setFocused1(false);
    }
  };
  const handleInputChange1 = (e) => {
    const value = e.target.value;
    setInputValue1(value);
    if (value !== "" && !focused1) {
      setFocused1(true);
    }
  };
  //
  const [inputValue2, setInputValue2] = useState("");

  const [focused2, setFocused2] = useState(false);

  const handleLabelClick2 = () => {
    setFocused1(true);
  };
  const handleInputBlur2 = () => {
    if (inputValue2 === "") {
      setFocused2(false);
    }
  };
  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setInputValue2(value);
    if (value !== "" && !focused2) {
      setFocused2(true);
    }
  };
  const initialSettings = {
    endDate: new Date("2020-08-11T12:30:00.000Z"),
    ranges: {
      "Last 30 Days": [
        new Date("2020-07-12T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last 7 Days": [
        new Date("2020-08-04T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      "Last Month": [
        new Date("2020-06-30T18:30:00.000Z"),
        new Date("2020-07-31T18:29:59.999Z"),
      ],
      "This Month": [
        new Date("2020-07-31T18:30:00.000Z"),
        new Date("2020-08-31T18:29:59.999Z"),
      ],
      Today: [
        new Date("2020-08-10T04:57:17.076Z"),
        new Date("2020-08-10T04:57:17.076Z"),
      ],
      Yesterday: [
        new Date("2020-08-09T04:57:17.076Z"),
        new Date("2020-08-09T04:57:17.076Z"),
      ],
    },
    startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
    timePicker: false,
  };
  const sortoption = [
    { value: "Sort By Alphabet", label: "Sort By Alphabet" },
    { value: "Ascending", label: "Ascending" },
    { value: "Descending", label: "Descending" },
    { value: "Recently Viewed", label: "Recently Viewed" },
    { value: "Recently Added", label: "Recently Added" },
  ];
  const countrylist = [
    { value: "--Select--", label: "--Select--" },
    { value: "Germany", label: "Germany" },
    { value: "USA", label: "USA" },
    { value: "India", label: "India" },
    { value: "China", label: "China" },
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
  //filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h2 className="table-avatar d-flex">
          <div to="/contact-details" className="avatar">
          {record.image ? (
              <img alt="img" src={record.image} />
            ) : (
              <img alt="fallback-img" src="/images/default-avatar.jpg" />
            )}
          </div>
          <Link
            to="/contact-details"
            className="profile-split d-flex flex-column"
          >
            {text} <span>{record.Position}</span>
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Phone",
      dataIndex: "phone_Number",
      sorter: (a, b) => a.phone_Number.length - b.phone_Number.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Company",
      dataIndex: "company",
      sorter: (a, b) => a.company.length - b.company.length,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
  ];
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  const handleButtonClick = () => {
    window.location.reload();
  };
  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-4">
                <h3 className="page-title">Contact</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin-dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Contact</li>
                </ul>
              </div>
              <div className="col-md-8 float-end ms-auto">
                <div className="d-flex title-head">
                  <div className="view-icons">
                    <Link onClick={handleButtonClick} className="grid-view btn btn-link">
                      <i className="las la-redo-alt" />
                    </Link>
                    {/* <Link
                      to="#"
                      className={`list-view btn btn-link ${
                        isFilterVisible ? "active-filter" : ""
                      }`}
                      id="filter_search"
                      onClick={toggleFilterVisibility}
                    >
                      <i className="las la-filter" />
                    </Link> */}
                  </div>
                  <div className="form-sort">
                    <Link
                      to="#"
                      className="list-view btn btn-link"
                      data-bs-toggle="modal"
                      data-bs-target="#import_contact"
                    >
                      <i className="las la-file-export" />
                      Import xls
                    </Link>
                  </div>
                  <Link
                    to="#"
                    className="btn btn-sm btn-primary add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_contact"
                  >
                    <i className="la la-plus-circle" /> Add Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div
            className={`filter-filelds${isFilterVisible ? " visible" : ""}`}
            id="filter_inputs"
            style={{ display: isFilterVisible ? "block" : "none" }}
          >
            <div className="row filter-row">
              <div className="col-xl-2">
                <div
                  className={
                    focused || inputValue !== ""
                      ? "input-block mb-3 form-focus focused"
                      : "input-block mb-3 form-focus"
                  }
                >
                  <input
                    type="text"
                    className="form-control floating"
                    value={inputValue}
                    onFocus={handleLabelClick}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                  />
                  <label className="focus-label">Contact Name</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div
                  className={
                    focused2 || inputValue2 !== ""
                      ? "input-block mb-3 form-focus focused"
                      : "input-block mb-3 form-focus"
                  }
                >
                  <input
                    type="text"
                    className="form-control floating"
                    value={inputValue2}
                    onFocus={handleLabelClick2}
                    onBlur={handleInputBlur2}
                    onChange={handleInputChange2}
                  />
                  <label className="focus-label">Email</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div
                  className={
                    focused1 || inputValue1 !== ""
                      ? "input-block mb-3 form-focus focused"
                      : "input-block mb-3 form-focus"
                  }
                >
                  <input
                    type="text"
                    className="form-control floating"
                    value={inputValue1}
                    onFocus={handleLabelClick1}
                    onBlur={handleInputBlur1}
                    onChange={handleInputChange1}
                  />
                  <label className="focus-label" onClick={handleLabelClick1}>
                    Phone Number
                  </label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus focused">
                  <DateRangePicker initialSettings={initialSettings}>
                    <input
                      className="form-control  date-range bookingrange"
                      type="text"
                    />
                  </DateRangePicker>
                  <label className="focus-label">From - To Date</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus select-focus">
                  <Select
                    options={countrylist}
                    placeholder="--Select--"
                    styles={customStyles}
                  />
                  <label className="focus-label">Location</label>
                </div>
              </div>
              <div className="col-xl-2">
                <Link to="#" className="btn btn-success w-100">
                  {" "}
                  Search{" "}
                </Link>
              </div>
            </div>
          </div>
          <hr />
          {/* /Search Filter */}
          <div className="filter-section">
            <ul>
              {/* <li>
                <div className="view-icons">
                  <Link
                    to="/contact-list"
                    className="list-view btn btn-link active"
                  >
                    <i className="las la-list" />
                  </Link>
                  <Link to="/contact-grid" className="grid-view btn btn-link">
                    <i className="las la-th" />
                  </Link>
                </div>
              </li> */}
            </ul>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table table-striped custom-table datatable contact-table"
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={contactData}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <ExportLeads />
      <AddContact />
      <EditContact />
      <DeleteContact />
      <AddNotes />
      <ImportContactModal/>
    </div>
  );
};

export default ContactList;
