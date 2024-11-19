/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { Avatar_02, Avatar_16 } from '../../../Routes/ImagePath'
import { Link } from 'react-router-dom'
import ProfileTab from './ProfileTab'
import Breadcrumbs from '../../../components/Breadcrumbs'
const Profile = () => {
<<<<<<< Updated upstream
  const userDataString = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(userDataString));

  useEffect(() => {
    // Fetch and parse the user data from localStorage when the component mounts
    console.log("Yooo", userDataString);

    // if (userDataString) {
    //   try {
    //     const user = JSON.parse(userDataString);
    //     console.log(user)
    //     setUserData({
    //       id: user?.id,
    //       name: user?.first_name,
    //       role: user?.profile?.role,
    //       jobTitle: user?.profile?.designation,
    //       employeeId: user?.id,
    //       dateOfJoin: user?.profile?.date_of_joining,
    //       phone: user?.profile?.mobile_number,
    //       email: user?.email,
    //       birthday: user?.profile?.date_of_birth,
    //       address: user?.profile?.address,
    //       gender: user?.profile?.gender,
    //       supervisor: {
    //         name: "Jeffery Lalor",
    //         avatar: "assets/img/profiles/avatar-16.jpg",
    //       },
    //     });
    //     console.log("heheh",userData)
    //   } catch (error) {
    //     console.error("Error parsing user data:", error);
    //   }
    // }
  }, []); //
=======
  const userDataString = localStorage.getItem('user')
  const [userData, setUserData] = useState(JSON.parse(userDataString))

  useEffect(() => {
    // Fetch and parse the user data from localStorage when the component mounts
    console.log('Yooo', userDataString)
  }, []) //
>>>>>>> Stashed changes

  useEffect(() => {
    // This will log whenever userData is updated
    console.log('Updated userData:', userData)
    console.log('Image', userData?.user?.profile?.profile_photo)
  }, [userData])
  return (
    <>
      <div className='page-wrapper'>
        <div className='content container-fluid'>
          <Breadcrumbs
            maintitle='Profile'
            title='Dashboard'
            subtitle='Profile'
            modal='#add_indicator'
            name='Add New'
          />
<<<<<<< Updated upstream
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <Link to="#">
                          <img src={Avatar_02} alt="User Image" />
                          <img
                            src={userData?.user?.profile?.profile_photo}
                            alt="User Image"
=======
          <div className='card mb-0'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='profile-view'>
                    <div className='profile-img-wrap'>
                      <div className='profile-img'>
                        <Link to='#'>
                          {/* <img src={Avatar_02} alt="User Image" /> */}
                          <img
                            src={`http://10.3.1.181:8000${userData?.user?.profile?.profile_photo}`}
                            alt='User Image'
>>>>>>> Stashed changes
                          />
                        </Link>
                      </div>
                    </div>
                    <div className='profile-basic'>
                      <div className='row'>
                        <div className='col-md-5'>
                          <div className='profile-info-left'>
                            <h3 className='user-name m-t-0 mb-0'>
                              Shahmeer
                              {userData?.user.first_name}
                            </h3>
<<<<<<< Updated upstream
                            <h6 className="text-muted">
                              {userData?.user?.role}
                            </h6>
                            <small className="text-muted">
=======
                            <h6 className='text-muted'>
                              Role: {userData?.user?.role}
                            </h6>
                            <small className='text-muted'>
                              Designation:{' '}
>>>>>>> Stashed changes
                              {userData?.user?.profile?.designation}
                            </small>
                            <div className='staff-id'>
                              Employee ID : {userData?.user?.id}
                            </div>
<<<<<<< Updated upstream
                            <div className="small doj text-muted">
                              Date of Join :{" "}
=======
                            <div className='small doj text-muted'>
                              Date of Join :{' '}
>>>>>>> Stashed changes
                              {userData?.user?.profile?.date_of_joining}
                            </div>
                            <div className='staff-msg'>
                              <Link className='btn btn-custom' to='/call/chat'>
                                Send Message
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-7'>
                          <ul className='personal-info'>
                            <li>
<<<<<<< Updated upstream
                              <div className="title">Phone:</div>
                              <div className="text">
=======
                              <div className='title'>Phone:</div>
                              <div className='text'>
>>>>>>> Stashed changes
                                <Link
                                  to={`tel:${userData?.user?.profile?.mobile_number}`}
                                >
                                  {userData?.user?.profile?.mobile_number}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className='title'>Email:</div>
                              <div className='text'>
                                <Link
                                  to={`mailto:${userData?.user?.profile?.email}`}
                                >
                                  {userData?.user?.profile?.email}
                                </Link>
                              </div>
                              {/* <div className="title">Email:</div>
                              <div className="text">
                                <a href={`mailto:${userData?.user?.email}`}>
                                  {userData?.user?.email}
                                </a>
                              </div> */}
                            </li>
                            <li>
                              <div className='title'>Birthday:</div>
                              <div className='text'>
                                {userData?.user?.profile?.date_of_birth}
                              </div>
                            </li>
                            <li>
<<<<<<< Updated upstream
                              <div className="title">Birthday:</div>
                              <div className="text">
                                {userData?.user?.profile?.date_of_birth}
                              </div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">
                                {userData?.user?.profile?.address}
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">
                                {userData?.user?.profile?.gender}
                              </div>
                            </li>
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  <div className="avatar avatar-xs">
                                    <img src={Avatar_16} alt="User Image" />
=======
                              <div className='title'>Address:</div>
                              <div className='text'>
                                {userData?.user?.profile?.address}
                              </div>
                            </li>
                            <li>
                              <div className='title'>Gender:</div>
                              <div className='text'>
                                {userData?.user?.profile?.gender}
                              </div>
                            </li>
                            <li>
                              <div className='title'>Reports to:</div>
                              <div className='text'>
                                <div className='avatar-box'>
                                  <div className='avatar avatar-xs'>
                                    <img src={Avatar_16} alt='User Image' />
>>>>>>> Stashed changes
                                  </div>
                                </div>
                                <Link to='profile'>
                                  {userData?.supervisor?.name}
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className='pro-edit'>
                      <Link
                        data-bs-target='#profile_info'
                        data-bs-toggle='modal'
                        className='edit-icon'
                        to='#'
                      >
                        <i className='fa-solid fa-pencil'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card tab-box'>
            <div className='row user-tabs'>
              <div className='col-lg-12 col-md-12 col-sm-12 line-tabs'>
                <ul className='nav nav-tabs nav-tabs-bottom'>
                  <li className='nav-item'>
                    <Link
                      to='#emp_profile'
                      data-bs-toggle='tab'
                      className='nav-link active'
                    >
                      Profile
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='#emp_projects'
                      data-bs-toggle='tab'
                      className='nav-link'
                    >
                      Projects
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Bank &amp; Statutory
                      <small className="text-danger ms-1">(Admin Only)</small>
                    </Link>
                  </li> */}
                  <li className='nav-item'>
                    <Link
                      to='#emp_assets'
                      data-bs-toggle='tab'
                      className='nav-link'
                    >
                      Assets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Profile Info Tab */}
          <ProfileTab />
        </div>
      </div>
    </>
  )
}

export default Profile
