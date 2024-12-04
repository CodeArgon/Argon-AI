import React, { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Mail, Key, Link2 } from 'react-feather'
import {
  Avatar_05,
  Avatar_10,
  Avatar_16
} from '../../../../../Routes/ImagePath'
import Select from 'react-select'
import DefaultEditor from 'react-simple-wysiwyg'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../../../../../constants/urls'
import Swal from 'sweetalert2'
const ProjectDetails = () => {
  const companies = useMemo(
    () => [
      { value: 1, label: 'Fintech' },
      { value: 2, label: 'Block chain' },
      { value: 3, label: 'Real Estate' },
      { value: 4, label: 'Game' },
      { value: 5, label: 'Education' },
      { value: 6, label: 'Logistics and Transportation' },
      { value: 7, label: 'Health care and Wellness' },
      { value: 8, label: 'Retail and Distribution' },
      { value: 9, label: 'E-Commerce' },
      { value: 10, label: 'Saas' },
      { value: 11, label: 'Manufacturing' },
      { value: 12, label: 'Automotive' },
      { value: 13, label: 'Entertainment' },
      { value: 14, label: 'Social Networking' },
      { value: 15, label: 'Other' }
    ],
    []
  )

  const navigate = useNavigate()
  const location = useLocation()
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [projectDuration, setProjectDuration] = useState('')
  const [rating, setRating] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [liveLink, setLiveLink] = useState('')
  const [figmaLink, setFigmaLink] = useState('')
  const [serverLink, setServerLink] = useState('')
  const [serverLoginEmail, setServerLoginEmail] = useState('')
  const [serverLoginPassword, setServerLoginPassword] = useState('')
  const [teamLeader, setTeamLeader] = useState()
  const [teamMembers, setTeamMembers] = useState()
  const [description, setDescription] = useState('here is a test project')
  const [platforms, setPlatforms] = useState()
  const [techStack, setTechStack] = useState()
  const [industry, setIndustry] = useState()
  const [logo, setLogo] = useState(null)
  const [documents, setDocuments] = useState([])
  const [teamMemberOptions, setTeamMemberOptions] = useState([])
  const [teamLeaderOptions, setTeamLeaderOptions] = useState([])
  const [techStackOptions, setTechStackOptions] = useState([])
  const [stacks, setStacks] = useState()
  const [formErrors, setFormErrors] = useState({})
  const [platformOptions, setPlatformOptions] = useState([])
  const [team, setTeam] = useState()
  const [loading, setLoading] = useState(false)
  const [dd, setDD] = useState([])

  const initialProject =
    location.state?.project ||
    JSON.parse(localStorage.getItem('projectData')) ||
    {}

  const [project, setProject] = useState(() => initialProject)

  useEffect(() => {
    localStorage.setItem('projectData', JSON.stringify(project))
  }, [location.state, project])

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(`${BASE_URL}platforms/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        const data = await response.json()

        const options = data.map(platform => ({
          value: platform.id,
          label: platform.name
        }))

        setPlatformOptions(options)
      } catch (error) {
        console.error('Error fetching platforms:', error)
      }
    }

    fetchPlatforms()
  }, [])

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const authToken = localStorage.getItem('BearerToken')
      try {
        const response = await fetch(`${BASE_URL}users/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        const data = await response.json()
        const options = data.map(user => ({
          value: user.id,
          label: user.username
        }))
        setTeamMemberOptions(options)
        setTeamLeaderOptions(options)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchTeamMembers()
  }, [])

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    const fetchTechStacks = async () => {
      try {
        const response = await fetch(`${BASE_URL}techstacks/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        const data = await response.json()

        const options = data.map(stack => ({
          value: stack.id,
          label: stack.name
        }))

        setTechStackOptions(options)
      } catch (error) {
        console.error('Error fetching tech stacks:', error)
      }
    }

    fetchTechStacks()
  }, [])

  useEffect(() => {
    try {
      const tech_stack = techStackOptions
        .filter(option => project.tech_stack.includes(option.value))
        .map(option => option.label)
      setStacks(tech_stack)

      setTeam(
        teamLeaderOptions
          .filter(option => project.development_team.includes(option.value))
          .map(option => option.label)
      )
    } catch {
      console.log('not edit')
    }
  }, [project, techStackOptions, teamLeaderOptions])

  useEffect(() => {
    try {
      const selected = platformOptions.filter(option =>
        project.platform.includes(option.value)
      )
      const tech_selected = techStackOptions.filter(option =>
        project.tech_stack.includes(option.value)
      )
      const dev_team = teamMemberOptions.filter(option =>
        project.development_team.includes(option.value)
      )

      const person = teamMemberOptions.filter(
        option => option.label === project.responsible_person
      )

      const ind = companies.find(
        company =>
          company.label.toLowerCase() === project.industry.toLowerCase()
      )
      setProjectName(project.name)
      if (project.client_name == '') {
        setClientName('N/A')
      } else {
        setClientName(project.client_name)
      }
      setGithubLink(project.git_link)
      setLiveLink(project.live_link)
      setFigmaLink(project.figma_link)
      if (project.server_email == '') {
        setServerLoginEmail('N/A')
      } else {
        setServerLoginEmail(project.server_email)
      }

      if (project.server_password == '') {
        setServerLoginPassword('N/A')
      } else {
        setServerLoginPassword(project.server_password)
      }
      if (project.server_link == '') {
        setServerLink('N/A')
      } else {
        setServerLink(project.server_link)
      }
      setTeamLeader(person)
      setTeamMembers(dev_team)
      setDescription(project.description)
      setPlatforms(selected)
      setTechStack(tech_selected)
      setIndustry(ind)
      setDocuments(project.documents)
      setLogo(project.logo_icon)
      if (project.project_duration == '') {
        setProjectDuration('N/A')
      } else {
        setProjectDuration(project.project_duration)
      }

      setRating(parseInt(project.rating))
      setProject({
        ...project
      })
    } catch {
      console.log('not edit')
    }
  }, [teamMemberOptions, companies, platformOptions, techStackOptions])

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

  const handleDelete = async () => {
    const authToken = localStorage.getItem('BearerToken')
    try {
      const response = await axios.delete(
        `${BASE_URL}projects/${project.id}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      console.log('Project deleted successfully', response)
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]')
      if (modalElement) {
        modalElement.click()
      }
      navigate('/file-manager')
      window.location.reload()
    } catch (error) {
      console.error('There was an error deleting the project!', error)
    }
  }

  const handleEditFormSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const authToken = localStorage.getItem('BearerToken')

    const formData = new FormData()
    formData.append('name', projectName)
    formData.append('description', description)
    if (clientName != 'N/A') {
      formData.append('client_name', clientName)
    }

    if (!Number.isNaN(rating)) {
      formData.append('rating', rating)
    }
    formData.append('project_duration', projectDuration)
    documents.forEach((file, index) => {
      if (typeof file.file == 'undefined') {
        formData.append('project_documents', file)
      }
    })

    console.log(formData.getAll('project_documents'))
    formData.append('git_link', githubLink)
    formData.append('live_link', liveLink)
    formData.append('figma_link', figmaLink)
    if (serverLink != 'N/A') {
      formData.append('server_link', serverLink)
    }
    formData.append('industry', industry.label)
    if (typeof logo != 'string') {
      formData.append('logo_icon', logo)
    }
    if (serverLoginEmail != 'N/A') {
      formData.append('server_email', serverLoginEmail)
    }
    if (serverLoginPassword != 'N/A') {
      formData.append('server_password', serverLoginPassword)
    }
    if (!teamLeader.length === 0) {
      formData.append(
        'responsible_person',
        teamLeader[0]?.value || teamLeader[0]
      )
      teamMembers.forEach((member, index) => {
        formData.append('development_team', parseInt(member.value, 10))
      })
    }

    techStack.forEach((tech, index) => {
      formData.append('tech_stack', parseInt(tech.value, 10))
    })

    platforms.forEach((platform, index) => {
      formData.append('platform', parseInt(platform.value, 10))
    })

    try {
      const response = await fetch(`${BASE_URL}projects/${project.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: formData
      })

      if (response.ok) {
        for (const id of dd) {
          const response = await fetch(`${BASE_URL}documents/${id}/`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authToken}`
            },
            body: formData
          })
        }
        Swal.fire('Project updated successfully!')
        navigate('/file-manager')
        const modalElement = document.querySelector('[data-bs-dismiss="modal"]')
        if (modalElement) {
          modalElement.click()
        }
      } else {
        const errorData = await response.json()
        console.error('Error updating project:', errorData)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentChange = e => {
    const selectedFiles = Array.from(e.target.files)

    if (selectedFiles.length > 0) {
      const newFiles = selectedFiles.filter(
        file => !documents.some(doc => doc.name === file.name)
      )
      setDocuments(prevDocs => [...prevDocs, ...newFiles])
      setFormErrors({ ...formErrors, documents: '' })
    } else {
      setFormErrors({
        ...formErrors,
        documents: 'Document upload is required'
      })
    }
  }

  const removeDocument = indexToRemove => {
    setDD(prevDD => [...prevDD, documents[indexToRemove].id])

    console.log('Index to remove:', indexToRemove)
    setDocuments(prevDocs => {
      console.log('Previous documents:', prevDocs)
      return prevDocs.filter((_, index) => index !== indexToRemove)
    })
  }

  const handleLogo = e => {
    const file = e.target.files[0]
    setLogo(file)
  }

  const handleOpenInNewTab = fileURL => {
    window.open(fileURL, '_blank', 'noopener,noreferrer')
  }

  function stripHtmlTags (str) {
    if (!str) return ''
    return str.replace(/<[^>]*>?/gm, '')
  }

  return (
    <>
      <div>
        <div className='page-wrapper'>
          <div className='content container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='contact-head'>
                  <div className='row align-items-center'>
                    <div className='col'>
                      <ul className='contact-breadcrumb'>
                        <li>
                          <Link to='/file-manager'>
                            <i className='las la-arrow-left' />
                            File Manager
                          </Link>
                        </li>
                        <li>{project?.name || ''}</li>

                        <Link
                          to='#'
                          className='action-icon '
                          style={{
                            marginLeft: '80%'
                          }}
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <i className='material-icons '>more_vert</i>
                        </Link>
                        <div className='dropdown-menu dropdown-menu-right '>
                          <Link
                            className='dropdown-item'
                            to='#'
                            data-bs-toggle='modal'
                            data-bs-target='#edit_project'
                          >
                            <i className='fa fa-pencil m-r-5' /> Edit
                          </Link>
                          <Link
                            className='dropdown-item'
                            to='#'
                            data-bs-toggle='modal'
                            data-bs-backdrop='static'
                            data-bs-target='#delete'
                          >
                            <i className='fa fa-trash m-r-5' /> Delete
                          </Link>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='contact-wrap'>
                  <div className='contact-profile'>
                    <div className='avatar avatar-xxl'>
                      <img
                        src={project?.logo_icon || ''}
                        alt='Project Logo'
                        style={{
                          height: '100px',
                          objectFit: 'fill',
                          borderRadius: '10px'
                        }}
                      />
                      <span className='status online' />
                    </div>
                    <div className='name-user'>
                      <h4>{project?.name || ''}</h4>
                      <p>{clientName || ''}</p>
                      <div className='badge-rate'>
                        <span className='badge badge-light'>
                          {project?.industry || ''}
                        </span>
                        <p>
                          <i className='fa-solid fa-star' />
                          {project?.rating || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='contacts-action'>
                    <ul className='social-info'>
                      <li>
                        {project?.git_link ? (
                          <Link
                            to={project.git_link}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <i className='fa-brands fa-github' />
                          </Link>
                        ) : (
                          <Link
                            className='fa-brands fa-github'
                            style={{ cursor: 'not-allowed' }}
                          ></Link>
                        )}
                      </li>

                      {'    '}
                      <li>
                        {project?.figma_link ? (
                          <Link
                            to={project.figma_link}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <i className='fa-brands fa-figma' />
                          </Link>
                        ) : (
                          <Link
                            className='fa-brands fa-figma'
                            style={{ cursor: 'not-allowed' }}
                          >
                            {' '}
                          </Link>
                        )}
                      </li>

                      {'    '}
                      <li>
                        {project?.live_link ? (
                          <Link
                            to={project.live_link}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <i className='fa-brands fa-chrome' />
                          </Link>
                        ) : (
                          <Link
                            className='fa-brands fa-chrome'
                            style={{ cursor: 'not-allowed' }}
                          >
                            {' '}
                          </Link>
                        )}
                      </li>

                      {'    '}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-xl-3'>
                <div className='stickybar'>
                  <div className='card contact-sidebar'>
                    <h5>Project Information</h5>
                    <ul className='other-info'>
                      <li>
                        <span className='other-title'>Tech Stack:</span>
                        <span>
                          {stacks?.join(', ') || 'No tech stack available'}
                        </span>
                      </li>
                      <li>
                        <span className='other-title'>Platform:</span>
                        <span>{project?.platforms || ''}</span>
                      </li>
                      <li>
                        <span className='other-title'>Project Duration:</span>
                        <span>{projectDuration || ''}</span>
                      </li>
                      <li>
                        <span className='other-title'>Team Lead:</span>
                        <ul className='team-members'>
                          <li>
                            <Link
                              to='#'
                              data-bs-toggle='tooltip'
                              title='Jeffery Lalor'
                              style={{ pointerEvents: 'none' }}
                            >
                              <img alt='' src={Avatar_16} />
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className='other-title'>Team Members:</span>
                        <ul className='team-members'>
                          <li>
                            <Link
                              //to="#"
                              data-bs-toggle='tooltip'
                              title='John Smith'
                              style={{ pointerEvents: 'none' }}
                            >
                              <img alt='' src={Avatar_10} />
                            </Link>
                          </li>
                          <li>
                            <Link
                              //to="#"
                              data-bs-toggle='tooltip'
                              title='Mike Litorus'
                              style={{ pointerEvents: 'none' }}
                            >
                              <img alt='' src={Avatar_05} />
                            </Link>
                          </li>
                          <li className='dropdown avatar-dropdown'>
                            <Link
                              // to="#"
                              className='all-users dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                              style={{ pointerEvents: 'none' }}
                            >
                              +15
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <h5>Server Information</h5>
                    <ul className='basic-info'>
                      <li>
                        <span>
                          <Mail size={15} />
                        </span>
                        <p
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '150px',
                            cursor: 'pointer'
                          }}
                          title={serverLoginEmail}
                        >
                          {serverLoginEmail && serverLoginEmail.length > 30
                            ? `${serverLoginEmail.slice(0, 30)}...`
                            : serverLoginEmail || ''}
                        </p>
                      </li>

                      <li>
                        <span>
                          <Key size={15} />
                        </span>
                        <p>{serverLoginPassword || ''}</p>
                      </li>
                      <li>
                        <span>
                          <Link2 size={15} />
                        </span>
                        <a
                          //href={project?.server_link || ""}
                          target='_blank'
                          rel='noopener noreferrer'
                          style={{ cursor: 'pointer' }}
                        >
                          {serverLink || ''}
                        </a>
                      </li>
                    </ul>

                    <ul className='other-info'>
                      {project?.documents && project?.documents.length > 0 ? (
                        project?.documents.map((document, index) => (
                          <li key={index}>
                            <div className='d-flex align-items-center'>
                              <span className='file-icon'>
                                <i className='la la-file-alt' />
                              </span>
                              <p>{document.name}</p>
                            </div>
                            <div className='file-download'>
                              <Link
                                onClick={() =>
                                  handleOpenInNewTab(document.file)
                                }
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
                  </div>
                </div>
              </div>
              <div className='col-xl-9'>
                <div className='contact-tab-view'>
                  <div className='tab-content pt-0'>
                    <div className='tab-pane active show' id='activities'>
                      <div className='contact-activity'>
                        <ul>
                          <li className='activity-wrap'>
                            <span className='activity-icon bg-warning'>
                              <i className='las la-file-alt' />
                            </span>
                            <div className='activity-info'>
                              <h4>Description</h4>
                              <p>
                                {project?.description
                                  ? stripHtmlTags(project.description)
                                  : ''}
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id='edit_project' className='modal custom-modal fade' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Edit Project</h5>
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
              <form onSubmit={handleEditFormSubmit}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Project Name<span style={{ color: 'red' }}> *</span>
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={projectName}
                        onChange={e => {
                          setProjectName(e.target.value)
                          setFormErrors({
                            ...formErrors,
                            projectName:
                              e.target.value === ''
                                ? 'Project Name is required'
                                : ''
                          })
                        }}
                        required
                      />
                      {formErrors.projectName && (
                        <span className='text-danger'>
                          {formErrors.projectName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Client Name</label>
                      <input
                        className='form-control'
                        type='text'
                        value={clientName}
                        onChange={e => {
                          setClientName(e.target.value)
                        }}
                      />
                      {formErrors.clientName && (
                        <span className='text-danger'>
                          {formErrors.clientName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Project Duration</label>
                      <input
                        className='form-control'
                        type='text'
                        value={projectDuration}
                        onChange={e => {
                          setProjectDuration(e.target.value)
                        }}
                      />
                      {formErrors.projectDuration && (
                        <span className='text-danger'>
                          {formErrors.projectDuration}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Platform<span style={{ color: 'red' }}> *</span>
                      </label>
                      <Select
                        options={platformOptions}
                        placeholder='Select'
                        styles={customStyles}
                        value={platforms}
                        onChange={selectedOption => {
                          setPlatforms(selectedOption)
                          setFormErrors({
                            ...formErrors,
                            platforms:
                              selectedOption && selectedOption.length > 0
                                ? ''
                                : 'Platform selection is required'
                          })
                        }}
                        isMulti
                        required
                      />
                      {formErrors.platforms && (
                        <span className='text-danger'>
                          {formErrors.platforms}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>GitHub Link</label>
                      <input
                        className='form-control'
                        type='text'
                        value={githubLink}
                        onChange={e => {
                          setGithubLink(e.target.value)
                        }}
                      />
                      {formErrors.githubLink && (
                        <span className='text-danger'>
                          {formErrors.githubLink}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Figma Link</label>
                      <input
                        className='form-control'
                        type='text'
                        value={figmaLink}
                        onChange={e => {
                          setFigmaLink(e.target.value)
                        }}
                      />
                      {formErrors.figmaLink && (
                        <span className='text-danger'>
                          {formErrors.figmaLink}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Live Link</label>
                      <input
                        className='form-control'
                        type='text'
                        value={liveLink}
                        onChange={e => {
                          setLiveLink(e.target.value)
                        }}
                      />
                      {formErrors.liveLink && (
                        <span className='text-danger'>
                          {formErrors.liveLink}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Server Link</label>
                      <input
                        className='form-control'
                        type='text'
                        value={serverLink}
                        onChange={e => {
                          setServerLink(e.target.value)
                        }}
                      />
                      {formErrors.serverLink && (
                        <span className='text-danger'>
                          {formErrors.serverLink}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Tech Stack<span style={{ color: 'red' }}> *</span>
                      </label>
                      <Select
                        options={techStackOptions}
                        placeholder='Select'
                        styles={customStyles}
                        value={techStack}
                        onChange={selectedOption => {
                          setTechStack(selectedOption)
                          setFormErrors({
                            ...formErrors,
                            techStack: selectedOption
                              ? ''
                              : 'Tech stack selection is required'
                          })
                        }}
                        isMulti
                        required
                      />
                      {formErrors.techStack && (
                        <span className='text-danger'>
                          {formErrors.techStack}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Industry<span style={{ color: 'red' }}> *</span>
                      </label>
                      <Select
                        options={companies}
                        placeholder='Select'
                        styles={customStyles}
                        value={industry}
                        onChange={selectedOption => {
                          setIndustry(selectedOption)
                          setFormErrors({
                            ...formErrors,
                            industry: selectedOption
                              ? ''
                              : 'Industry selection is required'
                          })
                        }}
                        required
                      />
                      {formErrors.industry && (
                        <span className='text-danger'>
                          {formErrors.industry}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Server Login Email
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={serverLoginEmail}
                        onChange={e => {
                          const value = e.target.value
                          setServerLoginEmail(value)

                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                          const isValidEmail =
                            emailRegex.test(value) || value === 'N/A'
                          setServerLoginEmail(e.target.value)
                          setFormErrors({
                            ...formErrors,
                            serverLoginEmail: !isValidEmail
                              ? "Enter a valid email or 'N/A'"
                              : ''
                          })
                        }}
                      />
                      {formErrors.serverLoginEmail && (
                        <span className='text-danger'>
                          {formErrors.serverLoginEmail}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Server Login Password
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={serverLoginPassword}
                        onChange={e => {
                          setServerLoginPassword(e.target.value)
                        }}
                      />
                      {formErrors.serverLoginPassword && (
                        <span className='text-danger'>
                          {formErrors.serverLoginPassword}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Add Project Leader
                      </label>
                      <Select
                        options={teamLeaderOptions}
                        placeholder='Select'
                        styles={customStyles}
                        value={teamLeader}
                        onChange={selectedOption => {
                          setTeamLeader(selectedOption)
                        }}
                      />
                      {formErrors.projectLeader && (
                        <span className='text-danger'>
                          {formErrors.projectLeader}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Add Team Members</label>
                      <Select
                        options={teamMemberOptions}
                        placeholder='Select'
                        styles={customStyles}
                        value={teamMembers}
                        onChange={selectedOption => {
                          setTeamMembers(selectedOption)
                        }}
                        isMulti
                      />
                      {formErrors.teamMembers && (
                        <span className='text-danger'>
                          {formErrors.teamMembers}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Rating</label>
                      <div className='rating-input'>
                        {[1, 2, 3, 4, 5].map(value => (
                          <div
                            key={parseInt(value)}
                            className='form-check form-check-inline'
                          >
                            <input
                              className='form-check-input'
                              type='radio'
                              name='rating'
                              value={value}
                              checked={rating === value}
                              onChange={e => {
                                setRating(parseInt(e.target.value))
                                setFormErrors({
                                  ...formErrors,
                                  rating:
                                    e.target.value === ''
                                      ? 'Rating is required'
                                      : ''
                                })
                              }}
                            />
                            <label className='form-check-label'>{value}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Description<span style={{ color: 'red' }}> *</span>
                  </label>
                  <DefaultEditor
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value)
                      setFormErrors({
                        ...formErrors,
                        description:
                          e.target.value === '' ? 'Description is required' : ''
                      })
                    }}
                  />
                  {formErrors.description && (
                    <span className='text-danger'>
                      {formErrors.description}
                    </span>
                  )}
                </div>

                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Upload Logo<span style={{ color: 'red' }}> *</span>
                  </label>
                  <input
                    className='form-control'
                    type='file'
                    onChange={handleLogo}
                  />
                  {formErrors.logo && (
                    <span className='text-danger'>{formErrors.logo}</span>
                  )}
                  {logo && (
                    <img
                      src={
                        typeof logo === 'string'
                          ? logo
                          : URL.createObjectURL(logo)
                      }
                      alt='Current logo'
                      style={{
                        width: '100px',
                        height: 'auto',
                        marginTop: '10px'
                      }}
                    />
                  )}
                </div>

                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Upload Documents<span style={{ color: 'red' }}> *</span>
                  </label>
                  <input
                    className='form-control'
                    type='file'
                    multiple
                    onChange={handleDocumentChange}
                    required={!(project?.documents?.length > 0)}
                  />
                  {formErrors.documents && (
                    <span className='text-danger'>{formErrors.documents}</span>
                  )}
                  {documents.length > 0 && (
                    <ul>
                      {documents.map((doc, index) => (
                        <li key={index}>
                          {typeof doc === 'string' ? (
                            <a
                              href={doc}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              View Document {index + 1}
                            </a>
                          ) : (
                            doc.name
                          )}
                          <button
                            type='button'
                            onClick={() => removeDocument(index)}
                            className='btn btn-sm btn-danger'
                          >
                            Remove
                          </button>
                        </li>
                      ))}

                      {project?.documents && project?.documents.length > 0 ? (
                        project?.documents.map((document, index) => (
                          <li key={index}>
                            <div className='d-flex align-items-center'>
                              {/* <span className="file-icon">
                                <i className="la la-file-alt" />
                              </span> */}
                              <p>{project?.documents.name}</p>
                            </div>
                            {/* <div className="file-download">
                              <Link
                                to={document.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="la la-download" />
                                Download
                              </Link>
                            </div> */}
                          </li>
                        ))
                      ) : (
                        <li>No documents available</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className='submit-section'>
                  <button className='btn btn-primary submit-btn' type='submit'>
                    {loading ? (
                      <span
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                      ></span>
                    ) : (
                      'Update'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='modal custom-modal fade' id='delete' role='dialog'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='form-header'>
                <p>Are you sure you want to delete?</p>
              </div>
              <div className='modal-btn delete-action'>
                <div className='row'>
                  <div className='col-6'>
                    <Link
                      to='#'
                      className='btn btn-primary submit-btn'
                      onClick={handleDelete}
                    >
                      Delete
                    </Link>
                  </div>
                  <div className='col-6'>
                    <Link
                      to='#'
                      data-bs-dismiss='modal'
                      className='btn btn-primary submit-btn'
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails
