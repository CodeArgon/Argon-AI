import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import DefaultEditor from 'react-simple-wysiwyg'
import { createProject } from '../../helpers/projects'
import { BASE_URL } from '../../constants/urls'

const ProjectModelPopup = ({ project }) => {
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
  const [teamLeader, setTeamLeader] = useState('')
  const [teamMembers, setTeamMembers] = useState('')
  const [description, setDescription] = useState('here is a test project')
  const [platforms, setPlatforms] = useState()
  const [techStack, setTechStack] = useState()
  const [industry, setIndustry] = useState()
  const [logo, setLogo] = useState(null)
  const [documents, setDocuments] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const [teamMemberOptions, setTeamMemberOptions] = useState([])
  const [teamLeaderOptions, setTeamLeaderOptions] = useState([])
  const [techStackOptions, setTechStackOptions] = useState([])
  const [platformOptions, setPlatformOptions] = useState([])
  const [loading, setLoading] = useState(false)

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
      setClientName(project.client_name)
      setGithubLink(project.git_link)
      setLiveLink(project.live_link)
      setFigmaLink(project.figma_link)
      setServerLoginEmail(project.server_email)
      setServerLoginPassword(project.server_password)
      setTeamLeader(person)
      setTeamMembers(dev_team)
      setDescription(project.description)
      setPlatforms(selected)
      setTechStack(tech_selected)
      setIndustry(ind)
      setLogo(project.logo_icon)
      setDocuments(project.project_documents)
    } catch {
      console.log('not edit')
    }
  }, [project, teamMemberOptions])

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

  const companies = [
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

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', projectName)
    formData.append('description', description)
    formData.append('client_name', clientName)
    formData.append('project_duration', projectDuration)
    formData.append('git_link', githubLink)
    formData.append('live_link', liveLink)
    formData.append('figma_link', figmaLink)
    formData.append('server_link', serverLink)
    formData.append('industry', industry.label)
    formData.append('logo_icon', logo)
    formData.append('server_email', serverLoginEmail)
    formData.append('server_password', serverLoginPassword)
    if (teamLeader != '') {
      formData.append('responsible_person', teamLeader.value)
    }
    if (rating != '') {
      formData.append('rating', rating)
    }
    if (teamMembers != '') {
      teamMembers.forEach((member, index) => {
        console.log(formData.getAll('development_team'))
        formData.append('development_team', parseInt(member.value, 10))
      })
    }

    techStack.forEach((tech, index) => {
      formData.append('tech_stack', parseInt(tech.value, 10))
    })

    // projectData.keywords.forEach((keyword, index) => {
    //   formData.append(`keywords[${index}]`, keyword);
    // });

    platforms.forEach((platform, index) => {
      formData.append('platform', parseInt(platform.value, 10))
    })

    documents.forEach((file, index) => {
      formData.append('project_documents', file)
    })

    console.log(formData.get('platform'))

    try {
      await createProject(formData)
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]')
      if (modalElement) {
        modalElement.click()
      }
      window.location.reload()
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateUrl = (url, type) => {
    const regexes = {
      github:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i,
      figma:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i,
      live: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
      server:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i
    }
    if (url == '') {
      return true
    }
    return regexes[type].test(url)
  }

  const handleGithubChange = e => {
    const value = e.target.value
    setGithubLink(value)
    setFormErrors({
      ...formErrors,
      githubLink: !validateUrl(value, 'github') ? 'Invalid URL format' : ''
    })
  }

  const handleFigmaChange = e => {
    const value = e.target.value
    setFigmaLink(value)
    setFormErrors({
      ...formErrors,
      figmaLink: !validateUrl(value, 'figma') ? 'Invalid URL format' : ''
    })
  }

  const handleLiveChange = e => {
    const value = e.target.value
    setLiveLink(value)
    setFormErrors({
      ...formErrors,
      liveLink: !validateUrl(value, 'live') ? 'Invalid URL format' : ''
    })
  }

  const handleServerChange = e => {
    const value = e.target.value
    setServerLink(value)
    setFormErrors({
      ...formErrors,
      serverLink: !validateUrl(value, 'server') ? 'Invalid URL format' : ''
    })
  }

  const handleFileChange = e => {
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

  const removeFile = index => {
    const updatedDocs = documents.filter((_, i) => i !== index)
    setDocuments(updatedDocs)
  }

  return (
    <>
      <div
        id='create_project'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Project</h5>
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
              <form onSubmit={handleSubmit}>
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
                          setFormErrors({
                            ...formErrors,
                            clientName:
                              e.target.value === ''
                                ? 'Client Name is required'
                                : ''
                          })
                        }}
                      />
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
                          setFormErrors({
                            ...formErrors,
                            projectDuration:
                              e.target.value === ''
                                ? 'Project Duration is required'
                                : ''
                          })
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>
                        Platform <span style={{ color: 'red' }}> *</span>
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
                      <label className='col-form-label'>GitHub Link</label>
                      <input
                        className='form-control'
                        type='text'
                        value={githubLink}
                        onChange={handleGithubChange}
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
                        onChange={handleFigmaChange}
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
                        onChange={handleLiveChange}
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
                        onChange={handleServerChange}
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
                        Server Login Email
                      </label>
                      <input
                        className='form-control'
                        type='email'
                        value={serverLoginEmail}
                        onChange={e => {
                          setServerLoginEmail(e.target.value)

                          setFormErrors({
                            ...formErrors,
                            serverLoginEmail:
                              e.target.value === ''
                                ? 'Server Login Email is required'
                                : ''
                          })
                        }}
                      />
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

                          setFormErrors({
                            ...formErrors,
                            serverLoginPassword:
                              e.target.value === ''
                                ? 'Server Login Password is required'
                                : ''
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='input-block mb-3'>
                      <label className='col-form-label'>Add Project Lead</label>
                      <Select
                        options={teamLeaderOptions}
                        placeholder='Select'
                        styles={customStyles}
                        value={teamLeader}
                        onChange={selectedOption => {
                          setTeamLeader(selectedOption)
                          setFormErrors({
                            ...formErrors,
                            teamLeader:
                              selectedOption && selectedOption.length > 0
                                ? ''
                                : 'Team Leader selection is required'
                          })
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
                          setFormErrors({
                            ...formErrors,
                            teamMembers:
                              selectedOption && selectedOption.length > 0
                                ? ''
                                : 'Team Members selection is required'
                          })
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
                      <label className='col-form-label'>
                        Rating<span style={{ color: 'red' }}> *</span>
                      </label>
                      <div className='rating-input'>
                        {[1, 2, 3, 4, 5].map(value => (
                          <div
                            key={value}
                            className='form-check form-check-inline'
                          >
                            <input
                              className='form-check-input'
                              type='radio'
                              name='rating'
                              value={value}
                              checked={rating === value}
                              onChange={e => {
                                setRating(Number(e.target.value))
                                setFormErrors({
                                  ...formErrors,
                                  rating:
                                    e.target.value === ''
                                      ? 'Rating is required'
                                      : ''
                                })
                              }}
                              required
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
                    onChange={e => {
                      const file = e.target.files[0]
                      setLogo(file)
                      setFormErrors({
                        ...formErrors,
                        logo: file ? '' : 'Logo is required'
                      })
                    }}
                    required
                  />
                  {formErrors.logo && (
                    <span className='text-danger'>{formErrors.logo}</span>
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
                    onChange={handleFileChange}
                    style={{
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                      color: 'red'
                    }}
                    required
                  />
                  {formErrors.documents && (
                    <span className='text-danger'>{formErrors.documents}</span>
                  )}
                  <ul>
                    {documents.map((file, index) => (
                      <li key={index}>
                        {file.name}{' '}
                        <button
                          type='button'
                          onClick={() => removeFile(index)}
                          className='btn btn-sm btn-danger'
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
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
                      'Submit'
                    )}
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

export default ProjectModelPopup
