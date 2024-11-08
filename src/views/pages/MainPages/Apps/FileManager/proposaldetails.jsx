import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProposalDetails = () => {
  const location = useLocation();
  const { proposal } = location.state || {};
  function stripHtmlTags(str) {
    if (!str) return "";
    return str.replace(/<[^>]*>?/gm, "");
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* <div className="col">
            <ul className="contact-breadcrumb">
              <li>
                <Link to="/file-manager">
                  <i className="las la-arrow-left" />
                </Link>
              </li>
              <li>{project?.name || ""}</li>
            </ul>
          </div> */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-4">
                <Link to="/proposal-list">
                  <i className="las la-arrow-left" />
                </Link>
                <h3 className="page-title mb-0">{proposal?.title || ""}</h3>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-xxl-3 col-md-6">
                    <div className="ticket-head-card">
                      <span className="ticket-detail-icon bg-danger-lights">
                        <i className="la la-user" />
                      </span>
                      <div className="detail-info info-two">
                        <h6>Client</h6>
                        <span>{proposal?.client || ""}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-6">
                    <div className="ticket-head-card">
                      <span className="ticket-detail-icon bg-warning-lights">
                        <i className="la la-calendar" />
                      </span>
                      <div className="detail-info info-two">
                        <h6>Created Date</h6>
                        <span>
                          {proposal?.created_at
                            ? new Date(proposal.created_at)
                                .toISOString()
                                .slice(0, 10)
                            : "N/A"}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ticket-purpose">
                <h4>Job Description</h4>
                <p>
                  {proposal?.description
                    ? stripHtmlTags(proposal.description)
                    : ""}
                </p>
              </div>
              <Link style={{}} className="btn btn-sm btn-primary" to="/editer">
                View Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalDetails;
