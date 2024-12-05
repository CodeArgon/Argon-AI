import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { BASE_URL } from '../../constants/urls'
import Swal from 'sweetalert2'

dayjs.extend(customParseFormat)

const DocumentModal = () => {
  const [folder, setFolder] = useState(null)
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [folderOptions, setFolderOptions] = useState([])

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    const fetchFolders = async () => {
      try {
        const response = await fetch(`${BASE_URL}folders/`, {
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

        setFolderOptions(options)
      } catch (error) {
        console.error('Error fetching platforms:', error)
      }
    }

    fetchFolders()
  }, [])

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!folder || !file) {
      alert('Please fill in all fields.')
      return
    }

    const formData = new FormData()
    formData.append('folder', folder.value)
    formData.append('file', file)

    setIsSubmitting(true)
    const authToken = localStorage.getItem('BearerToken')
    try {
      const response = await fetch(`${BASE_URL}archive/`, {
        headers: { Authorization: `Bearer ${authToken}` },
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        Swal.fire('Document saved successfully!').then(result => {
          if (result.isConfirmed) {
            setFolder(null)
            setFile(null)
            window.location.reload()
          }
        })
      } else {
        Swal.fire('Failed to save the document.')
      }
    } catch (error) {
      console.error('Error saving document:', error)
      Swal.fire('An error occurred while saving the document.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Add Document */}
      <div
        className='modal custom-modal fade custom-modal-two modal-padding'
        id='add_document'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header header-border justify-content-between p-0'>
              <h5 className='modal-title'>Add Document</h5>
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
              <form onSubmit={handleSubmit}>
                <div className='contact-input-set'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='input-block mb-3'>
                        <label className='col-form-label'>
                          Folder <span className='text-danger'>*</span>
                        </label>
                        <Select
                          options={folderOptions}
                          placeholder={'Select'}
                          value={folder}
                          onChange={selectedOption => setFolder(selectedOption)}
                        />
                      </div>
                    </div>

                    <div className='col-lg-12'>
                      <div className='input-block mb-3'>
                        <label className='col-form-label'>
                          Upload File <span className='text-danger'>*</span>
                        </label>
                        <input
                          className='form-control'
                          type='file'
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    <div className='col-lg-12 text-end form-wizard-button'>
                      <button
                        className='btn btn-primary'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Save Document'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Document */}
    </div>
  )
}

export default DocumentModal
