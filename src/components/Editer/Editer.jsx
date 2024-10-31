import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { BASE_URL } from "../../constants/urls";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function Editer() {
  const location = useLocation();
  const [editor, setEditor] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data } = location.state || {};
  const { description } = location.state || {};
  const { sourceLink } = location.state || {};
  const { clientName } = location.state || {};
  const { titleName } = location.state || {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", titleName);
    formData.append("client", clientName);
    formData.append("source_link", sourceLink);
    formData.append("description", description);
    const authToken = localStorage.getItem("BearerToken");

    try {
      const response = await fetch(`${BASE_URL}process-job/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Proposal submitted successfully!", data.data);

        navigate("/editer", {
          state: { data: data.data, description, sourceLink },
          clientName,
          titleName,
        });
      } else {
        console.log("Error submitting proposal.");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(editor);
    console.log(text);

    const fetchResponse = async () => {
      setText(data);
    };

    fetchResponse();
  }, [data, editor, text]);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editer = document.createElement("div");

      wrapper.append(editer);
      const quillInstance = new Quill(editer, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      quillInstance.clipboard.dangerouslyPasteHTML(data);
      setEditor(quillInstance);
    },
    [data]
  );

  return (
    <div>
      <div
        className="contact-head"
        style={{
          marginTop: "5%",
          marginLeft: "20%",
        }}
      >
        <div className="row align-items-center">
          <div
            className="col"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginRight: "80px",
            }}
          >
            <ul className="contact-breadcrumb">
              <li>
                <a href="/react/template/proposal-creation">
                  <i className="las la-arrow-left"></i>Proposal Manager
                </a>
              </li>
              <li> Proposal Creation</li>
            </ul>
            <button
              style={{
                borderRadius: "20px",
                // marginLeft: "50px",
              }}
              className="btn btn-sm btn-primary"
              onClick={handleSubmit} // Call handleSubmit on click
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
      <div
        className="container"
        ref={wrapperRef}
        style={{
          marginTop: "15px",
          marginLeft: "12.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      ></div>
      {/* <button
        className="btn btn-primary submit-btn"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        onClick={handleDownloadDocx}
      >
        Download Proposal as DOCX
      </button> */}
      {loading && (
        <>
          <div className="blur-background"></div>
          <div className="loading-overlay ">
            <ReactLoading type={"bars"} height={100} width={80} />
            <p>
              <strong>Proposal Generating...</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Editer;
