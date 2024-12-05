import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BASE_URL } from "../../../../constants/urls";
import { Link } from "react-router-dom";
import EditUserModal from "../../../../components/Administration/Users/EditUseModal";
import DeleteModal from "../../../../components/modelpopup/deletePopup";
import dayjs from "dayjs"; // To format dates
import {
  Avatar_01,
} from "../../../../Routes/ImagePath";
const UsersTable = ({ filter }) => {
  const [usersData, setUsersData] = useState([]);

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
        const formattedData = data.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim(),
          email: user.email,
          image: user.profile?.profile_photo ||Avatar_01,
          created_date: dayjs(user.date_joined).format("DD MMM YYYY"),
          role: user.role,
          designation: user.profile?.designation || "N/A", // Replace null with N/A
        }));
        setUsersData(formattedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const filteredData = usersData.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const designationMatch =
      !filter.designation || user.designation === filter.designation;
    const roleMatch = !filter.role || user.role === filter.role;

    return nameMatch && designationMatch && roleMatch;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="table-avatar">
          <div className="avatar">
            {record.image ? (
              <img alt="img" src={record.image} />
            ) : (
              <img alt="fallback-img" src="/images/default-avatar.jpg" />
            )}
          </div>
          {/* <Link to="/profile"> */}
            {text} <span>{record.role}</span>
          {/* </Link> */}
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sorter: (a, b) => a.designation.length - b.designation.length,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a, b) => a.created_date.localeCompare(b.created_date),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => (
        <span
          className={
            text === "Admin"
              ? "badge bg-inverse-danger"
              : "badge bg-inverse-success"
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.role.length - b.role.length,
    },
    // {
    //   title: "Action",
    //   render: () => (
    //     <div className="dropdown dropdown-action text-end">
    //       <Link
    //         to="#"
    //         className="action-icon dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="material-icons">more_vert</i>
    //       </Link>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <Link
    //           className="dropdown-item"
    //           to="#"
    //           data-bs-toggle="modal"
    //           data-bs-target="#edit_user"
    //         >
    //           <i className="fa fa-pencil m-r-5" /> Edit
    //         </Link>
    //         <Link
    //           className="dropdown-item"
    //           to="#"
    //           data-bs-toggle="modal"
    //           data-bs-target="#delete"
    //         >
    //           <i className="fa fa-trash m-r-5" /> Delete
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={filteredData}
            rowKey={(record) => record.id}
          />
          <EditUserModal />
          <DeleteModal Name="Delete" />
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
