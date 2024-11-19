import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { registerUserData } from '../../helpers/users'
import { BASE_URL } from '../../constants/urls'

const PersonalInformationModelPopup = () => {
  const [selectedDate1, setSelectedDate1] = useState(null)
  const [selectedDate2, setSelectedDate2] = useState(null)
  const userDataString = localStorage.getItem('user')
  const setprofileID = localStorage.getItem('ProfileId')
  const [userData, setUserData] = useState(JSON.parse(userDataString))

  const [educationList, setEducationList] = useState([
    {
      institution: '',
      subject: '',
      startDate: null,
      completeDate: null,
      degree: '',
      grade: ''
    }
  ])
  const addMoreEducation = () => {
    setEducationList([
      ...educationList,
      {
        institution: '',
        subject: '',
        startDate: null,
        completeDate: null,
        degree: '',
        grade: ''
      }
    ])
  }

  // State for emergency contact data
  const [primaryContact, setPrimaryContact] = useState({
    emergency_contact_primary_name: '',
    emergency_contact_primary_relationship: '',
    emergency_contact_primary_phone: ''
  })

  const [secondaryContact, setSecondaryContact] = useState({
    emergency_contact_secondary_name: '',
    emergency_contact_secondary_relationship: '',
    emergency_contact_secondary_phone: ''
  })

  // Load existing data when the modal opens
  useEffect(() => {
    if (userData?.user?.profile) {
      setPrimaryContact({
        emergency_contact_primary_name:
          userData.user.profile.emergency_contact_primary_name || '',
        emergency_contact_primary_relationship:
          userData.user.profile.emergency_contact_primary_relationship || '',
        emergency_contact_primary_phone:
          userData.user.profile.emergency_contact_primary_phone || ''
      })

      setSecondaryContact({
        emergency_contact_secondary_name:
          userData.user.profile.emergency_contact_secondary_name || '',
        emergency_contact_secondary_relationship:
          userData.user.profile.emergency_contact_secondary_relationship || '',
        emergency_contact_secondary_phone:
          userData.user.profile.emergency_contact_secondary_phone || ''
      })
    }
  }, [userData])

  // Handler for contact data changes
  const handleContactChange = (contactType, field, value) => {
    const updateContact =
      contactType === 'primary' ? setPrimaryContact : setSecondaryContact
    updateContact(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitEmergencyContact = async () => {
    const formData = {
      profile: {
        emergency_contact_primary_name:
          primaryContact.emergency_contact_primary_name,
        emergency_contact_primary_relationship:
          primaryContact.emergency_contact_primary_relationship,
        emergency_contact_primary_phone:
          primaryContact.emergency_contact_primary_phone,
        emergency_contact_secondary_name:
          secondaryContact.emergency_contact_secondary_name,
        emergency_contact_secondary_relationship:
          secondaryContact.emergency_contact_secondary_relationship,
        emergency_contact_secondary_phone:
          secondaryContact.emergency_contact_secondary_phone
      }
    }

    try {
      const result = await registerUserData(formData)
      if (result === true) {
        // Update local userData state and localStorage
        setUserData({
          ...userData,
          user: {
            ...userData.user,
            profile: {
              ...userData.user.profile,
              ...formData.profile
            }
          }
        })
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...userData,
            user: {
              ...userData.user,
              profile: {
                ...userData.user.profile,
                ...formData.profile
              }
            }
          })
        )
      }
    } catch (error) {
      console.error('Failed to submit emergency contact data:', error)
    }
  }

  const deleteEducation = index => {
    const updatedList = educationList.filter((_, i) => i !== index)
    setEducationList(updatedList)
  }

  const handleInputChange1 = (index, field, value) => {
    const updatedList = [...educationList]
    updatedList[index][field] = value
    setEducationList(updatedList)
  }

  const handleDateChangeEducation = (index, field, date) => {
    const updatedList = [...educationList]
    updatedList[index][field] = date
    setEducationList(updatedList)
  }

  const [experienceList, setExperienceList] = useState([
    {
      companyName: '',
      location: '',
      jobPosition: '',
      periodFrom: null,
      periodTo: null
    }
  ])
  const handleInputChange = (index, field, value) => {
    const newExperienceList = [...experienceList]
    newExperienceList[index][field] = value
    setExperienceList(newExperienceList)
  }
  const handleDateChange1 = (date, index) => {
    const newExperienceList = [...experienceList]
    newExperienceList[index].periodFrom = date
    setExperienceList(newExperienceList)
  }

  // Handle date change for "Period To"
  const handleDateChange2 = (date, index) => {
    const newExperienceList = [...experienceList]
    newExperienceList[index].periodTo = date
    setExperienceList(newExperienceList)
  }
  const addMoreExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        companyName: '',
        location: '',
        jobPosition: '',
        periodFrom: null,
        periodTo: null
      }
    ])
  }

  const deleteExperience = index => {
    const updatedList = experienceList.filter((_, i) => i !== index)
    setExperienceList(updatedList)
  }

  const handleDateChange3 = date => {
    setSelectedDate1(date)
  }

  const handleDateChange4 = date => {
    setSelectedDate2(date)
  }

  const domain = [
    { value: 1, label: 'Select Department' },
    { value: 2, label: 'Web Development+' },
    { value: 3, label: 'IT Management' },
    { value: 4, label: 'Marketing' }
  ]

  const developer = [
    { value: 1, label: 'Select Department' },
    { value: 2, label: 'Web Development+' },
    { value: 3, label: 'IT Management' },
    { value: 4, label: 'Marketing' }
  ]

  const reporter = [
    { value: 2, label: 'Wilmer Deluna' },
    { value: 3, label: 'Lesley Grauer' },
    { value: 4, label: 'Jeffery Lalor' }
  ]

  const status = [
    { value: 1, label: 'Single' },
    { value: 2, label: 'Married' }
  ]

  const gender = [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' }
  ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#ff9b44' : '#fff',
      color: state.isFocused ? '#fff' : '#000',
      '&:hover': {
        backgroundColor: '#ff9b44'
      }
    })
  }

  const handleSubmitExperience = async e => {
    e.preventDefault()
    const authToken = localStorage.getItem('BearerToken')
    console.log('experience list', experienceList)
    const formData = experienceList.map(experience => ({
      company_name: experience.companyName,
      location: experience.location,
      start_date: experience.periodFrom
        ? experience.periodFrom.toISOString().split('T')[0]
        : null,
      end_date: experience.periodTo
        ? experience.periodTo.toISOString().split('T')[0]
        : null,
      job_title: experience.jobPosition,
      profile: userData?.user.profile.id
    }))

    try {
      console.log('form data', formData)
      const apiRequests = formData.map(data =>
        fetch(`${BASE_URL}work/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      )

      const responses = await Promise.all(apiRequests)

      const allSuccessful = responses.every(response => response.ok)

      if (allSuccessful) {
        console.log('All forms submitted successfully')
        console.log('addedd all')
      } else {
        console.error('Some forms failed to submit')
      }
    } catch (error) {
      console.error('Error submitting forms:', error)
    }
  }

  const handleSubmitEducation = async () => {
    const data = {
      institute_name: educationList[0].institution,
      degree: educationList[0].degree,
      duration: '4 years',
      profile: userData?.user.profile.id
    }
    const authToken = localStorage.getItem('BearerToken')
    try {
      const response = await fetch(`${BASE_URL}education/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      {/* Profile Info Modal */}
      <div id='profile_info' className='modal custom-modal fade' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Profile Information</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='profile-img-wrap edit-img'>
                      <img
                        className='inline-block'
                        src={`http://10.3.1.181:8000${userData?.user?.profile?.profile_photo}`}
                        alt='user'
                      />
                      <div className='fileupload btn'>
                        <span className='btn-text'>edit</span>
                        <input className='upload' type='file' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='input-block mb-3'>
                          <label className='col-form-label'>First Name</label>
                          <input
                            type='text'
                            className='form-control'
                            defaultValue={userData?.user.first_name}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='input-block mb-3'>
                          <label className='col-form-label'>Last Name</label>
                          <input
                            type='text'
                            className='form-control'
                            defaultValue={userData?.user.last_name}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='input-block mb-3'>
                          <label className='col-form-label'>Birth Date</label>
                          <div>
                            <DatePicker
                              selected={selectedDate1}
                              onChange={handleDateChange1}
                              className='form-control floating datetimepicker'
                              type='date'
                              placeholderText={
                                userData?.user?.profile?.date_of_birth
                              }
                              dateFormat='dd-MM-yyyy'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='input-block mb-3'>
                          <label className='col-form-label'>Gender</label>
                          <Select
                            options={gender}
                            placeholder={userData?.user?.profile?.gender}
                            styles={customStyles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Address</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={userData?.user?.profile?.address}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>State</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue='Not Available'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Country</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue='Not Available'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Pin Code</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue='Not Available'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Phone Number</label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={userData?.user?.profile?.mobile_number}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Department <span className='text-danger'>*</span>
                      </label>
                      <Select
                        options={domain}
                        placeholder='Select Department'
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Designation <span className='text-danger'>*</span>
                      </label>
                      <Select
                        options={developer}
                        placeholder='Select Department'
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Reports To <span className='text-danger'>*</span>
                      </label>

                      <Select
                        options={reporter}
                        placeholder='Not Available'
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='reset'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Modal */}
      <div
        id='emergency_contact_modal'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Personal Information</h5>
              <button
                style={{ backgroundColor: '#667eea', borderColor: 'white' }}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span style={{ color: 'white' }}>x</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                {/* Primary Contact Section */}
                <div className='card'>
                  <div className='card-body'>
                    <h3 className='card-title'>Primary Contact</h3>
                    <div className='row'>
                      <div className='col-md-6'>
                        <label className='col-form-label'>
                          Name <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholderText={
                            primaryContact.emergency_contact_primary_name
                          }
                          onChange={e =>
                            handleContactChange(
                              'primary',
                              'name',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='col-form-label'>
                          Relationship <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholderText={
                            primaryContact.emergency_contact_primary_relationship
                          }
                          onChange={e =>
                            handleContactChange(
                              'primary',
                              'relationship',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='col-form-label'>
                          Phone <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholderText={
                            primaryContact.emergency_contact_primary_phone
                          }
                          onChange={e =>
                            handleContactChange(
                              'primary',
                              'phone',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Contact Section */}
                <div className='card'>
                  <div className='card-body'>
                    <h3 className='card-title'>Secondary Contact</h3>
                    <div className='row'>
                      <div className='col-md-6'>
                        <label className='col-form-label'>
                          Name <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholderText={
                            secondaryContact.emergency_contact_secondary_name
                          }
                          onChange={e =>
                            handleContactChange(
                              'secondary',
                              'name',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='col-form-label'>
                          Relationship <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholderText={
                            secondaryContact.emergency_contact_secondary_relationship
                          }
                          onChange={e =>
                            handleContactChange(
                              'secondary',
                              'relationship',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className='col-md-6'>
                        <label className='col-form-label'>
                          Phone <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          placeholderText={
                            secondaryContact.emergency_contact_secondary_phone
                          }
                          onChange={e =>
                            handleContactChange(
                              'secondary',
                              'phone',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='button'
                    onClick={handleSubmitEmergencyContact}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info Modal */}
      <div
        id='personal_info_modal'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Personal Information</h5>
              <button
                style={{ backgroundColor: '#667eea', borderColor: 'white' }}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span style={{ color: 'white' }}>x</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>Passport No</label>
                      <input
                        type='text'
                        placeholder={userData?.user?.profile?.cnic}
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>
                        Passport Expiry Date
                      </label>
                      <div className='cal-icon'>
                        <DatePicker
                          selected={selectedDate1}
                          onChange={handleDateChange3}
                          className='form-control floating datetimepicker'
                          type='date'
                          placeholder={userData?.user?.profile?.gender}
                          dateFormat='dd-MM-yyyy'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>Tel</label>
                      <input
                        className='form-control'
                        placeholder={userData?.user?.profile?.mobile_number}
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>
                        Nationality <span className='text-danger'>*</span>
                      </label>
                      <input
                        className='form-control'
                        placeholder={userData?.user?.profile?.nationality}
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>Religion</label>
                      <input
                        className='form-control'
                        placeholder={userData?.user?.profile?.religion}
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>
                        Marital status <span className='text-danger'>*</span>
                      </label>
                      <Select
                        options={status}
                        // placeholder="-"
                        placeholder={userData?.user?.profile?.marital_status}
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>
                        Employment of spouse
                      </label>
                      <input
                        className='form-control'
                        placeholder={
                          userData?.user?.profile?.employment_of_spouse
                        }
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='input-block mb-3 mb-3'>
                      <label className='col-form-label'>No. of children </label>
                      <input
                        className='form-control'
                        placeholder={
                          userData?.user?.profile?.number_of_children
                        }
                        type='text'
                      />
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='reset'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      <div
        id='education_info'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'> Education Informations</h5>
              <button
                style={{ backgroundColor: '#667eea', borderColor: 'white' }}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span style={{ color: 'white' }}>x</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-scroll'>
                  <div>
                    {educationList.map((education, index) => (
                      <div className='card' key={index}>
                        <div className='card-body'>
                          <h3 className='card-title'>
                            Education Information #{index + 1}
                            <Link
                              to='#'
                              className='delete-icon'
                              onClick={() => deleteEducation(index)}
                            >
                              <i className='fa-regular fa-trash-can' />
                            </Link>
                          </h3>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='input-block mb-3 form-focus focused'>
                                <input
                                  type='text'
                                  value={education.institution}
                                  onChange={e =>
                                    handleInputChange1(
                                      index,
                                      'institution',
                                      e.target.value
                                    )
                                  }
                                  className='form-control floating'
                                />
                                <label className='focus-label'>
                                  Institution
                                </label>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='input-block mb-3 form-focus focused'>
                                <input
                                  type='text'
                                  value={education.subject}
                                  onChange={e =>
                                    handleInputChange1(
                                      index,
                                      'subject',
                                      e.target.value
                                    )
                                  }
                                  className='form-control floating'
                                />
                                <label className='focus-label'>Subject</label>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='input-block mb-3 form-focus focused'>
                                <div className='cal-icon'>
                                  <DatePicker
                                    selected={education.startDate}
                                    onChange={date =>
                                      handleDateChangeEducation(
                                        index,
                                        'startDate',
                                        date
                                      )
                                    }
                                    className='form-control floating datetimepicker'
                                    dateFormat='dd-MM-yyyy'
                                  />
                                </div>
                                <label className='focus-label'>
                                  Starting Date
                                </label>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='input-block mb-3 form-focus focused'>
                                <div className='cal-icon'>
                                  <DatePicker
                                    selected={education.completeDate}
                                    onChange={date =>
                                      handleDateChangeEducation(
                                        index,
                                        'completeDate',
                                        date
                                      )
                                    }
                                    className='form-control floating datetimepicker'
                                    dateFormat='dd-MM-yyyy'
                                  />
                                </div>
                                <label className='focus-label'>
                                  Complete Date
                                </label>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='input-block mb-3 form-focus focused'>
                                <input
                                  type='text'
                                  value={education.degree}
                                  onChange={e =>
                                    handleInputChange1(
                                      index,
                                      'degree',
                                      e.target.value
                                    )
                                  }
                                  className='form-control floating'
                                />
                                <label className='focus-label'>Degree</label>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='input-block mb-3 form-focus focused'>
                                <input
                                  type='text'
                                  value={education.grade}
                                  onChange={e =>
                                    handleInputChange1(
                                      index,
                                      'grade',
                                      e.target.value
                                    )
                                  }
                                  className='form-control floating'
                                />
                                <label className='focus-label'>Grade</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className='add-more'>
                      <Link to='#' onClick={addMoreEducation}>
                        <i className='fa-solid fa-plus-circle' /> Add More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='reset'
                    onClick={handleSubmitEducation}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      <div
        id='experience_info'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Experience Informations</h5>
              <button
                style={{ backgroundColor: '#667eea', borderColor: 'white' }}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span style={{ color: 'white' }}>x</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-scroll'>
                  {experienceList.map((experience, index) => (
                    <div className='card' key={index}>
                      <div className='card-body'>
                        <h3 className='card-title'>
                          Experience Information #{index + 1}
                          <Link
                            to='#'
                            className='delete-icon'
                            onClick={() => deleteExperience(index)}
                          >
                            <i className='fa-regular fa-trash-can' />
                          </Link>
                        </h3>
                        <div className='row'>
                          {/* Company Name */}
                          <div className='col-md-6'>
                            <div className='input-block mb-3 form-focus focused'>
                              <input
                                type='text'
                                className='form-control floating'
                                value={experience.companyName}
                                onChange={e =>
                                  handleInputChange(
                                    index,
                                    'companyName',
                                    e.target.value
                                  )
                                }
                              />
                              <label className='focus-label'>
                                Company Name
                              </label>
                            </div>
                          </div>

                          {/* Job Position */}
                          <div className='col-md-6'>
                            <div className='input-block mb-3 form-focus focused'>
                              <input
                                type='text'
                                className='form-control floating'
                                value={experience.jobPosition}
                                onChange={e =>
                                  handleInputChange(
                                    index,
                                    'jobPosition',
                                    e.target.value
                                  )
                                }
                              />
                              <label className='focus-label'>
                                Job Position
                              </label>
                            </div>
                          </div>

                          {/* Period From */}
                          <div className='col-md-6'>
                            <div className='input-block mb-3 form-focus focused'>
                              <div className='cal-icon'>
                                <DatePicker
                                  selected={experience.periodFrom}
                                  onChange={date =>
                                    handleDateChange1(date, index)
                                  }
                                  className='form-control floating datetimepicker'
                                  dateFormat='dd-MM-yyyy'
                                />
                              </div>
                              <label className='focus-label'>Period From</label>
                            </div>
                          </div>

                          {/* Period To */}
                          <div className='col-md-6'>
                            <div className='input-block mb-3 form-focus focused'>
                              <div className='cal-icon'>
                                <DatePicker
                                  selected={experience.periodTo}
                                  onChange={date =>
                                    handleDateChange2(date, index)
                                  }
                                  className='form-control floating datetimepicker'
                                  dateFormat='dd-MM-yyyy'
                                />
                              </div>
                              <label className='focus-label'>Period To</label>
                            </div>
                          </div>

                          {/* Location */}
                          <div className='col-md-6'>
                            <div className='input-block mb-3 form-focus focused'>
                              <input
                                type='text'
                                className='form-control floating'
                                value={experience.location}
                                onChange={e =>
                                  handleInputChange(
                                    index,
                                    'location',
                                    e.target.value
                                  )
                                }
                              />
                              <label className='focus-label'>Location</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className='add-more'>
                    <Link to='#' onClick={addMoreExperience}>
                      <i className='fa-solid fa-plus-circle' /> Add More
                    </Link>
                  </div>
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='reset'
                    onClick={handleSubmitExperience}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Family Info Modal */}
      <div
        id='family_info_modal'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'> Family Informations</h5>
              <button
                style={{ backgroundColor: '#667eea', borderColor: 'white' }}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span style={{ color: 'white' }}>x</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-scroll'>
                  <div className='card'>
                    <div className='card-body'>
                      <h3 className='card-title'>
                        Family Member{' '}
                        <Link to='#' className='delete-icon'>
                          <i className='fa-regular fa-trash-can' />
                        </Link>
                      </h3>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Name <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Relationship{' '}
                              <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Date of birth{' '}
                              <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Phone <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card'>
                    <div className='card-body'>
                      <h3 className='card-title'>
                        Education Informations{' '}
                        <Link to='#' className='delete-icon'>
                          <i className='fa-regular fa-trash-can' />
                        </Link>
                      </h3>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Name <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Relationship{' '}
                              <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Date of birth{' '}
                              <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='input-block mb-3 mb-3'>
                            <label className='col-form-label'>
                              Phone <span className='text-danger'>*</span>
                            </label>
                            <input className='form-control' type='text' />
                          </div>
                        </div>
                      </div>
                      <div className='add-more'>
                        <Link to='#'>
                          <i className='fa-solid fa-plus-circle' /> Add More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='reset'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalInformationModelPopup
