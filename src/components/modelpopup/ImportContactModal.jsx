import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { BASE_URL } from '../../constants/urls'
import Swal from 'sweetalert2'

dayjs.extend(customParseFormat)

const ImportContactModal = () => {
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleFileChange = e => {
    setFile(e.target.files[0])
    console.log('file set')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!file) {
      alert('Please Upload File.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsSubmitting(true)
    const authToken = localStorage.getItem('BearerToken')
    try {
      const response = await fetch(`${BASE_URL}import-contacts/`, {
        headers: { Authorization: `Bearer ${authToken}` },
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        Swal.fire('File Upload successfully!').then(result => {
          if (result.isConfirmed) {
            setFile(null)
            window.location.reload()
          }
        })
      } else {
        Swal.fire('Failed to Upload')
      }
    } catch (error) {
      console.error('Error Importing file:', error)
      Swal.fire('An error occurred while Importing the file.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Add Document */}
      <div
        className='modal custom-modal fade custom-modal-two modal-padding'
        id='import_contact'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header header-border justify-content-between p-0'>
            <h5 className='modal-title'>Upload Sheet</h5>
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
                        {isSubmitting ? 'Importing...' : 'Import File'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportContactModal
