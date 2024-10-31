import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { BASE_URL } from "../../../constants/urls";

const AddLeads = ({ setLeadData }) => {
  const [leadName, setLeadName] = useState("");
  const [leadGenManager, setLeadGenManager] = useState(null);
  const [status, setStatus] = useState(null);
  const [source, setSource] = useState(null);
  const [sources, setSources] = useState([]);
  const [connects, setConnects] = useState(0);
  const [medium, setMedium] = useState(null);
  const [mediums, setMediums] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);
  const [accountExecutive, setAccountExecutive] = useState(null);
  const [sdr, setSdr] = useState(null);
  const [gora, setGora] = useState("");
  const [notes, setNotes] = useState("");
  const [users, setUsers] = useState([]);
  const [dl, setDL] = useState([]);

  const statusOptions = [
    { value: 1, label: "Contacted" },
    { value: 2, label: "Not Contacted" },
    { value: 3, label: "Closed" },
    { value: 4, label: "Lost" },
  ];

  //For Medium List
  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");

    axios
      .get(`${BASE_URL}mediums/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const mediumOptions = response.data.map((medium) => ({
          value: medium.id,
          label: medium.name,
        }));
        setMediums(mediumOptions);
      })
      .catch((error) => {
        console.error("Error fetching mediums:", error);
      });
  }, []);

  //For sources List
  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");
    const fetchSources = async () => {
      try {
        const response = await axios.get(`${BASE_URL}sources/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const sourceOptions = response.data.map((src) => ({
          value: src.id,
          label: src.name,
        }));
        setSources(sourceOptions);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    fetchSources();
  }, []);

  //Fetch DL and BD
  const fetchUsers = async () => {
    const authToken = localStorage.getItem("BearerToken");

    try {
      const response = await fetch(`${BASE_URL}users/by-role/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roles: ["Admin"] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const leadGenManagerOptions = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  //Fetch DLs
  const fetchDLs = async () => {
    const authToken = localStorage.getItem("BearerToken");

    try {
      const response = await fetch(`${BASE_URL}users/by-role/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roles: ["Employee"] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDL(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchDLs();
  }, []);

  const DLsOptions = dl.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#667eea" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#667eea",
      },
    }),
  };

  const validateForm = () => {
    return (
      leadName &&
      leadGenManager &&
      source &&
      connects &&
      medium &&
      assignedTo &&
      accountExecutive &&
      sdr &&
      status &&
      gora &&
      notes
    );
  };

  const handleSaveLead = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }
    const leadData = {
      name: leadName,
      lead_gen_manager_id: leadGenManager?.value,
      source_id: source?.value,
      connects: connects,
      medium_id: medium?.value,
      assigned_to_id: assignedTo?.value,
      account_executive_id: accountExecutive?.value,
      sdr_id: sdr?.value,
      gora: gora,
      communication_notes: notes,
    };

    try {
      const authToken = localStorage.getItem("BearerToken");
      const response = await axios.post(`${BASE_URL}leads/`, leadData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Lead saved successfully:", response.data);
      setLeadData(leadData);
      window.location.reload();
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveLead(e);
  };

  return (
    <div
      className="modal custom-modal fade custom-modal-two modal-padding"
      id="add_leads"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header header-border justify-content-between p-0">
            <h5 className="modal-title">Add New Lead</h5>
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
                        Lead Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Lead Generator Manager{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={leadGenManagerOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={leadGenManager}
                        onChange={setLeadGenManager}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Source <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={sources}
                        placeholder="Select"
                        styles={customStyles}
                        value={source}
                        onChange={setSource}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Connects <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        value={connects}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || parseInt(value) > 0) {
                            setConnects(value);
                          }
                        }}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Medium (Profile List){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={mediums}
                        placeholder="Select"
                        styles={customStyles}
                        value={medium}
                        onChange={setMedium}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Assigned to <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={DLsOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={assignedTo}
                        onChange={setAssignedTo}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Account Executive <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={DLsOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={accountExecutive}
                        onChange={setAccountExecutive}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        SDR <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={DLsOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={sdr}
                        onChange={setSdr}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={statusOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={status}
                        onChange={setStatus}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Client Name(Gora) <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={gora}
                        onChange={(e) => setGora(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Communication Notes{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-block mb-3">
                    <label className="col-form-label">Upload Files</label>
                    <input className="form-control" type="file" required />
                  </div>

                  <div className="col-lg-12 text-end form-wizard-button">
                    <button className="btn btn-primary" type="submit">
                      Save Lead
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

export default AddLeads;
