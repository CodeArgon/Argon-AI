/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar_15,
  Avatar_17,
  avatar22,
  avatar23,
  avatar24,
  avatar25,
  avatar26,
  company_icon_09
} from '../../../Routes/ImagePath'
import Select from 'react-select'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import CrmDeleteModal from '../../../components/modelpopup/Crm/CrmDeleteModal'
import AddLeads from '../../../components/modelpopup/Crm/AddLeads'
import EditLeads from '../../../components/modelpopup/Crm/EditLeads'
import dragula from 'dragula'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BASE_URL } from '../../../constants/urls'

const LeadsKanban = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${BASE_URL}leads/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          const data = await response.json()
          setData(data)
        } else {
          console.error('Failed to fetch leads:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching leads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const [tasks, setTasks] = useState({})
  // eslint-disable-next-line
  const onDragEnd = result => {
    if (!result.destination) {
      return // Dropped outside the list
    }

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      // Reorder tasks in the same list
      const updatedTasks = [...tasks[source.droppableId]]
      const [reorderedTask] = updatedTasks.splice(source.index, 1)
      updatedTasks.splice(destination.index, 0, reorderedTask)

      setTasks({
        ...tasks,
        [source.droppableId]: updatedTasks
      })
    } else {
      // Move task from pending to progress
      const sourceTasks = [...tasks[source.droppableId]]
      const destinationTasks = [...tasks[destination.droppableId]]
      const [movedTask] = sourceTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, movedTask)

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks
      })
    }
  }

  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const toggleFilterVisibility = () => {
    setIsFilterVisible(prevVisibility => !prevVisibility)
  }
  const companyName = [
    { value: '--Select--', label: '--Select--' },
    { value: 'NovaWaveLLC', label: 'NovaWaveLLC' },
    { value: 'SilverHawk', label: 'SilverHawk' },
    { value: 'SummitPeak', label: 'SummitPeak' },
    { value: 'HarborView', label: 'HarborView' },
    { value: 'Redwood Inc', label: 'Redwood Inc' }
  ]
  const status = [
    { value: '--Select--', label: '--Select--' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Not Contacted', label: 'Not Contacted' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Lost', label: 'Lost' }
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
  const initialSettings = {
    endDate: new Date('2020-08-11T12:30:00.000Z'),
    ranges: {
      'Last 30 Days': [
        new Date('2020-07-12T04:57:17.076Z'),
        new Date('2020-08-10T04:57:17.076Z')
      ],
      'Last 7 Days': [
        new Date('2020-08-04T04:57:17.076Z'),
        new Date('2020-08-10T04:57:17.076Z')
      ],
      'Last Month': [
        new Date('2020-06-30T18:30:00.000Z'),
        new Date('2020-07-31T18:29:59.999Z')
      ],
      'This Month': [
        new Date('2020-07-31T18:30:00.000Z'),
        new Date('2020-08-31T18:29:59.999Z')
      ],
      Today: [
        new Date('2020-08-10T04:57:17.076Z'),
        new Date('2020-08-10T04:57:17.076Z')
      ],
      Yesterday: [
        new Date('2020-08-09T04:57:17.076Z'),
        new Date('2020-08-09T04:57:17.076Z')
      ]
    },
    startDate: new Date('2020-08-04T04:57:17.076Z'),
    timePicker: false
  }
  const [inputValue, setInputValue] = useState('')

  const [focused, setFocused] = useState(false)

  const handleLabelClick = () => {
    setFocused(true)
  }
  const handleInputBlur = () => {
    if (inputValue === '') {
      setFocused(false)
    }
  }
  const handleInputChange = e => {
    const value = e.target.value
    setInputValue(value)
    if (value !== '' && !focused) {
      setFocused(true)
    }
  }
  //
  const [inputValue1, setInputValue1] = useState('')

  const [focused1, setFocused1] = useState(false)

  const handleLabelClick1 = () => {
    setFocused1(true)
  }
  const handleInputBlur1 = () => {
    if (inputValue1 === '') {
      setFocused1(false)
    }
  }
  const handleInputChange1 = e => {
    const value = e.target.value
    setInputValue1(value)
    if (value !== '' && !focused1) {
      setFocused1(true)
    }
  }
  //filter

  const leftContainerRef = useRef(null)
  const rightContainerRef = useRef(null)

  useEffect(() => {
    const leftContainer = leftContainerRef.current
    const rightContainer = rightContainerRef.current

    if (leftContainer && rightContainer) {
      dragula([leftContainer, rightContainer])
    }
  }, [])

  const openLeads = data.filter(lead => lead.status === 'open')
  const opportunityLeads = data.filter(lead => lead.status === 'opportunity')
  const winLeads = data.filter(lead => lead.status === 'win')
  const lostLeads = data.filter(lead => lead.status === 'lost')

  return (
    <div>
      {/* Page Wrapper */}
      <div className='page-wrapper'>
        {/* Page Content */}
        <div className='content container-fluid'>
          {/* Page Header */}
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
                  <div className='view-icons'>
                    <Link to='#' className='grid-view btn btn-link'>
                      <i className='las la-redo-alt' />
                    </Link>
                    <Link
                      to='#'
                      className={`list-view btn btn-link ${
                        isFilterVisible ? 'active-filter' : ''
                      }`}
                      id='filter_search'
                      onClick={toggleFilterVisibility}
                    >
                      <i className='las la-filter' />
                    </Link>
                  </div>
                  <div className='form-sort'>
                    <Link
                      to='#'
                      className='list-view btn btn-link'
                      data-bs-toggle='modal'
                      data-bs-target='#export'
                    >
                      <i className='las la-file-export' />
                      Export
                    </Link>
                  </div>
                  <Link
                    to='#'
                    className='btn btn-sm btn-primary add-btn'
                    data-bs-toggle='modal'
                    data-bs-target='#add_leads'
                  >
                    <i className='la la-plus-circle' /> Add Leads
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div
            className={`filter-filelds${isFilterVisible ? ' visible' : ''}`}
            id='filter_inputs'
            style={{ display: isFilterVisible ? 'block' : 'none' }}
          >
            <div className='row filter-row'>
              <div className='col-xl-2'>
                <div
                  className={
                    focused || inputValue !== ''
                      ? 'input-block mb-3 form-focus focused'
                      : 'input-block mb-3 form-focus'
                  }
                >
                  <input
                    type='text'
                    className='form-control floating'
                    value={inputValue}
                    onFocus={handleLabelClick}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                  />
                  <label className='focus-label' onClick={handleLabelClick}>
                    LeadName
                  </label>
                </div>
              </div>
              <div className='col-xl-2'>
                <div
                  className={
                    focused1 || inputValue1 !== ''
                      ? 'input-block mb-3 form-focus focused'
                      : 'input-block mb-3 form-focus'
                  }
                >
                  {' '}
                  <input
                    type='text'
                    className='form-control floating'
                    value={inputValue1}
                    onFocus={handleLabelClick1}
                    onBlur={handleInputBlur1}
                    onChange={handleInputChange1}
                  />
                  <label className='focus-label' onClick={handleLabelClick1}>
                    Email
                  </label>
                </div>
              </div>
              <div className='col-xl-2'>
                <div className='input-block mb-3 form-focus focused'>
                  <DateRangePicker initialSettings={initialSettings}>
                    <input
                      className='form-control  date-range bookingrange'
                      type='text'
                    />
                  </DateRangePicker>
                  <label className='focus-label'>From - To Date</label>
                </div>
              </div>
              <div className='col-xl-2'>
                <div className='input-block mb-3 form-focus select-focus'>
                  <Select
                    options={status}
                    placeholder='Select'
                    styles={customStyles}
                  />
                  <label className='focus-label'>Lead Status</label>
                </div>
              </div>
              <div className='col-xl-2'>
                <div className='input-block mb-3 form-focus select-focus'>
                  <Select
                    options={companyName}
                    placeholder='Select'
                    styles={customStyles}
                  />
                  <label className='focus-label'>Company Name</label>
                </div>
              </div>
              <div className='col-xl-2'>
                <Link to='#' className='btn btn-success w-100'>
                  {' '}
                  Search{' '}
                </Link>
              </div>
            </div>
          </div>
          <hr />
          {/* /Search Filter */}
          <div className='filter-section'>
            <ul>
              <li>
                <div className='view-icons'>
                  <Link
                    to='/leads-list'
                    className='list-view btn btn-link active'
                  >
                    <i className='las la-list' />
                  </Link>
                  <Link to='/leads-kanban' className='grid-view btn btn-link'>
                    <i className='las la-th' />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <br />
          <div className='row'>
            <div className='col-md-24' id='draggable-left'>
              <div className='kanban-wrapper leads-kanban-wrapper'>
                <DragDropContext onDragEnd={onDragEnd}>
                  <div className='kanban-list-items'>
                    <div className='kanban-list-head'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='kanban-title-head dot-purple'>
                          <h5>Open</h5>
                          <span>{openLeads.length} Leads</span>
                        </div>
                        {/* <div className='dropdown dropdown-action'>
                          <Link
                            to='#'
                            className='action-icon dropdown-toggle'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                          >
                            <i className='material-icons'>more_vert</i>
                          </Link>
                          <div className='dropdown-menu dropdown-menu-right'>
                            <Link
                              className='dropdown-item'
                              to='#'
                              data-bs-toggle='modal'
                              data-bs-target='#edit_leads'
                            >
                              <i className='fa-solid fa-pencil m-r-5' /> Edit
                            </Link>
                            <Link
                              className='dropdown-item'
                              to='#'
                              data-bs-toggle='modal'
                              data-bs-target='#delete_leads'
                            >
                              <i className='fa-regular fa-trash-can m-r-5' />{' '}
                              Delete
                            </Link>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <Droppable droppableId='open' direction='vertical'>
                      {provided => (
                        <ul
                          className='kanban-drag-wrap'
                          ref={provided.innerRef}
                        >
                          {openLeads.map((lead, index) => (
                            <Draggable
                              key={lead.name}
                              draggableId={lead.name}
                              index={index}
                            >
                              {provided => (
                                <li
                                  className='card panel kanban-box'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className='kanban-card'>
                                    <div className='kanban-card-head'>
                                      <span className='bar-design bg-purple' />
                                      <div className='kanban-card-title'>
                                        <span>
                                          {lead.name.slice(0, 2).toUpperCase()}
                                        </span>
                                        <h6>{lead.name}</h6>
                                      </div>
                                    </div>
                                    <div className='kanban-card-body'>
                                      <ul>
                                        <li>
                                          <span className='other-title'>
                                            <b>Lead Owner:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.lead_gen_manager}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Client Name:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.gora}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Assigned to:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.assigned_to}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Medium:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.medium}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Created Date:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.created_date}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {/* {provided.placeholder} */}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                  <div className='kanban-list-items'>
                    <div className='kanban-list-head'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='kanban-title-head dot-warning'>
                          <h5>Opportunity</h5>
                          <span>{opportunityLeads.length} Leads</span>
                        </div>
                        {/* <div className='kanban-action-btns d-flex align-items-center'>
                          <Link to='#' className='plus-btn'>
                            <i className='la la-plus' />
                          </Link>
                          <div className='dropdown dropdown-action'>
                            <Link
                              to='#'
                              className='action-icon dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='material-icons'>more_vert</i>
                            </Link>
                            <div className='dropdown-menu dropdown-menu-right'>
                              <Link
                                className='dropdown-item'
                                to='#'
                                data-bs-toggle='modal'
                                data-bs-target='#edit_leads'
                              >
                                <i className='fa-solid fa-pencil m-r-5' /> Edit
                              </Link>
                              <Link
                                className='dropdown-item'
                                to='#'
                                data-bs-toggle='modal'
                                data-bs-target='#delete_leads'
                              >
                                <i className='fa-regular fa-trash-can m-r-5' />{' '}
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <Droppable droppableId='opportunity' direction='vertical'>
                      {provided => (
                        <ul
                          className='kanban-drag-wrap'
                          ref={provided.innerRef}
                        >
                          {opportunityLeads.map((lead, index) => (
                            <Draggable
                              key={lead.name}
                              draggableId={lead.name}
                              index={index}
                            >
                              {provided => (
                                <li
                                  className='card panel kanban-box'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className='kanban-card'>
                                    <div className='kanban-card-head'>
                                      <span className='bar-design bg-warning' />
                                      <div className='kanban-card-title'>
                                        <span>
                                          {lead.name.slice(0, 2).toUpperCase()}
                                        </span>
                                        <h6>{lead.name}</h6>
                                      </div>
                                    </div>
                                    <div className='kanban-card-body'>
                                      <ul>
                                        <li>
                                          <span className='other-title'>
                                            <b>Lead Owner:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.lead_gen_manager}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Client Name:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.gora}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Assigned to:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.assigned_to}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Medium:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.medium}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Created Date:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.created_date}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                  <div className='kanban-list-items'>
                    <div className='kanban-list-head'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='kanban-title-head dot-success'>
                          <h5>Win</h5>
                          <span>{winLeads.length} Leads</span>
                        </div>
                        {/* <div className='kanban-action-btns d-flex align-items-center'>
                          <div className='dropdown dropdown-action'>
                            <Link
                              to='#'
                              className='action-icon dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='material-icons'>more_vert</i>
                            </Link>
                            <div className='dropdown-menu dropdown-menu-right'>
                              <Link
                                className='dropdown-item'
                                to='#'
                                data-bs-toggle='modal'
                                data-bs-target='#edit_leads'
                              >
                                <i className='fa-solid fa-pencil m-r-5' /> Edit
                              </Link>
                              <Link
                                className='dropdown-item'
                                to='#'
                                data-bs-toggle='modal'
                                data-bs-target='#delete_leads'
                              >
                                <i className='fa-regular fa-trash-can m-r-5' />{' '}
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <Droppable droppableId='win' direction='vertical'>
                      {provided => (
                        <ul
                          className='kanban-drag-wrap'
                          ref={provided.innerRef}
                        >
                          {winLeads.map((lead, index) => (
                            <Draggable
                              key={lead.id}
                              draggableId={lead.id}
                              index={index}
                            >
                              {provided => (
                                <li
                                  className='card panel kanban-box'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className='kanban-card'>
                                    <div className='kanban-card-head'>
                                      <span className='bar-design bg-success' />
                                      <div className='kanban-card-title'>
                                        <span>
                                          {lead.name.slice(0, 2).toUpperCase()}
                                        </span>
                                        <h6>{lead.name}</h6>
                                      </div>
                                    </div>
                                    <div className='kanban-card-body'>
                                      <ul>
                                        <li>
                                          <span className='other-title'>
                                            <b>Lead Owner:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.lead_gen_manager}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Client Name:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.gora}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Assigned to:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.assigned_to}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Medium:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.medium}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Created Date:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.created_date}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                  <div className='kanban-list-items'>
                    <div className='kanban-list-head'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div className='kanban-title-head dot-danger'>
                          <h5>Lost</h5>
                          <span>{lostLeads.length} Leads</span>
                        </div>
                        {/* <div className='kanban-action-btns d-flex align-items-center'>
                          <div className='dropdown dropdown-action'>
                            <Link
                              to='#'
                              className='action-icon dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='material-icons'>more_vert</i>
                            </Link>
                            <div className='dropdown-menu dropdown-menu-right'>
                              <Link
                                className='dropdown-item'
                                to='#'
                                data-bs-toggle='modal'
                                data-bs-target='#edit_leads'
                              >
                                <i className='fa-solid fa-pencil m-r-5' /> Edit
                              </Link>
                              <Link
                                className='dropdown-item'
                                to='#'
                                data-bs-toggle='modal'
                                data-bs-target='#delete_leads'
                              >
                                <i className='fa-regular fa-trash-can m-r-5' />{' '}
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <Droppable droppableId='lost' direction='vertical'>
                      {provided => (
                        <ul
                          className='kanban-drag-wrap'
                          ref={provided.innerRef}
                        >
                          {lostLeads.map((lead, index) => (
                            <Draggable
                              key={lead.id}
                              draggableId={lead.id}
                              index={index}
                            >
                              {provided => (
                                <li
                                  className='card panel kanban-box'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className='kanban-card'>
                                    <div className='kanban-card-head'>
                                      <span className='bar-design bg-danger' />
                                      <div className='kanban-card-title'>
                                        <span>
                                          {lead.name.slice(0, 2).toUpperCase()}
                                        </span>
                                        <h6>{lead.name}</h6>
                                      </div>
                                    </div>
                                    <div className='kanban-card-body'>
                                      <ul>
                                        <li>
                                          <span className='other-title'>
                                            <b>Lead Owner:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.lead_gen_manager}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Client Name:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.gora}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Assigned to:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.assigned_to}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Medium:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.medium}
                                          </span>
                                        </li>
                                        <li>
                                          <span className='other-title'>
                                            <b>Created Date:</b>
                                          </span>
                                          <span style={{ marginLeft: '8px' }}>
                                            {lead.created_date}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
        <AddLeads />
        <EditLeads />
        <CrmDeleteModal />
      </div>
      {/* /Page Content */}
    </div>
  )
}

export default LeadsKanban
