import React, { useState } from 'react'
import Select from 'react-select'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const DocumentModal = () => {
  const options2 = [
    { label: 'Select', value: 'Select' },
    { label: 'CVs', value: 'CVs' },
    { label: 'Company Documents', value: 'Company Documents' },
    { label: 'Profiles', value: 'Profiles' },
    { label: 'Case Studies', value: 'Case Studies' }
  ]

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
              <form action='/activities'>
                <div className='contact-input-set'>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div className='input-block mb-3'>
                        <label className='col-form-label'>
                          File Name <span className='text-danger'>*</span>
                        </label>
                        <input className='form-control' type='text' />
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='input-block mb-3'>
                        <label className='col-form-label'>
                          Folder <span className='text-danger'>*</span>
                        </label>
                        <Select options={options2} placeholder={'select'} />
                      </div>
                    </div>
                    <div className='col-lg-12 text-end form-wizard-button'>
                      <button className='btn btn-primary' type='submit'>
                        Save Document
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
