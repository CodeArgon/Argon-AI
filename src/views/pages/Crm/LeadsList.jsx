import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ExportLeads from "../../../components/modelpopup/Crm/ExportLeads";
import AddLeads from "../../../components/modelpopup/Crm/AddLeads";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import CrmDeleteModal from "../../../components/modelpopup/Crm/CrmDeleteModal";
import EditLeads from "../../../components/modelpopup/Crm/EditLeads";
import SearchBox from "../../../components/SearchBox";
import { BASE_URL } from "../../../constants/urls";

const LeadsList = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASE_URL}leads/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error("Failed to fetch leads:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleEditClick = (record) => {
    setSelectedLead(record); // Set the selected lead data or ID
  };

  const columns = [
    {
      title: "Lead Id",
      dataIndex: "id",
      render: (text, record) => (
        <Link
          to="/leads-details"
          className="company-img"
          state={{ leadData: record }}
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.LeadName.length - b.LeadName.length,
    },
    {
      title: "Lead Name",
      dataIndex: "name",
      render: (text) => (
        <Link to="/leads-details" className="company-img">
          {text}
        </Link>
      ),
      sorter: (a, b) => a.LeadName.length - b.LeadName.length,
    },
    {
      title: "Source",
      dataIndex: "source",
      render: (text, record) => (
        <span className="table-avatar d-flex align-items-center">
          {text}
          <span>{record.role}</span>
        </span>
      ),
      sorter: (a, b) => a.source.length - b.source.length,
    },
    {
      title: "Medium",
      dataIndex: "medium",
      sorter: (a, b) => a.medium.length - b.medium.length,
    },

    {
      title: "Assigned To (DL)",
      dataIndex: "assigned_to",
      sorter: (a, b) => a.division_lead.length - b.division_lead.length,
    },

    {
      title: "Lead Status",
      dataIndex: "LeadStatus",
      render: (text) => (
        <div>
          {text === "Closed" && (
            <span className="badge badge-soft-success">{text}</span>
          )}
          {text === "Not Contacted" && (
            <span className="badge badge-soft-info">{text}</span>
          )}
          {text === "Contacted" && (
            <span className="badge badge-soft-warning">{text}</span>
          )}
          {text === "Lost" && (
            <span className="badge badge-soft-danger">{text}</span>
          )}
        </div>
      ),
      sorter: (a, b) => a.LeadStatus.length - b.LeadStatus.length,
    },

    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a, b) => a.created_date.length - b.created_date.length,
    },
    {
      title: "Lead Owner",
      dataIndex: "lead_gen_manager",
      sorter: (a, b) => a.lead_gen_manager.length - b.LeadOwner.length,
    },

    {
      title: "Action",
      render: (record) => (
        <div className="dropdown dropdown-action text-end">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_leads"
              onClick={() => handleEditClick(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>

            <Link
              className="dropdown-item"
              to="/leads-details"
              state={{ leadData: record }}
            >
              <i className="fa-regular fa-eye"></i> Preview
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.length - b.length,
    },
  ];
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
  const status = [
    { value: "--Select--", label: "--Select--" },
    { value: "Closed", label: "Closed" },
    { value: "Not Contacted", label: "Not Contacted" },
    { value: "Contacted", label: "Contacted" },
    { value: "Lost", label: "Lost" },
  ];
  const SourceName = [
    { value: "--Select--", label: "--Select--" },
    { value: "NovaWaveLLC", label: "NovaWaveLLC" },
    { value: "SilverHawk", label: "SilverHawk" },
    { value: "SummitPeak", label: "SummitPeak" },
    { value: "HarborView", label: "HarborView" },
    { value: "Redwood Inc", label: "Redwood Inc" },
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
  //filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [isFullScreen, setFullScreen] = useState(false);
  const maximizeBtnRef = useRef(null);

  // useEffect(() => {
  //   const handleClick = () => {
  //     if (!document.fullscreenElement) {
  //       document.documentElement.requestFullscreen();
  //       setFullScreen(true);
  //     } else {
  //       if (document.exitFullscreen) {
  //         document.exitFullscreen();
  //         setFullScreen(false);
  //       }
  //     }
  //   };

  //   const cleanup = () => {
  //     if (isFullScreen && document.exitFullscreen) {
  //       document.exitFullscreen();
  //       setFullScreen(false);
  //     }
  //   };

  //   const maximizeBtn = maximizeBtnRef.current;
  //   maximizeBtn.addEventListener("click", handleClick);
  //   return () => {
  //     maximizeBtn.removeEventListener("click", handleClick);
  //     cleanup();
  //   };
  // }, [isFullScreen]);

  if (loading) return <div>Loading...</div>;

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
                <h3 className="page-title">Leads</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin-dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Leads</li>
                </ul>
              </div>
              <div className="col-md-8 float-end ms-auto">
                <div className="d-flex title-head">
                  <div className="view-icons">
                    <Link to="#" className="grid-view btn btn-link">
                      <i className="las la-redo-alt" />
                    </Link>

                    <Link
                      to="#"
                      className={`list-view btn btn-link ${
                        isFilterVisible ? "active-filter" : ""
                      }`}
                      id="filter_search"
                      onClick={toggleFilterVisibility}
                    >
                      <i className="las la-filter" />
                    </Link>
                  </div>
                  <div className="form-sort">
                    <Link
                      to="#"
                      className="list-view btn btn-link"
                      data-bs-toggle="modal"
                      data-bs-target="#export"
                    >
                      <i className="las la-file-export" />
                      Export
                    </Link>
                  </div>
                  <Link
                    to="#"
                    className="btn btn-sm btn-primary add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_leads"
                  >
                    <i className="la la-plus-circle" /> Add Leads
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
                  <label className="focus-label" onClick={handleLabelClick}>
                    LeadName
                  </label>
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
                    Medium
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
                    options={status}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Lead Status</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus select-focus">
                  <Select
                    //options={}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Source</label>
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
              <li>
                <div className="view-icons">
                  <Link
                    to="/leads-list"
                    className="list-view btn btn-link active"
                  >
                    <i className="las la-list" />
                  </Link>
                  <Link to="/leads-kanban" className="grid-view btn btn-link">
                    <i className="las la-th" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  className="table table-striped custom-table datatable contact-table"
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        <ExportLeads />
        <AddLeads />
        <EditLeads />
        <CrmDeleteModal />
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default LeadsList;
import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ExportLeads from "../../../components/modelpopup/Crm/ExportLeads";
import AddLeads from "../../../components/modelpopup/Crm/AddLeads";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import CrmDeleteModal from "../../../components/modelpopup/Crm/CrmDeleteModal";
import EditLeads from "../../../components/modelpopup/Crm/EditLeads";
import SearchBox from "../../../components/SearchBox";
import { BASE_URL } from "../../../constants/urls";

const BdLeadsList = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASE_URL}leads/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log("Result", data);
        } else {
          console.error("Failed to fetch leads:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleEditClick = (record) => {
    setSelectedLead(record); // Set the selected lead data or ID
  };

  const columns = [
    {
      title: "Lead Id",
      dataIndex: "id",
      render: (text, record) => (
        <Link
          to="/leads-details"
          className="company-img"
          state={{ leadData: record }}
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.LeadName.length - b.LeadName.length,
    },
    {
      title: "Lead Name",
      dataIndex: "name",
      render: (text) => (
        <Link to="/leads-details" className="company-img">
          {text}
        </Link>
      ),
      sorter: (a, b) => a.LeadName.length - b.LeadName.length,
    },
    {
      title: "Source",
      dataIndex: "source",
      render: (text, record) => (
        <span className="table-avatar d-flex align-items-center">
          {text}
          <span>{record.role}</span>
        </span>
      ),
      sorter: (a, b) => a.source.length - b.source.length,
    },
    {
      title: "Medium",
      dataIndex: "medium",
      sorter: (a, b) => a.medium.length - b.medium.length,
    },

    {
      title: "Assigned To (DL)",
      dataIndex: "assigned_to",
      sorter: (a, b) => a.division_lead.length - b.division_lead.length,
    },

    {
      title: "Lead Status",
      dataIndex: "LeadStatus",
      render: (text) => (
        <div>
          {text === "Closed" && (
            <span className="badge badge-soft-success">{text}</span>
          )}
          {text === "Not Contacted" && (
            <span className="badge badge-soft-info">{text}</span>
          )}
          {text === "Contacted" && (
            <span className="badge badge-soft-warning">{text}</span>
          )}
          {text === "Lost" && (
            <span className="badge badge-soft-danger">{text}</span>
          )}
        </div>
      ),
      sorter: (a, b) => a.LeadStatus.length - b.LeadStatus.length,
    },

    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a, b) => a.created_date.length - b.created_date.length,
    },
    {
      title: "Lead Owner",
      dataIndex: "lead_gen_manager",
      sorter: (a, b) => a.lead_gen_manager.length - b.LeadOwner.length,
    },

    {
      title: "Action",
      render: (record) => (
        <div className="dropdown dropdown-action text-end">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_leads"
              onClick={() => handleEditClick(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>

            <Link
              className="dropdown-item"
              to="/leads-details"
              state={{ leadData: record }}
            >
              <i className="fa-regular fa-eye"></i> Preview
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.length - b.length,
    },
  ];
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
  const status = [
    { value: "--Select--", label: "--Select--" },
    { value: "Closed", label: "Closed" },
    { value: "Not Contacted", label: "Not Contacted" },
    { value: "Contacted", label: "Contacted" },
    { value: "Lost", label: "Lost" },
  ];
  const SourceName = [
    { value: "--Select--", label: "--Select--" },
    { value: "NovaWaveLLC", label: "NovaWaveLLC" },
    { value: "SilverHawk", label: "SilverHawk" },
    { value: "SummitPeak", label: "SummitPeak" },
    { value: "HarborView", label: "HarborView" },
    { value: "Redwood Inc", label: "Redwood Inc" },
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
  //filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [isFullScreen, setFullScreen] = useState(false);
  const maximizeBtnRef = useRef(null);

  // useEffect(() => {
  //   const handleClick = () => {
  //     if (!document.fullscreenElement) {
  //       document.documentElement.requestFullscreen();
  //       setFullScreen(true);
  //     } else {
  //       if (document.exitFullscreen) {
  //         document.exitFullscreen();
  //         setFullScreen(false);
  //       }
  //     }
  //   };

  //   const cleanup = () => {
  //     if (isFullScreen && document.exitFullscreen) {
  //       document.exitFullscreen();
  //       setFullScreen(false);
  //     }
  //   };

  //   const maximizeBtn = maximizeBtnRef.current;
  //   maximizeBtn.addEventListener("click", handleClick);
  //   return () => {
  //     maximizeBtn.removeEventListener("click", handleClick);
  //     cleanup();
  //   };
  // }, [isFullScreen]);

  if (loading) return <div>Loading...</div>;

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
                <h3 className="page-title">Leads</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin-dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Leads</li>
                </ul>
              </div>
              <div className="col-md-8 float-end ms-auto">
                <div className="d-flex title-head">
                  <div className="view-icons">
                    <Link to="#" className="grid-view btn btn-link">
                      <i className="las la-redo-alt" />
                    </Link>

                    <Link
                      to="#"
                      className={`list-view btn btn-link ${
                        isFilterVisible ? "active-filter" : ""
                      }`}
                      id="filter_search"
                      onClick={toggleFilterVisibility}
                    >
                      <i className="las la-filter" />
                    </Link>
                  </div>
                  <div className="form-sort">
                    <Link
                      to="#"
                      className="list-view btn btn-link"
                      data-bs-toggle="modal"
                      data-bs-target="#export"
                    >
                      <i className="las la-file-export" />
                      Export
                    </Link>
                  </div>
                  <Link
                    to="#"
                    className="btn btn-sm btn-primary add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_leads"
                  >
                    <i className="la la-plus-circle" /> Add Leads
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
                  <label className="focus-label" onClick={handleLabelClick}>
                    LeadName
                  </label>
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
                    Medium
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
                    options={status}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Lead Status</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus select-focus">
                  <Select
                    //options={}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Source</label>
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
            
          </div>
          <br />
          <div className="row align-items-center" style={{alignContent:'center',alignItems:'center'}}>
              <div className="col-md-2" >
                <div className="card"   >
                  <div
                    className="card-body"
                  >
                    <h5>Total Leads</h5>
                    <h6 className="counter">3,000</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-2" >
                <div className="card"   >
                  <div
                    className="card-body"
                  >
                    <h5>In process</h5>
                    <h6 className="counter">1,500</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card" >
                  <div
                    className="card-body"
                   
                  >
                    <h5>Total Won</h5>
                    <h6 className="counter">1050</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-2" >
                <div className="card">
                  <div
                    className="card-body"
                  >
                    <h5>Total Lost</h5>
                    <h6 className="counter">450</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-2" style={{flex:2}} >
              <ul>
              <li>
                <div className="view-icons">
                  <Link
                    to="/leads-list"
                    className="list-view btn btn-link active"
                  >
                    <i className="las la-list" />
                  </Link>
                  <Link to="/leads-kanban" className="grid-view btn btn-link">
                    <i className="las la-th" />
                  </Link>
                </div>
              </li>
            </ul>
              </div>
            </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  className="table table-striped custom-table datatable contact-table"
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        <ExportLeads />
        <AddLeads />
        <EditLeads />
        <CrmDeleteModal />
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default BdLeadsList;
