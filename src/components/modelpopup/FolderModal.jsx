import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { BASE_URL } from '../../constants/urls'
import Swal from 'sweetalert2'

dayjs.extend(customParseFormat)

const FolderModal = () => {
  const [folderName, setFolderName] = useState('')
  const [teamMembers, setTeamMembers] = useState([])
  const [teamMemberOptions, setTeamMemberOptions] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchTeamMembers()
  }, [])

  const handleSaveFolder = async e => {
    e.preventDefault()
    if (!folderName) {
      setFormErrors(prev => ({
        ...prev,
        folderName: 'Folder name is required'
      }))
      return
    }
    if (teamMembers.length === 0) {
      setFormErrors(prev => ({
        ...prev,
        teamMembers: 'At least one user must be selected'
      }))
      return
    }

    setIsSubmitting(true)
    const authToken = localStorage.getItem('BearerToken')
    const selectedUserIds = teamMembers.map(member => member.value)

    const payload = {
      name: folderName,
      users: selectedUserIds
    }

    try {
      const response = await fetch(`${BASE_URL}folders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        Swal.fire('Folder created successfully!').then(result => {
          if (result.isConfirmed) {
            setFolderName('')
            setTeamMembers([])
            setFormErrors({})
            window.location.reload()
          }
        })
      } else {
        console.error('Error creating folder:', await response.json())
        Swal.fire('Failed to create folder.')
      }
    } catch (error) {
      console.error('Error creating folder:', error)
      Swal.fire('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <div>
      {/* Add Folder */}
      <div
        className='modal custom-modal fade custom-modal-two modal-padding'
        id='add_folder'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header header-border justify-content-between p-0'>
              <h5 className='modal-title'>Add Folder</h5>
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
            <div className='modal-body p-0'>
              <form onSubmit={handleSaveFolder}>
                <div className='contact-input-set'>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div className='input-block mb-3'>
                        <label className='col-form-label'>
                          Folder Name <span className='text-danger'>*</span>
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          value={folderName}
                          onChange={e => {
                            setFolderName(e.target.value)
                            setFormErrors(prev => ({ ...prev, folderName: '' }))
                          }}
                        />
                        {formErrors.folderName && (
                          <span className='text-danger'>
                            {formErrors.folderName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='input-block mb-3'>
                        <label className='col-form-label'>
                          Users <span className='text-danger'>*</span>
                        </label>
                        <Select
                          options={teamMemberOptions}
                          placeholder='Select'
                          styles={customStyles}
                          value={teamMembers}
                          onChange={selectedOption => {
                            setTeamMembers(selectedOption)
                            setFormErrors(prev => ({
                              ...prev,
                              teamMembers: ''
                            }))
                          }}
                          isMulti
                          required
                        />
                        {formErrors.teamMembers && (
                          <span className='text-danger'>
                            {formErrors.teamMembers}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='col-lg-12 text-end form-wizard-button'>
                      <button
                        className='btn btn-primary'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Folder'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Folder */}
    </div>
  )
}

export default FolderModal
