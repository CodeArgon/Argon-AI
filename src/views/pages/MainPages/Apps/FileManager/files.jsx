import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../constants/urls";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import "./proposalcreation.css";

const Files = ({ setData }) => {
  const [teamMemberOptions, setTeamMemberOptions] = useState([]);
  const [teamLeaderOptions, setTeamLeaderOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const authToken = localStorage.getItem("BearerToken");
      try {
        const response = await fetch(`${BASE_URL}users/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        const options = data.map((user) => ({
          value: user.id,
          label: user.username,
        }));
        setTeamMemberOptions(options);
        setTeamLeaderOptions(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const [projects, setProjects] = useState([]);
  const authToken = localStorage.getItem("BearerToken");
  const navigate = useNavigate();

  const handleNavigate = (project) => {
    navigate("/view-project-details", { state: { project: project } });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}projects/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(async (res) => {
        const projectData = await Promise.all(
          res.data.map(async (project) => {
            const platformIds = project.platform;
            const techStackIds = project.tech_stack;
            const responsiblePersonId = project.responsible_person;
            const developmentTeamIds = project.development_team;

            const platforms = await Promise.all(
              platformIds.map(async (platformId) => {
                const platformRes = await axios.get(
                  `${BASE_URL}platforms/${platformId}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                return platformRes.data.name;
              })
            );

            await Promise.all(
              techStackIds.map(async (techStackId) => {
                const techStackRes = await axios.get(
                  `${BASE_URL}techstacks/${techStackId}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                return techStackRes.data.name;
              })
            );
            let leaderRes;
            if (responsiblePersonId != null) {
              leaderRes = await axios.get(
                `${BASE_URL}users/${responsiblePersonId}/`,
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );
            }
            await Promise.all(
              developmentTeamIds.map(async (memberId) => {
                const memberRes = await axios.get(
                  `${BASE_URL}users/${memberId}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                return memberRes.data.username;
              })
            );
            if (leaderRes != undefined) {
              project.responsible_person = leaderRes.data.username;
            }
            return {
              ...project,
              platforms: platforms.join(", "),
            };
          })
        );
        setProjects(projectData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [authToken]);

  function stripHtmlTags(str) {
    if (!str) return "";
    return str.replace(/<[^>]*>?/gm, "");
  }

  return (
    <div>
      {loading ? (
        <div className="blur-background">
          <div className="loading-overlay">
            <ReactLoading type={"bars"} height={100} width={80} color="white" />
          </div>
        </div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-lg-4 col-sm-6 col-md-4 col-xl-3 d-flex"
            >
              <div className="card w-100">
                <div className="card-body">
                  <div className="pro-deadline m-b-15">
                    <img
                      src={project.logo_icon}
                      alt="Project Logo"
                      style={{
                        width: "170px",
                        height: "100px",
                        objectFit: "fill",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <h4
                    className="project-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNavigate(project)}
                  >
                    {project.name}
                  </h4>
                  <p className="text-muted">
                    {stripHtmlTags(project.description).length > 140
                      ? `${stripHtmlTags(project.description).slice(0, 140)}...`
                      : stripHtmlTags(project.description)}
                  </p>
                  <div className="pro-deadline m-b-15">
                    <div className="sub-title">Industry:</div>
                    <div className="text-muted">{project.industry}</div>
                  </div>
                  <div className="pro-deadline m-b-15">
                    <div className="sub-title">Platform:</div>
                    <div className="text-muted">{project.platforms}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Files;
