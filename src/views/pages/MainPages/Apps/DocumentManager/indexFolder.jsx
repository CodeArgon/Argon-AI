import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Documents from './documents'
import Folders from './folders'

import DocumentModal from '../../../../../components/modelpopup/DocumentModal'
import FolderModal from '../../../../../components/modelpopup/FolderModal'

import axios from 'axios'
import { BASE_URL } from '../../../../../constants/urls'

const FolderManager = () => {
  const [folders, setFolders] = useState([])

  useEffect(() => {
    const fetchFolders = async () => {
      const authToken = localStorage.getItem('BearerToken')
      try {
        const response = await axios.get(`${BASE_URL}folders/`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        setFolders(response.data)
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    fetchFolders()
  }, [])

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
                            <Folders />
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
        <FolderModal />
      </div>
    </>
  )
}

export default FolderManager
