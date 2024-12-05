import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExportLeads from "../../../components/modelpopup/Crm/ExportLeads";
import AddLeads from "../../../components/modelpopup/Crm/AddLeads";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import CrmDeleteModal from "../../../components/modelpopup/Crm/CrmDeleteModal";
import EditLeads from "../../../components/modelpopup/Crm/EditLeads";
import { BASE_URL } from "../../../constants/urls";
import CountUp from "react-countup";

const LeadsList = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null }); // Date filter
  const [status, setStatus] = useState(null); // Status filter
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
          setFilteredData(data);
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

  useEffect(() => {
    const filtered = data.filter((lead) =>
      lead.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  const handleEditClick = (record) => {
    setSelectedLead(record);
  };

  const openLeads = data.filter((lead) => lead.status === "open");
  const opportunityLeads = data.filter((lead) => lead.status === "opportunity");
  const winLeads = data.filter((lead) => lead.status === "win");
  const lostLeads = data.filter((lead) => lead.status === "lost");
  const quotationLeads = data.filter((lead) => lead.status === "quotation");

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
      render: (text, record) => (
        <Link
          to="/leads-details"
          className="company-img"
          state={{ leadData: record }}
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
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
      dataIndex: "status",
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
            {/* <Link
              className='dropdown-item'
              to='#'
              data-bs-toggle='modal'
              data-bs-target='#edit_leads'
              onClick={() => handleEditClick(record)}
            >
              <i className='fa fa-pencil m-r-5' /> Edit
            </Link> */}

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
  const leadStatus = [
    { value: "--Select--", label: "--Select--" },
    { value: "Open", label: "Open" },
    { value: "opportunity", label: "Opportunity" },
    { value: "Quotation", label: "Quotation" },
    { value: "Lost", label: "Lost" },
    { value: "Win", label: "Win" },
  ];
  const source = [
    { value: "--Select--", label: "--Select--" },
    { value: "Upwork", label: "Upwork" },
    { value: "LinkdIn", label: "LinkdIn" },
    { value: "Facebook", label: "Facebook" },
  ];
  const medium = [
    { value: "--Select--", label: "--Select--" },
    { value: "DL@gmail.com", label: "DL@gmail.com" },
    { value: "BD@gmail.com", label: "BD@gmail.com" },
  ];

  useEffect(() => {
    applyFilters();
  }, [dateRange, status]);
  // Filter function
  const applyFilters = () => {
    let updatedData = [...data];
    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      updatedData = updatedData.filter((lead) => {
        const leadDate = new Date(lead.date); // Adjust to match your date format
        return (
          leadDate >= new Date(dateRange.start) &&
          leadDate <= new Date(dateRange.end)
        );
      });
    }
    // Apply status filter
    if (status) {
      updatedData = updatedData.filter((lead) => lead.status === status.value);
    }
    setFilteredData(updatedData);
  };

  // Handle date range change
  const handleDateRangeChange = (start, end) => {
    setDateRange({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') });
  };

  // Handle status change
  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
  };
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
                    <Link
                      to="#"
                      className="grid-view btn btn-link"
                      onClick={() => window.location.reload()}
                    >
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
                  {/* <div className='form-sort'>
                    <Link
                      to='#'
                      className='list-view btn btn-link'
                      data-bs-toggle='modal'
                      data-bs-target='#export'
                    >
                      <i className='las la-file-export' />
                      Export
                    </Link>
                  </div> */}
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

          <div className="filter-section"></div>
          <br />
          <div
            className="row align-items-center"
            style={{ alignContent: "center", alignItems: "center" }}
          >
            <div className="col-md-3">
              <div className="card">
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5>Total Leads</h5>
                  <h6 className="counter">
                    <CountUp
                      end={
                        opportunityLeads.length +
                        openLeads.length +
                        quotationLeads.length +
                        winLeads.length +
                        lostLeads.length
                      }
                    />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5>In process</h5>
                  <h6 className="counter">
                    <CountUp
                      end={
                        opportunityLeads.length +
                        openLeads.length +
                        quotationLeads.length
                      }
                    />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5>Total Won</h5>
                  <h6 className="counter">
                    <CountUp end={winLeads.length} />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5>Total Lost</h5>
                  <h6 className="counter">
                    <CountUp end={lostLeads.length} />
                  </h6>
                </div>
              </div>
            </div>
          </div>

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
                    // value={inputValue}
                    // onFocus={handleLabelClick}
                    // onBlur={handleInputBlur}
                    // onChange={handleInputChange}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <label className="focus-label" onClick={handleLabelClick}>
                    LeadName
                  </label>
                </div>
              </div>
              <div className="col-xl-2">
                {/* <div
                  className={
                    focused1 || inputValue1 !== ''
                      ? 'input-block mb-3 form-focus focused'
                      : 'input-block mb-3 form-focus'
                  }
                >
                  <input
                    type='text'
                    className='form-control floating'
                    value={inputValue1}
                    onFocus={handleLabelClick1}
                    onBlur={handleInputBlur1}
                    onChange={handleInputChange1}
                  />
                  <label className='focus-label' onClick={handleLabelClick1}>
                    Medium
                  </label> */}
                <div className="input-block mb-3 form-focus select-focus">
                  <Select
                    options={medium}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Medium</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus focused">
                  <DateRangePicker
                    onApply={(event, picker) =>
                      handleDateRangeChange(picker.startDate, picker.endDate)
                    }
                    initialSettings={{
                      autoApply: true,
                    }}
                    // initialSettings={initialSettings}
                  >
                    <input
                      className="form-control  date-range bookingrange"
                      type="text"
                      placeholder="Select Date Range"
                    />
                  </DateRangePicker>
                  {/* <DateRangePicker
                    onApply={(event, picker) =>
                      handleDateRangeChange(picker.startDate, picker.endDate)
                    }
                  >
                    <button className="btn btn-primary">
                      Select Date Range
                    </button>
                  </DateRangePicker> */}
                  <label className="focus-label">From - To Date</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus select-focus">
                  <Select
                    options={leadStatus}
                    placeholder="Select"
                    styles={customStyles}
                    onChange={handleStatusChange}
                  />
                  <label className="focus-label">Lead Status</label>
                </div>
              </div>
              <div className="col-xl-2">
                <div className="input-block mb-3 form-focus select-focus">
                  <Select
                    options={source}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Source</label>
                </div>
              </div>
              {/* <div className='col-xl-2'>
                <Link to='#' className='btn btn-success w-100'>
                  {' '}
                  Search{' '}
                </Link>
              </div> */}
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
                <Table
                  className="table table-striped custom-table datatable contact-table"
                  columns={columns}
                  dataSource={filteredData}
                  // dataSource={data}
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
