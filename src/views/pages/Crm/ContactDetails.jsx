import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag, Mail, Home, Phone, MoreVertical } from 'react-feather'
import { avatar19 } from '../../../Routes/ImagePath'
import { useLocation } from 'react-router-dom'
import AddNotes from '../../../components/modelpopup/Crm/AddNotes'
import Calls from '../../../components/modelpopup/Crm/Calls'
import AddFiles from '../../../components/modelpopup/Crm/AddFiles'
import CreateEmail from '../../../components/modelpopup/Crm/CreateEmail'
import SendMail from '../../../components/modelpopup/Crm/SendMail'
import AddDealsContactDetail from '../../../components/modelpopup/Crm/AddDealsContactDetail'
import AddCompany from '../../../components/modelpopup/Crm/AddCompany'
import EditContact from '../../../components/modelpopup/Crm/EditContact'
import DeleteContactDetails from '../../../components/modelpopup/Crm/DeleteContactDetails'
import { BASE_URL } from '../../../constants/urls'

const ContactDetails = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const contactId = queryParams.get('contacts')
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    if (contactId) {
      fetch(`${BASE_URL}contact/${contactId}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch contact details')
          }
          return response.json()
        })
        .then(data => {
          setContact(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching contact details:', error)
          setLoading(false)
        })
    }
  }, [contactId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!contact) {
    return <div>No contact details available.</div>
  }

  return (
    <div>
      <div className='page-wrapper'>
        <div className='content container-fluid'>
          <div className='page-header'>
            <div className='row align-items-center'>
              <div className='col-md-4'>
                <h3 className='page-title'>Contact</h3>
                <ul className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link to='/admin-dashboard'>Dashboard</Link>
                  </li>
                  <li className='breadcrumb-item active'>Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-md-12'>
              <div className='contact-head'>
                <div className='row align-items-center'>
                  <div className='col-sm-6'>
                    <ul className='contact-breadcrumb'>
                      <li>
                        <Link to='/contact-list'>
                          <i className='las la-arrow-left' /> Contacts
                        </Link>
                      </li>
                      <li>{contactId}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3'>
              <div className='stickybar'>
                <div className='card contact-sidebar'>
                  <h5>
                    {contact.first_name} {contact.last_name}
                  </h5>
                  <ul className='basic-info'>
                    <li>
                      <span>
                        <Mail size={15} />
                      </span>
                      <p>{contact.email || 'N/A'}</p>
                    </li>
                    <li>
                      <span>
                        <Phone size={15} />
                      </span>
                      <p>{contact.phone_number || 'N/A'}</p>
                    </li>
                    <li>
                      <span>
                        <Home size={15} />
                      </span>
                      <p>{contact.company || 'N/A'}</p>
                    </li>
                    <li>
                      <span>
                        <Tag size={15} />
                      </span>
                      <p>{contact.title || 'N/A'}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-xl-9'>
              <div className='contact-tab-wrap'>
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
                </ul>
              </div>
              {/* Tab Content */}
              <div className='contact-tab-view'>
                <div className='tab-content pt-0'>
                  {/* Activities */}
                  <div className='tab-pane active show' id='activities'>
                    <div className='view-header'>
                      <h4>Activities</h4>
                    </div>
                    <div className='contact-activity'>
                      <div className='badge-day'>
                        <i className='fa-regular fa-calendar-check' />
                        15 Feb 2024
                      </div>
                      <ul>
                        <li className='activity-wrap'>
                          <span className='activity-icon bg-info'>
                            <i className='las la-comment-alt' />
                          </span>
                          <div className='activity-info'>
                            <h6>You sent 1 Message to the contact.</h6>
                            <p>10:25 pm</p>
                          </div>
                        </li>
                        <li className='activity-wrap'>
                          <span className='activity-icon bg-success'>
                            <i className='las la-phone' />
                          </span>
                          <div className='activity-info'>
                            <h6>
                              Denwar responded to your appointment schedule
                              question by call at 09:30pm.
                            </h6>
                            <p>09:25 pm</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Activities */}
                  {/* Notes */}
                  <div className='tab-pane fade' id='notes'>
                    <div className='view-header'>
                      <h4>Notes</h4>
                    </div>
                    <div className='notes-activity'>
                      <div className='calls-box'>
                        <div className='caller-info'>
                          <div className='calls-user'>
                            <img src={avatar19} alt='img' />
                            <div>
                              <h6>Darlee Robertson</h6>
                              <p>15 Sep 2023, 12:10 pm</p>
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
                      </div>
                    </div>
                  </div>
                  {/* /Notes */}
                </div>
              </div>
              {/* /Tab Content */}
            </div>
          </div>
        </div>
        <AddNotes />
        <Calls />
        <AddFiles />
        <CreateEmail />
        <SendMail />
        <AddDealsContactDetail />
        <EditContact />
        <DeleteContactDetails />
        <AddCompany />
      </div>
    </div>
  )
}

export default ContactDetails
