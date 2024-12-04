import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Select from "react-select";
import ExportLeads from "../../../components/modelpopup/Crm/ExportLeads";
import AddPipeLine from "../../../components/modelpopup/Crm/AddPipeLine";
import SearchBox from "../../../components/SearchBox";
import EditPipeLine from "../../../components/modelpopup/Crm/EditPipeLine";
import DetelePipeLine from "../../../components/modelpopup/Crm/DetelePipeLine";
import { BASE_URL } from "../../../constants/urls";
const PipeLine = () => {
  const [data, setData] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
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

  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASE_URL}lead-summary/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log("Data ",data)
        } else {
          console.error("Failed to fetch leads:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
      }
    };

    fetchLeads();
  }, []);

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
  const sortoption = [
    { value: "open", label: "Open" },
    { value: "opportunity", label: "Opportunity" },
    { value: "win", label: "Win" },
    { value: "lost", label: "Lost" },
  ];
 
  const pipelinelist = [
    { value: "--Select--", label: "--Select--" },
    { value: "Win", label: "Win" },
    { value: "In PipeLine", label: "In PipeLine" },
    { value: "Conversation", label: "Conversation" },
    { value: "Folllow Up", label: "Folllow Up" },
    { value: "Lost", label: "Lost" },
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
      title: "Total Order Value",
      dataIndex: "total_order_value",
      sorter: (a, b) => a.total_order_value.length - b.total_order_value.length,
    },
    {
      title: "No of Orders",
      dataIndex: "order_count",
      sorter: (a, b) => a.order_count.length - b.order_count.length,
    },
    {
      title: "Stages",
      dataIndex: "status",
      render: (text, record) => (
        <div className="pipeline-progress d-flex align-items-center">
          <div className="progress">
            {text === "opportunity" && (
              <div
                className="progress-bar progress-bar-violet"
                role="progressbar"
              ></div>
            )}
            {text === "win" && (
              <div
                className="progress-bar progress-bar-success"
                role="progressbar"
              ></div>
            )}
            {text === "quotation" && (
              <div
                className="progress-bar progress-bar-pink"
                role="progressbar"
              ></div>
            )}
            {text === "lost" && (
              <div
                className="progress-bar progress-bar-danger"
                role="progressbar"
              ></div>
            )}
            {text === "open" && (
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
              ></div>
            )}
          </div>
          <span>{text}</span>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a, b) => a.created_date.length - b.created_date.length,
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
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_pipeline"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_pipeline"
            >
              <i className="fa fa-trash m-r-5" /> Delete
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
  const [selectedDate, setSelectedDate] = useState();
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const fetchLeads = async () => {
    try {
      const authToken = localStorage.getItem("BearerToken");

      // Extract year and month from the selected date
      const year = selectedDate ? selectedDate.getFullYear() : null;
      const month = selectedDate ? selectedDate.getMonth() + 1 : null;

      // Include year and month in the API request if available
      let apiUrl = `${BASE_URL}lead-summary/`;
      if (year && month) {
        apiUrl += `?year=${year}&month=${month}`;
      }

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log("Data: ", data);
      } else {
        console.error("Failed to fetch leads:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchLeads();
    }
  }, [selectedDate]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleDateFocus = () => {
    setFocused(true);
  };
  const [isFullScreen, setFullScreen] = useState(false);
  const maximizeBtnRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          setFullScreen(false);
        }
      }
    };

    const cleanup = () => {
      if (isFullScreen && document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    };

    const maximizeBtn = maximizeBtnRef.current;
    maximizeBtn.addEventListener("click", handleClick);

    // Cleanup function to remove the event listener and exit fullscreen on component unmount
    return () => {
      maximizeBtn.removeEventListener("click", handleClick);
      cleanup();
    };
  }, [isFullScreen]);

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
                <h3 className="page-title">Sale Order</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin-dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Sale Order</li>
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
                      className="list-view btn btn-link"
                      id="collapse-header"
                      ref={maximizeBtnRef}
                    >
                      <i className="las la-expand-arrows-alt" />
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
                    {/* <Link
                      to="#"
                      className="list-view btn btn-link"
                      data-bs-toggle="modal"
                      data-bs-target="#export"
                    >
                      <i className="las la-file-export" />
                      Export
                    </Link> */}
                  </div>
                  {/* <Link
                    to="#"
                    className="btn btn-sm btn-primary add-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#add_pipeline"
                  >
                    <i className="la la-plus-circle" /> Add PipeLine
                  </Link> */}
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
            <div className="row filter-row custom-filter-row">
              <div className="custom-col">
                <div
                  className={
                    focused || inputValue !== ""
                      ? "input-block mb-3 form-focus focused"
                      : "input-block mb-3 form-focus"
                  }
                >
                  {/* <input
                    type="text"
                    className="form-control floating"
                    value={inputValue}
                    onFocus={handleLabelClick}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                  />
                  <label className="focus-label" onClick={handleLabelClick}>
                    Pipeline Name
                  </label> */}
                </div>
              </div>
              <div className="custom-col">
                <div
                  className={
                    focused1 || inputValue1 !== ""
                      ? "input-block mb-3 form-focus focused"
                      : "input-block mb-3 form-focus"
                  }
                >
                  {/* <input
                    type="text"
                    className="form-control floating"
                    value={inputValue1}
                    onFocus={handleLabelClick1}
                    onBlur={handleInputBlur1}
                    onChange={handleInputChange1}
                  />
                  <label className="focus-label" onClick={handleLabelClick1}>
                    Deal Value
                  </label> */}
                </div>
              </div>
              
              <div className="custom-col">
                <div className="input-block mb-3 form-focus select-focus">
                  {/* <Select
                    options={pipelinelist}
                    placeholder="Select"
                    styles={customStyles}
                  />
                  <label className="focus-label">Stages</label> */}
                </div>
              </div>
              <div className="custom-col">
                <div
                  className={`input-block mb-3 form-focus ${
                    isFocused ? "focused" : ""
                  }`}
                >
                  <div className="cal-icon focused ">
                    <DatePicker
                      className="form-control floating datetimepicker"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                  <label className="focus-label" onClick={handleDateFocus}>
                    Created Date
                  </label>
                </div>
              </div>
              <div className="custom-col">
                <Link to="#" className="btn btn-success w-100">
                  {" "}
                  Search{" "}
                </Link>
              </div>
            </div>
          </div>
          <hr />
          {/* /Search Filter */}
          
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {/* <SearchBox /> */}
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
      </div>
      {/* /Page Content */}
      <ExportLeads />
      <AddPipeLine />
      <EditPipeLine />
      <DetelePipeLine />
    </div>
  );
};

export default PipeLine;
{/* <div className="custom-col">
                <div
                  className={`input-block mb-3 form-focus ${
                    isFocused ? "focused" : ""
                  }`}
                >
                  <div className="cal-icon focused ">
                    <DatePicker
                      className="form-control floating datetimepicker"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                  <label className="focus-label" onClick={handleDateFocus}>
                    Created Date
                  </label>
                </div>
              </div> */}
