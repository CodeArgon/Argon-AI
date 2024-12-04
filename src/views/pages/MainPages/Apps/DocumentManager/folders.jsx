import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../../../constants/urls'
import { fileIcon } from '../../../../../Routes/ImagePath'

const Folders = () => {
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
    <div className='row row-sm'>
      {folders.length > 0 ? (
        folders.map((folder, index) => (
          <div
            className='col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3'
            key={index}
          >
            <div className='card card-file'>
              <div className='dropdown-file'>
                <Link
                  to='#'
                  className='dropdown-link'
                  data-bs-toggle='dropdown'
                >
                  <i className='fa fa-ellipsis-v' />
                </Link>
                <div className='dropdown-menu dropdown-menu-right'>
                  <Link to='#' className='dropdown-item'>
                    Rename
                  </Link>
                  <Link to='#' className='dropdown-item'>
                    Delete
                  </Link>
                </div>
              </div>
              <div className='card-file-thumb'>
                <img src={fileIcon} alt='File Icon' />
              </div>
              <div className='card-body'>
                <h6>
                  <Link
                    to={`/document-list?folder=${encodeURIComponent(
                      folder.name
                    )}`}
                  >
                    {folder.name}
                  </Link>{' '}
                </h6>
                <span>{folder.fileSize}</span>
              </div>
              <div className='card-footer'>
                {new Date(folder.last_modified).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No folders available.</p>
      )}
    </div>
  )
}

export default Folders
