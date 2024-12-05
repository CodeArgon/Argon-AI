import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Folders from './folders'
import DocumentModal from '../../../../../components/modelpopup/DocumentModal'
import FolderModal from '../../../../../components/modelpopup/FolderModal'

const FolderManager = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <div className='page-wrapper'>
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
                          <Link>
                            <span
                              className='btn-file'
                              data-bs-toggle='modal'
                              data-bs-target='#add_folder'
                              style={{ marginLeft: '10px' }}
                            >
                              <i class='fa-solid fa-folder-plus fa-lg'></i>
                            </span>
                          </Link>
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
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </form>

                      <div className='file-body'>
                        <div className='file-scroll'>
                          <div className='file-content-inner'>
                            <Link
                              to='#'
                              className='btn btn-sm btn-primary add-btn'
                              data-bs-toggle='modal'
                              data-bs-target='#add_folder'
                            >
                              <i className='la la-plus-circle' /> Add Folder
                            </Link>
                            <h4>Folders</h4>
                            <Folders searchTerm={searchTerm} />{' '}
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
        <FolderModal />
        <DocumentModal />
      </div>
    </>
  )
}

export default FolderManager
