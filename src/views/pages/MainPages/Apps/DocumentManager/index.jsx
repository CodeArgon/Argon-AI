import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Documents from './documents'

import DocumentModal from '../../../../../components/modelpopup/DocumentModal'

const DocumentManager = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <div className='page-wrapper'>
        {/* Page Content */}
        <div className='content container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='file-wrap'>
                <div className='file-cont-wrap'>
                  <div className='file-cont-inner'>
                    <div className='file-cont-header'>
                      <div className='file-options'></div>
                      <span>File Manager</span>
                      <div className='file-options'>
                        <Link
                          style={{
                            borderRadius: '20px',
                            marginLeft: '50px',
                            marginTop: '10px'
                          }}
                          to='#'
                          data-bs-toggle='modal'
                          data-bs-backdrop='static'
                          data-bs-target='#add_document'
                        >
                          <span className='btn-file'>
                            <i className='fa-solid fa-upload' />
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className='file-content'>
                      <form className='file-search'>
                        <div className='input-group'>
                          <div className='input-group-text'>
                            <i className='fa-solid fa-magnifying-glass' />
                          </div>
                          <input
                            type='text'
                            className='form-control rounded-pill'
                            placeholder='Search'
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </form>

                      <div className='file-body'>
                        <div className='file-scroll'>
                          <div className='file-content-inner'>
                            <h4>Files</h4>
                            <Documents searchQuery={searchQuery} />{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        <DocumentModal />
      </div>
    </>
  )
}

export default DocumentManager
