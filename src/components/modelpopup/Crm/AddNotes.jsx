import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { BASE_URL } from "../../../constants/urls";
import { useLocation } from "react-router-dom";

const AddNotes = () => {
    const { userData, setlead } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const initialLead =
    location.state?.leadData ||
    JSON.parse(localStorage.getItem("leadData")) ||
    {};

  const [leadData, setleadData] = useState(() => initialLead);

  useEffect(() => {
    localStorage.setItem("leadData", JSON.stringify(leadData));
    console.log("Lead Notes ", leadData);
  }, [location.state, leadData]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      const newFiles = selectedFiles.filter(
        (file) => !documents.some((doc) => doc.name === file.name)
      );

      setDocuments((prevDocs) => [...prevDocs, ...newFiles]);
      setFormErrors({ ...formErrors, documents: "" });
    } else {
      setFormErrors({
        ...formErrors,
        documents: "Document upload is required",
      });
    }
  };

  const SendNotes = async () => {
    if (!title || !note || documents.length === 0) {
      setFormErrors({
        title: !title ? "Title is required" : "",
        note: !note ? "Note is required" : "",
        documents:
          documents.length === 0 ? "At least one document is required" : "",
      });
      return;
    }

    try {
      const authToken = localStorage.getItem("BearerToken");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("note", note);
      documents.forEach((file) => formData.append("files", file));
      if (leadData?.id) {
        formData.append("lead", leadData.id);
      }
      if (userData?.user?.id) {
        formData.append("created_by", userData?.user?.id);
      }
      const response = await fetch(`${BASE_URL}notes/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Note added successfully: ", data);
        // Reset form
        setTitle("");
        setNote("");
        setDocuments([]);
        setFormErrors({});
        const Notesresponse = await fetch(`${BASE_URL}leads/${leadData.id}/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
    
          if (!Notesresponse.ok) {
            console.log("Error");
            throw new Error(`HTTP error! Status: ${Notesresponse.status}`);
          }else{
            const data = await Notesresponse.json();
            localStorage.setItem("leadData", JSON.stringify(data));
            setlead(JSON.stringify(data))
            console.log("hemlooo g API send properly ::", data)
          }
      } else {
        console.error("Failed to add note:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const removeFile = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };
  return (
    <>
      <div
        className="modal custom-modal fade modal-padding"
        id="add_notes"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-border align-items-center justify-content-between p-0">
              <h5 className="modal-title">Add Note</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <form>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Title <span className="text-danger"> *</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {formErrors.title && (
                    <span className="text-danger">{formErrors.title}</span>
                  )}
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Note <span className="text-danger"> *</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Add text"
                    defaultValue={""}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  {formErrors.note && (
                    <span className="text-danger">{formErrors.note}</span>
                  )}
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Upload Documents<span style={{ color: "red" }}> *</span>
                  </label>

                  <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                      color: "red",
                    }}
                    required
                  />
                  {formErrors.documents && (
                    <span className="text-danger">{formErrors.documents}</span>
                  )}
                  <ul>
                    {documents.map((file, index) => (
                      <li key={index}>
                        {file.name}{" "}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="btn btn-sm btn-danger"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div className="input-block mb-3">
                                    <label className="col-form-label">
                                        Attachment <span className="text-danger"> *</span>
                                    </label>
                                    <div className="drag-upload">
                                        <input type="file" />
                                        <div className="img-upload">
                                            <i className="las la-file-import" />
                                            <p>Drag &amp; Drop your files</p>
                                        </div>
                                    </div>
                                </div> */}
                {/* <div className="input-block mb-3">
                                    <label className="col-form-label">Uploaded Files</label>
                                    <div className="upload-file">
                                        <h6>Projectneonals teyys.xls</h6>
                                        <p>4.25 MB</p>
                                        <div className="progress">
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: "25%" }}
                                                aria-valuenow={25}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                        <p>45%</p>
                                    </div>
                                    <div className="upload-file upload-list">
                                        <div>
                                            <h6>Projectneonals teyys.xls</h6>
                                            <p>4.25 MB</p>
                                        </div>
                                        <Link to="#" className="text-danger">
                                            <i className="las la-trash" />
                                        </Link>
                                    </div>
                                </div> */}
                <div className="col-lg-12 text-end form-wizard-button">
                  {/* <button
                    className="button btn-lights reset-btn"
                    type="reset"
                    data-bs-dismiss="modal"
                  >
                    Reset
                  </button> */}
                  <Link
                    className="btn btn-primary"
                    to="#"
                    data-bs-dismiss="modal"
                    onClick={SendNotes}
                  >
                    Save Notes
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Note */}
    </>
  );
};

export default AddNotes;
