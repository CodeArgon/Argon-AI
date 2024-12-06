import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  avatar1,
  avatar19,
  avatar20,
  avatar21,
  avatar22,
  media35
} from '../../../Routes/ImagePath'
import Select from 'react-select'
import AddNotes from '../../../components/modelpopup/Crm/AddNotes'
import { MoreVertical } from 'react-feather'
import { Tooltip } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap/esm'
import Calls from '../../../components/modelpopup/Crm/Calls'
import AddFiles from '../../../components/modelpopup/Crm/AddFiles'
import CreateEmail from '../../../components/modelpopup/Crm/CreateEmail'
import AddContact from '../../../components/modelpopup/Crm/AddContact'
import AddLeads from '../../../components/modelpopup/Crm/AddLeads'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../../../constants/urls'
import AddQuotation from '../../../components/modelpopup/Crm/AddQuotation'
import AddOrder from '../../../components/modelpopup/Crm/AddOrder'
import UserContext from '../../../contexts/UserContext'
import axios from 'axios'
import { registerLeadActivities } from '../../../helpers/users'
const LeadsDetails = () => {
  const location = useLocation()
  const initialLead =
    location.state?.leadData ||
    JSON.parse(localStorage.getItem('leadData')) ||
    {}
  const { setLead, lead, setlead, userData } = useContext(UserContext)

  const [leadData, setleadData] = useState(() => initialLead)

  const recentlyViewd = [
    { value: 'Sort By Alphabet', label: 'Sort By Alphabet' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' }
  ]
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#667eea' : '#fff',
      color: state.isFocused ? '#fff' : '#000',
      '&:hover': {
        backgroundColor: '#667eea'
      }
    })
  }
  const [showFirstFieldNotes, setShowFirstFieldNotes] = useState(false)

  const handleCancelNotes = () => {
    setShowFirstFieldNotes(false)
  }

  useEffect(() => {
    setLead(leadData)
    setleadData(leadData)
    localStorage.setItem('leadData', JSON.stringify(leadData))
  }, [location.state, leadData])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('leadData'))
    console.log('i am here FYIIIIII boss', data)

    setleadData(data)
  }, [lead])

  // const [lead, setLead] = useState(initialLead)

  const updateStatusInBackend = async (data = '') => {
    const formData = new FormData()
    if (leadData.status == 'open') {
      formData.append('status', 'opportunity')
      data = 'opportunity'
    } else if (leadData.status == 'quotation') {
      formData.append('status', data)
    }

    const authToken = localStorage.getItem('BearerToken')
    try {
      const response = await fetch(`${BASE_URL}leads/${leadData.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const updatedLead = await response.json()
      localStorage.setItem('leadData', JSON.stringify(updatedLead))
      setLead(updatedLead)
      setleadData(updatedLead)
      setVisibleItems(prevItems => [...prevItems, 'Opportunity'])
      const str = `Lead ${leadData.name} marked as ${data} by ${userData?.user?.username}`
      console.log('String ', str)
      const result = await registerLeadActivities(
        leadData.id,
        userData?.user?.username,
        str
      )
      if (result?.id != '') {
        console.log('result ', result)

        localStorage.setItem('leadData', JSON.stringify(result))
        setLead(result)
        setleadData(result)
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const tooltipContent = (
    <Tooltip id='tooltip'>
      There are no email accounts configured. Please configure your email
      account in order to Send/Create Emails.
    </Tooltip>
  )
  const maximizeBtnRef = useRef(null)

  const [visibleItems, setVisibleItems] = useState(['Open Lead'])

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    axios
      .get(`${BASE_URL}leads/${leadData.id}/orders/`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setOrders(response.data)
        console.log('response ', response)
      })
      .catch(error => {
        console.error('Error fetching orders:', error)
      })
  }, [lead])

  const [quotationData, setQuotationData] = useState(null)

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    const fetchQuotationData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}quotations/by-lead/${leadData.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        )
        if (response.data.length > 0) {
          setQuotationData(response.data[0])
        } else {
          setQuotationData(response.data)
        }
      } catch (error) {
        console.error('Error fetching quotation data:', error)
      }
    }

    fetchQuotationData()
  }, [lead])

  if (!quotationData) return <p>Loading...</p>

  const {
    customer_name,
    payment_list,
    payment_duration,
    created_at,
    approved_by_username
  } = quotationData

  return (
    <>
      {/* Page Wrapper */}
      <div className='page-wrapper'>
        {/* Page Content */}
        <div className='content container-fluid'>
          {/* Page Header */}
          <div className='page-header'>
            <div className='row align-items-center'>
              <div className='col-md-4'>
                <h3 className='page-title'>Leads</h3>
                <ul className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/admin-dashboard'>Dashboard</Link>
                  </li>
                  <li className='breadcrumb-item active'>Leads</li>
                </ul>
              </div>
              <div className='col-md-8 float-end ms-auto'>
                <div className='d-flex title-head'>
                  <div className='view-icons' style={{ marginBottom: '9px' }}>
                    <Link to='#' className='grid-view btn btn-link'>
                      <i className='las la-redo-alt' />
                    </Link>
                    <Link
                      to='#'
                      className='list-view btn btn-link'
                      id='collapse-header'
                      ref={maximizeBtnRef}
                    >
                      <i className='las la-expand-arrows-alt' />
                    </Link>
                  </div>
                  <div className='contacts-action'>
                    {/*<Link
                      to='#'
                      className='btn btn-sm btn-primary add-btn'
                      //style={{ backgroundColor: "transparent" }}
                      data-bs-toggle='modal'
                      data-bs-target='#add_leads'
                    >
                      <i className='la' />
                      View Proposal
                    </Link>
                    */}
                    <div className='dropdown action-drops'>
                      {leadData.status === 'open' && (
                        <Link
                          to='#'
                          className='btn btn-sm btn-primary add-btn'
                          onClick={updateStatusInBackend}
                        >
                          <i className='la' />
                          Make Opportunity
                        </Link>
                      )}
                      {leadData.status == 'opportunity' && (
                        <Link
                          to='#'
                          className='btn btn-sm btn-primary add-btn'
                          data-bs-toggle='modal'
                          data-bs-target='#add_quotations'
                        >
                          <i className='la' />
                          Add Quotation
                        </Link>
                      )}
                      <>
                        {leadData.status === 'quotation' && (
                          <>
                            <Link
                              to='#'
                              className='btn btn-sm btn-primary add-btn'
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: 'green',
                                borderColor: 'transparent'
                              }}
                              onClick={() => updateStatusInBackend('win')}
                            >
                              <i className='la' />
                              Win
                            </Link>
                            <Link
                              to='#'
                              className='btn btn-sm btn-primary add-btn'
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: 'red',
                                borderColor: 'transparent'
                              }}
                              onClick={() => updateStatusInBackend('lost')}
                            >
                              <i className='la' />
                              Lost
                            </Link>
                            <Link
                              to='#'
                              className='btn btn-sm btn-primary add-btn'
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                              }}
                              data-bs-toggle='modal'
                              data-bs-target='#add_orders'
                            >
                              <i className='la' />
                              Add Order
                            </Link>
                          </>
                        )}

                        {leadData.status === 'win' && (
                          <Link
                            to='#'
                            className='btn btn-sm btn-primary add-btn'
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center'
                            }}
                            data-bs-toggle='modal'
                            data-bs-target='#add_orders'
                          >
                            <i className='la' />
                            Add Order
                          </Link>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <hr />
          {leadData ? (
            <div className='row'>
              {/* Contact User */}
              <div className='col-md-12'>
                <div className='contact-head'>
                  <div className='row align-items-center'>
                    <div className='col-sm-6'>
                      <ul className='contact-breadcrumb'>
                        <li>
                          <Link to='/leads-list'>
                            <i className='las la-arrow-left' /> Leads
                          </Link>
                        </li>
                        <li>{leadData.name}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='contact-wrap'>
                  <div className='contact-profile'>
                    <div className='name-user'>
                      <h4>{leadData.name}</h4>
                      <p>
                        {/* <i className="las la-points" /> {leadData.notes} */}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='row'>
                      {leadData.approval_status === 'open' && (
                        <Link
                          to='#'
                          className='btn btn-sm btn-primary add-btn'
                          // onClick={}
                        >
                          <i className='la' /> Open
                        </Link>
                      )}
                      {leadData.approval_status === 'disapproved' && (
                        <Link
                          to='#'
                          className='btn btn-sm btn-primary add-btn'
                          data-bs-toggle='modal'
                          data-bs-target='#add_quotations'
                          style={{ backgroundColor: 'red', borderWidth: 0 }}
                        >
                          <i className='la' /> Disapproved
                        </Link>
                      )}
                      {leadData.approval_status === 'approved' && (
                        <Link
                          to='#'
                          className='btn btn-sm btn-primary add-btn'
                          style={{ backgroundColor: '#55CE63', borderWidth: 0 }}
                        >
                          <i className='la' /> Approved
                        </Link>
                      )}
                      {leadData.approval_status === 'pending' && (
                        <ul
                          className='pending-actions'
                          style={{ display: 'flex', flexDirection: 'row' }}
                        >
                          <li>
                            <Link
                              to='#'
                              className='btn btn-sm btn-primary add-btn'
                              style={{
                                backgroundColor: '#55CE63',
                                borderWidth: 0
                              }}
                            >
                              <i className='la' /> Approve
                            </Link>
                          </li>
                          <li>
                            <Link
                              to='#'
                              className='btn btn-sm btn-primary add-btn'
                              style={{ backgroundColor: 'red', borderWidth: 0 }}
                            >
                              <i className='la' /> Disapprove
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* /Contact User */}
              {/* Contact Sidebar */}
              <div className='col-xl-3'>
                <div className='stickybar'>
                  <div className='card contact-sidebar'>
                    <h5>Lead Information</h5>
                    <ul className='other-info'>
                      <li>
                        <span className='other-title'>Date Created</span>
                        <span>{leadData.created_date}</span>
                      </li>
                      <li>
                        <span className='other-title'>Assigned To</span>
                        <span>{leadData.assigned_to}</span>
                      </li>
                      <li>
                        <span className='other-title'>Medium</span>
                        <span>{leadData.medium}</span>
                      </li>
                      <li>
                        <span className='other-title'>Source</span>
                        <span>
                          {leadData.source}, {leadData.connects}
                        </span>
                      </li>
                      <li>
                        <span className='other-title'>Acc Executive</span>
                        <span>{leadData.account_executive}</span>
                      </li>
                      <li>
                        <span className='other-title'>SDR</span>
                        <span>{leadData.sdr}</span>
                      </li>
                    </ul>
                    <div className='d-flex align-items-center justify-content-between flex-wrap'>
                      <h5>Lead Owner</h5>
                    </div>
                    <ul className='deals-info'>
                      <li>
                        <div>
                          <p>{leadData.lead_gen_manager}</p>
                        </div>
                      </li>
                    </ul>

                    {/* <div className='d-flex align-items-center justify-content-between flex-wrap'>
                      <h5>Priority</h5>
                    </div>
                    <ul className='priority-info'>
                      <li>
                        <div className='dropdown'>
                          <Link
                            to='#'
                            className='dropdown-toggle'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                          >
                            <span>
                              <i className='fa-solid fa-circle me-1 text-danger circle' />
                              High
                            </span>
                            <i className='las la-angle-down ms-1' />
                          </Link>
                          <div className='dropdown-menu dropdown-menu-right'>
                            <Link className='dropdown-item' to='#'>
                              <span>
                                <i className='fa-solid fa-circle me-1 text-danger circle' />
                                High
                              </span>
                            </Link>
                            <Link className='dropdown-item' to='#'>
                              <span>
                                <i className='fa-solid fa-circle me-1 text-success circle' />
                                Low
                              </span>
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul> */}
                    <div className='d-flex align-items-center justify-content-between flex-wrap'>
                      <h5>Client Name</h5>
                    </div>
                    <ul className='deals-info'>
                      <li>
                        <div>
                          <p>{leadData.gora}</p>
                        </div>
                      </li>
                    </ul>
                    <div className='d-flex align-items-center justify-content-between flex-wrap'>
                      <h5>Attached Documents</h5>
                    </div>
                    <ul className='other-info'>
                      {leadData?.documents && leadData?.documents.length > 0 ? (
                        leadData?.documents.map((document, index) => (
                          <li key={index}>
                            <div className='d-flex align-items-center'>
                              <span className='file-icon'>
                                <i className='la la-file-alt' />
                              </span>
                              <p>{document.name}</p>
                            </div>
                            <div className='file-download'>
                              <Link
                              // onClick={() =>
                              //   handleOpenInNewTab(leadData.file)
                              // }
                              >
                                <i className='la la-download' />
                                Download
                              </Link>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>No documents available</li>
                      )}
                    </ul>
                    <div className='d-flex align-items-center justify-content-between flex-wrap'>
                      <h5>Other Information</h5>
                    </div>
                    <ul className='other-info'>
                      <li>
                        <span className='other-title'>Last Modified</span>
                        <span>10 Jan 2024, 10:00 am</span>
                      </li>
                      <li>
                        <span className='other-title'>Modified By</span>
                        <span>Darlee Robertson</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Contact Sidebar */}
              {/* Contact Details */}
              <div className='col-xl-9'>
                <div className='contact-tab-wrap'>
                  <h4>Lead Pipeline Status</h4>
                  <div className='pipeline-list'>
                    <ul>
                      {leadData.status == 'open' && (
                        <li>
                          <Link to='#' className='bg-pending'>
                            Open Lead
                          </Link>
                        </li>
                      )}
                      {leadData.status == 'opportunity' && (
                        <ul>
                          <li>
                            <Link to='#' className='bg-pending'>
                              Open Lead
                            </Link>
                          </li>
                          <li>
                            <Link to='#' className='bg-info'>
                              Opportunity
                            </Link>
                          </li>
                        </ul>
                      )}
                      {leadData.status === 'quotation' && (
                        <ul>
                          <li>
                            <Link to='#' className='bg-pending'>
                              Open Lead
                            </Link>
                          </li>
                          <li>
                            <Link to='#' className='bg-info'>
                              Opportunity
                            </Link>
                          </li>
                          <li>
                            <Link to='#' className='bg-warning'>
                              Quotation
                            </Link>
                          </li>
                        </ul>
                      )}
                      {(leadData.status === 'lost' ||
                        leadData.status === 'win') && (
                        <ul>
                          <li>
                            <Link to='#' className='bg-pending'>
                              Open Lead
                            </Link>
                          </li>
                          <li>
                            <Link to='#' className='bg-info'>
                              Opportunity
                            </Link>
                          </li>
                          <li>
                            <Link to='#' className='bg-warning'>
                              Quotation
                            </Link>
                          </li>

                          <li>
                            <Link to='#' className='bg-danger'>
                              {leadData.status.charAt(0).toUpperCase() +
                                leadData.status.slice(1).toLowerCase()}
                            </Link>
                          </li>
                        </ul>
                      )}
                    </ul>
                  </div>
                  <ul className='contact-nav nav'>
                    <li>
                      <Link
                        to='#'
                        data-bs-toggle='tab'
                        data-bs-target='#activities'
                        className='active'
                      >
                        <i className='las la-user-clock' />
                        Activities
                      </Link>
                    </li>
                    <li>
                      <Link to='#' data-bs-toggle='tab' data-bs-target='#notes'>
                        <i className='las la-file' />
                        Notes
                      </Link>
                    </li>
                    {/*<li>
                      <Link to="#" data-bs-toggle="tab" data-bs-target="#calls">
                        <i className="las la-phone-volume" />
                        Calls
                      </Link>
                    </li>
                    <li>
                      <Link to='#' data-bs-toggle='tab' data-bs-target='#files'>
                        <i className='las la-file' />
                        Files
                      </Link>
                    </li>
                    <li>
                      <Link to='#' data-bs-toggle='tab' data-bs-target='#email'>
                        <i className='las la-envelope' />
                        Email
                      </Link>
                    </li> */}
                    <li>
                      <Link to='#' data-bs-toggle='tab' data-bs-target='#qoute'>
                        <i className='las la-file' />
                        Quotations
                      </Link>
                    </li>
                    <li>
                      <Link to='#' data-bs-toggle='tab' data-bs-target='#order'>
                        <i className='las la-file' />
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Tab Content */}
                <div className='contact-tab-view'>
                  <div className='tab-content pt-0'>
                    {/* Activities */}
                    <div className='tab-pane active show' id='activities'>
                      <div className='view-header'>
                        <h4>Activities</h4>
                        <ul>
                          <li>
                            <div className='form-sort deals-dash-select'>
                              <i className='las la-sort-amount-up-alt' />
                              <Select
                                className='select w-100'
                                options={recentlyViewd}
                                placeholder='Sort By Alphabet'
                                styles={customStyles}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className='contact-activity'>
                        {leadData.activities &&
                        leadData.activities.length > 0 ? (
                          leadData.activities.map(activity => (
                            <div key={activity.id} className='badge-day'>
                              <i className='fa-regular fa-calendar-check' />
                              {new Date(activity.created_at).toLocaleDateString(
                                'en-GB',
                                {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                }
                              )}
                              <ul>
                                <li className='activity-wrap'>
                                  <span className='activity-icon bg-info'>
                                    <i className='las la-comment-alt' />
                                  </span>
                                  <div className='activity-info'>
                                    <h6>{activity.text}</h6>
                                    <p>
                                      {new Date(
                                        activity.created_at
                                      ).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))
                        ) : (
                          <p>No activities found.</p>
                        )}
                      </div>
                    </div>

                    {/* /Activities */}
                    {/* Notes */}
                    <div className='tab-pane fade' id='notes'>
                      <div className='view-header'>
                        <h4>Notes</h4>
                        <ul>
                          <li>{/* Optional Sort Dropdown */}</li>
                          <li>
                            <Link
                              to='#'
                              data-bs-toggle='modal'
                              data-bs-target='#add_notes'
                              className='com-add'
                            >
                              <i className='las la-plus-circle me-1' />
                              Add New
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className='notes-activity'>
                        {leadData.notes && leadData.notes.length > 0 ? (
                          leadData.notes.map(note => (
                            <div className='calls-box' key={note.id}>
                              <div className='caller-info'>
                                <div className='calls-user'>
                                  {/* User Avatar */}
                                  <img src={avatar21} alt='img' />
                                  <div>
                                    <h6>{note.created_by || 'Unknown User'}</h6>
                                    <p>
                                      {new Date(
                                        note.created_at
                                      ).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                      })}
                                      ,{' '}
                                      {new Date(
                                        note.created_at
                                      ).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className='calls-action'>
                                  <div className='dropdown action-drop'>
                                    <Link
                                      to='#'
                                      className='dropdown-toggle'
                                      data-bs-toggle='dropdown'
                                      aria-expanded='false'
                                    >
                                      <MoreVertical size={15} />
                                    </Link>
                                    <div className='dropdown-menu dropdown-menu-right'>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-edit me-1' />
                                        Edit
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-trash me-1' />
                                        Delete
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <h5>{note.title || 'Untitled Note'}</h5>
                              <p>
                                {note.note ||
                                  'No additional details available.'}
                              </p>

                              {/* Document Downloads */}
                              {leadData.documents &&
                                leadData.documents.length > 0 && (
                                  <ul>
                                    {leadData.documents.map((doc, index) => (
                                      <li key={index}>
                                        {/* <div className="note-download">
                                          <div className="note-info">
                                            <span className="note-icon bg-success">
                                              <i className="las la-file-excel" />
                                            </span>
                                            <div>
                                              <h6>
                                                {doc.name || "Unknown Document"}
                                              </h6>
                                              <p>
                                                {doc.size || "Unknown Size"}
                                              </p>
                                            </div>
                                          </div>
                                          <Link to="#">
                                            <i className="las la-download" />
                                          </Link>
                                        </div> */}
                                      </li>
                                    ))}
                                  </ul>
                                )}

                              {/* Notes Editor */}
                              <div className='notes-editor'>
                                <div
                                  className='note-edit-wrap'
                                  style={{
                                    display: showFirstFieldNotes
                                      ? 'block'
                                      : 'none'
                                  }}
                                >
                                  <div className='summernote'>
                                    Write a new comment, send your team
                                    notification by typing @ followed by their
                                    name
                                  </div>
                                  <div className='text-end note-btns'>
                                    <Link
                                      to='#'
                                      onClick={handleCancelNotes}
                                      className='btn btn-lighter add-cancel'
                                    >
                                      Cancel
                                    </Link>
                                    <Link to='#' className='btn btn-primary'>
                                      Save
                                    </Link>
                                  </div>
                                </div>
                                {/* <div className="text-end">
                                  <Link
                                    to="#"
                                    className="add-comment"
                                    onClick={handleSaveAndNextNotes}
                                  >
                                    <i className="las la-plus-circle me-1" />
                                    Add Comment
                                  </Link>
                                </div> */}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No notes available.</p>
                        )}
                      </div>
                    </div>

                    {/* /Notes */}
                    {/* Calls */}
                    <div className='tab-pane fade' id='calls'>
                      <div className='view-header'>
                        <h4>Calls</h4>
                        <ul>
                          <li>
                            <Link
                              to='#'
                              data-bs-toggle='modal'
                              data-bs-target='#create_call'
                              className='com-add'
                            >
                              <i className='las la-plus-circle me-1' />
                              Add New
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className='calls-activity'>
                        <div className='calls-box'>
                          <div className='caller-info'>
                            <div className='calls-user'>
                              <img src={avatar19} alt='img' />
                              <p>
                                <span>Darlee Robertson</span> logged a call on
                                23 Jul 2023, 10:00 pm
                              </p>
                            </div>
                            <div className='calls-action'>
                              <div className='dropdown call-drop'>
                                <Link
                                  to='#'
                                  className='dropdown-toggle'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  Busy
                                  <i className='las la-angle-down ms-1' />
                                </Link>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <Link className='dropdown-item' to='#'>
                                    Busy
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    No Answer
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Unavailable
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Wrong Number
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Left Voice Message
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className='dropdown'>
                                <Link
                                  to='#'
                                  className='dropdown-toggle'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  <MoreVertical size={15} />
                                </Link>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <Link className='dropdown-item' to='#'>
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            A project review evaluates the success of an
                            initiative and identifies areas for improvement. It
                            can also evaluate a current project to determine
                            whether it's on the right track. Or, it can
                            determine the success of a completed project.{' '}
                          </p>
                        </div>
                        <div className='calls-box'>
                          <div className='caller-info'>
                            <div className='calls-user'>
                              <img src={avatar20} alt='img' />
                              <p>
                                <span>Sharon Roy</span> logged a call on 28 Jul
                                2023, 09:00 pm
                              </p>
                            </div>
                            <div className='calls-action'>
                              <div className='dropdown call-drop'>
                                <Link
                                  to='#'
                                  className='dropdown-toggle bg-light-pending'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  No Answer
                                  <i className='las la-angle-down ms-1' />
                                </Link>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <Link className='dropdown-item' to='#'>
                                    Busy
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    No Answer
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Unavailable
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Wrong Number
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Left Voice Message
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className='dropdown'>
                                <Link
                                  to='#'
                                  className='dropdown-toggle'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  <MoreVertical size={15} />
                                </Link>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <Link className='dropdown-item' to='#'>
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            A project plan typically contains a list of the
                            essential elements of a project, such as
                            stakeholders, scope, timelines, estimated cost and
                            communication methods. The project manager typically
                            lists the information based on the assignment.
                          </p>
                        </div>
                        <div className='calls-box'>
                          <div className='caller-info'>
                            <div className='calls-user'>
                              <img src={avatar21} alt='img' />
                              <p>
                                <span>Vaughan</span> logged a call on 30 Jul
                                2023, 08:00 pm
                              </p>
                            </div>
                            <div className='calls-action'>
                              <div className='dropdown call-drop'>
                                <Link
                                  to='#'
                                  className='dropdown-toggle bg-light-pending'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  No Answer
                                  <i className='las la-angle-down ms-1' />
                                </Link>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <Link className='dropdown-item' to='#'>
                                    Busy
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    No Answer
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Unavailable
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Wrong Number
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Left Voice Message
                                  </Link>
                                  <Link className='dropdown-item' to='#'>
                                    Moving Forward
                                  </Link>
                                </div>
                              </div>
                              <div className='dropdown'>
                                <Link
                                  to='#'
                                  className='dropdown-toggle'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                >
                                  <MoreVertical size={15} />
                                </Link>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <Link className='dropdown-item' to='#'>
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>
                            Projects play a crucial role in the success of
                            organizations, and their importance cannot be
                            overstated. Whether it's launching a new product,
                            improving an existing
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* /Calls */}
                    {/* Files */}
                    <div className='tab-pane fade' id='files'>
                      <div className='view-header'>
                        <h4>Files</h4>
                      </div>
                      <div className='files-activity'>
                        <div className='files-wrap'>
                          <div className='row align-items-center'>
                            <div className='col-md-8'>
                              <div className='file-info'>
                                <h4>Manage Documents</h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                              </div>
                            </div>
                            <div className='col-md-4 text-md-end'>
                              <ul className='file-action'>
                                <li>
                                  <Link
                                    to='#'
                                    className='btn btn-primary'
                                    data-bs-toggle='modal'
                                    data-bs-target='#new_file'
                                  >
                                    Create Document
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='files-wrap'>
                          <div className='row align-items-center'>
                            <div className='col-md-8'>
                              <div className='file-info'>
                                <h4>Collier-Turner Proposal</h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                                <div className='file-user'>
                                  <img src={avatar21} alt='img' />
                                  <div>
                                    <p>
                                      <span>Owner</span> Vaughan
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4 text-md-end'>
                              <ul className='file-action'>
                                <li>
                                  <span className='badge badge-soft-pink'>
                                    Proposal
                                  </span>
                                </li>
                                <li>
                                  <span className='badge badge-soft-grey priority-badge'>
                                    <i className='fa-solid fa-circle' />
                                    Low
                                  </span>
                                </li>
                                <li>
                                  <div className='dropdown action-drop'>
                                    <Link
                                      to='#'
                                      className='dropdown-toggle'
                                      data-bs-toggle='dropdown'
                                      aria-expanded='false'
                                    >
                                      <MoreVertical size={15} />
                                    </Link>
                                    <div className='dropdown-menu dropdown-menu-right'>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-edit me-1' />
                                        Edit
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-trash me-1' />
                                        Delete
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-download me-1' />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='files-wrap'>
                          <div className='row align-items-center'>
                            <div className='col-md-8'>
                              <div className='file-info'>
                                <h4>Collier-Turner Proposal</h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                                <div className='file-user'>
                                  <img src={avatar1} alt='img' />
                                  <div>
                                    <p>
                                      <span>Owner</span> Jessica
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4 text-md-end'>
                              <ul className='file-action'>
                                <li>
                                  <span className='badge badge-soft-info'>
                                    Quote
                                  </span>
                                </li>
                                <li>
                                  <span className='badge badge-soft-success priority-badge'>
                                    <i className='fa-solid fa-circle' />
                                    Sent
                                  </span>
                                </li>
                                <li>
                                  <div className='dropdown action-drop'>
                                    <Link
                                      to='#'
                                      className='dropdown-toggle'
                                      data-bs-toggle='dropdown'
                                      aria-expanded='false'
                                    >
                                      <MoreVertical size={15} />
                                    </Link>
                                    <div className='dropdown-menu dropdown-menu-right'>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-edit me-1' />
                                        Edit
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-trash me-1' />
                                        Delete
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-download me-1' />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='files-wrap'>
                          <div className='row align-items-center'>
                            <div className='col-md-8'>
                              <div className='file-info'>
                                <h4>Collier-Turner Proposal</h4>
                                <p>
                                  Send customizable quotes, proposals and
                                  contracts to close deals faster.
                                </p>
                                <div className='file-user'>
                                  <img src={avatar22} alt='img' />
                                  <div>
                                    <p>
                                      <span>Owner</span> Vaughan
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4 text-md-end'>
                              <ul className='file-action'>
                                <li>
                                  <span className='badge badge-soft-pink'>
                                    Proposal
                                  </span>
                                </li>
                                <li>
                                  <span className='badge badge-soft-grey priority-badge'>
                                    <i className='fa-solid fa-circle' />
                                    Low
                                  </span>
                                </li>
                                <li>
                                  <div className='dropdown action-drop'>
                                    <Link
                                      to='#'
                                      className='dropdown-toggle'
                                      data-bs-toggle='dropdown'
                                      aria-expanded='false'
                                    >
                                      <MoreVertical size={15} />
                                    </Link>
                                    <div className='dropdown-menu dropdown-menu-right'>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-edit me-1' />
                                        Edit
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-trash me-1' />
                                        Delete
                                      </Link>
                                      <Link className='dropdown-item' to='#'>
                                        <i className='las la-download me-1' />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Files */}
                    {/* Email */}
                    <div className='tab-pane fade' id='email'>
                      <div className='view-header'>
                        <h4>Email</h4>
                        <ul>
                          <li>
                            <OverlayTrigger
                              placement='left'
                              overlay={tooltipContent}
                            >
                              <Link to='#' className='com-add create-mail'>
                                <i className='las la-plus-circle me-1' />
                                Create Email
                              </Link>
                            </OverlayTrigger>
                          </li>
                        </ul>
                      </div>
                      <div className='files-activity'>
                        <div className='files-wrap'>
                          <div className='row align-items-center'>
                            <div className='col-md-8'>
                              <div className='file-info'>
                                <h4>Manage Emails</h4>
                                <p>
                                  You can send and reply to emails directly via
                                  this section.
                                </p>
                              </div>
                            </div>
                            <div className='col-md-4 text-md-end'>
                              <ul className='file-action'>
                                <li>
                                  <Link
                                    to='#'
                                    className='btn btn-primary'
                                    data-bs-toggle='modal'
                                    data-bs-target='#create_email'
                                  >
                                    Connect Account
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='files-wrap'>
                          <div className='email-header'>
                            <div className='row'>
                              <div className='col top-action-left'>
                                <div className='float-start d-none d-sm-block'>
                                  <input
                                    type='text'
                                    placeholder='Search Messages'
                                    className='form-control search-message'
                                  />
                                </div>
                              </div>
                              <div className='col-auto top-action-right'>
                                <div className='text-end'>
                                  <button
                                    type='button'
                                    title='Refresh'
                                    data-bs-toggle='tooltip'
                                    className='btn btn-white d-none d-md-inline-block me-1'
                                  >
                                    <i className='fa-solid fa-rotate' />
                                  </button>
                                  <div className='btn-group'>
                                    <Link className='btn btn-white'>
                                      <i className='fa-solid fa-angle-left' />
                                    </Link>
                                    <Link className='btn btn-white'>
                                      <i className='fa-solid fa-angle-right' />
                                    </Link>
                                  </div>
                                </div>
                                <div className='text-end'>
                                  <span className='text-muted d-none d-md-inline-block'>
                                    Showing 10 of 112{' '}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='email-content'>
                            <div className='table-responsive'>
                              <table className='table table-inbox table-hover'>
                                <thead>
                                  <tr>
                                    <th colSpan={6} className='ps-2'>
                                      <input
                                        type='checkbox'
                                        className='checkbox-all'
                                      />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    className='unread clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa fa-star starred ' />
                                      </span>
                                    </td>
                                    <td className='name'>John Doe</td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td>
                                      <i className='fa-solid fa-paperclip' />
                                    </td>
                                    <td className='mail-date'>13:14</td>
                                  </tr>
                                  <tr
                                    className='unread clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>Envato Account</td>
                                    <td className='subject'>
                                      Important account security update from
                                      Envato
                                    </td>
                                    <td />
                                    <td className='mail-date'>8:42</td>
                                  </tr>
                                  <tr
                                    className='clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>Twitter</td>
                                    <td className='subject'>
                                      HRMS Bootstrap Admin Template
                                    </td>
                                    <td />
                                    <td className='mail-date'>30 Nov</td>
                                  </tr>
                                  <tr
                                    className='unread clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>Richard Parker</td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className='mail-date'>18 Sep</td>
                                  </tr>
                                  <tr
                                    className='clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>John Smith</td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className='mail-date'>21 Aug</td>
                                  </tr>
                                  <tr
                                    className='clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>
                                      me, Robert Smith (3)
                                    </td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className='mail-date'>1 Aug</td>
                                  </tr>
                                  <tr
                                    className='unread clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>Codecanyon</td>
                                    <td className='subject'>
                                      Welcome To Codecanyon
                                    </td>
                                    <td />
                                    <td className='mail-date'>Jul 13</td>
                                  </tr>
                                  <tr
                                    className='clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>Richard Miles</td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td>
                                      <i className='fa-solid fa-paperclip' />
                                    </td>
                                    <td className='mail-date'>May 14</td>
                                  </tr>
                                  <tr
                                    className='unread clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa-regular fa-star' />
                                      </span>
                                    </td>
                                    <td className='name'>John Smith</td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className='mail-date'>11/11/16</td>
                                  </tr>
                                  <tr
                                    className='clickable-row'
                                    data-to='/mail-view'
                                  >
                                    <td>
                                      <input
                                        type='checkbox'
                                        className='checkmail'
                                      />
                                    </td>
                                    <td>
                                      <span className='mail-important'>
                                        <i className='fa fa-star starred ' />
                                      </span>
                                    </td>
                                    <td className='name'>Mike Litorus</td>
                                    <td className='subject'>
                                      Lorem ipsum dolor sit amet, consectetuer
                                      adipiscing elit
                                    </td>
                                    <td />
                                    <td className='mail-date'>10/31/16</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Email */}
                    {/* /Quotation */}
                    <div className='tab-pane fade' id='qoute'>
                      <div className='view-header'>
                        <h4>Quotations</h4>
                      </div>
                      <div className='contact-activity'>
                        <ul>
                          <li className='activity-wrap'>
                            <span className='activity-icon bg-pending'>
                              <i className='las la-file-alt' />
                            </span>
                            <div className='activity-info'>
                              <div className='badge-day'>
                                <i className='fa-regular fa-calendar-check' />
                                Created Date:{' '}
                                {new Date(created_at).toLocaleDateString(
                                  'en-GB',
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  }
                                )}
                              </div>
                              <h6>
                                <b>Client Name: </b>
                                {customer_name}
                              </h6>
                              <div className='upcoming-info'>
                                <div className='row'>
                                  <div className='col-sm-4'>
                                    <p>
                                      <b>Payment List</b>
                                    </p>
                                    <div className='dropdown'>
                                      <p>{payment_list}</p>
                                    </div>
                                  </div>
                                  <div className='col-sm-4'>
                                    <p>
                                      <b>PaymentTerm</b>
                                    </p>
                                    <div className='dropdown'>
                                      <p>{payment_duration} Days</p>
                                    </div>
                                  </div>
                                  <div className='col-sm-4'>
                                    <p>
                                      <b>Approved By</b>
                                    </p>
                                    <div className='dropdown'>
                                      <p>
                                        {approved_by_username
                                          ? approved_by_username
                                          : 'N/A'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /Quotation */}
                    {/* /Order */}
                    <div className='tab-pane fade' id='order'>
                      <div className='view-header'>
                        <h4>Orders</h4>
                      </div>
                      <div className='contact-activity'>
                        <ul>
                          {orders.map(order => (
                            <li key={order.id} className='activity-wrap'>
                              <span className='activity-icon bg-pending'>
                                <i className='las la-file-alt' />
                              </span>
                              <div className='activity-info'>
                                <div key={order.id} className='badge-day'>
                                  <i className='fa-regular fa-calendar-check' />
                                  Created Date:{' '}
                                  {new Date(order.created_at).toLocaleString()}
                                </div>
                                <h6>
                                  <b>Order Name:</b> {order.name}
                                </h6>
                                <div className='upcoming-info'>
                                  <div className='row'>
                                    <div className='col-sm-4'>
                                      <p>
                                        <b>UnitPrice</b>
                                      </p>
                                      <div className='dropdown'>
                                        <p>{order.unit_price}</p>
                                      </div>
                                    </div>
                                    <div className='col-sm-4'>
                                      <p>
                                        <b>Quantity</b>
                                      </p>
                                      <div className='dropdown'>
                                        <p>{order.quantity}</p>
                                      </div>
                                    </div>
                                    <div className='col-sm-4'>
                                      <p>
                                        <b>TotalPrice</b>
                                      </p>
                                      <div className='dropdown'>
                                        <p>{order.total_price}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* /Order */}
                  </div>
                </div>
                {/* /Tab Content */}
              </div>
              {/* /Contact Details */}
            </div>
          ) : (
            <p>No lead data available</p>
          )}
        </div>
        <AddContact />
        <AddNotes />
        <AddLeads />
        <Calls />
        <AddFiles />
        <CreateEmail />
        <AddQuotation />
        <AddOrder />
      </div>
      {/* /Page Content */}
    </>
  )
}

export default LeadsDetails
