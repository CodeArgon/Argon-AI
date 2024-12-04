import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../../../constants/urls'
import { fileIcon } from '../../../../../Routes/ImagePath'
import { useLocation } from 'react-router-dom'

const Documents = () => {
  const [values, setValues] = useState([])
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const folderName = queryParams.get('folder')

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    axios
      .get(`${BASE_URL}folders/${folderName}/archive/`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then(res => setValues(res.data))
  }, [])
  return (
    <div className='row row-sm'>
      {values.map((file, index) => (
        <div className='col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3' key={index}>
          <div className='card card-file'>
            <div className='dropdown-file'>
              <Link to='#' className='dropdown-link' data-bs-toggle='dropdown'>
                <i className='fa fa-ellipsis-v' />
              </Link>
              <div className='dropdown-menu dropdown-menu-right'>
                {/* <Link to='#' className='dropdown-item'>
                  View Details
                </Link>
                <Link to='#' className='dropdown-item'>
                  Share
                </Link> */}
                <Link to='#' className='dropdown-item'>
                  Download
                </Link>
                <Link to='#' className='dropdown-item'>
                  Rename
                </Link>
                <Link to='#' className='dropdown-item'>
                  Delete
                </Link>
              </div>
            </div>
            <div className='card-file-thumb'>
              {/* <i className={`fa-regular ${file.icon}`} /> */}
              <img src={fileIcon} alt='File Icon' />
            </div>
            <div className='card-body'>
              <h6>
                <Link to='#'>{file.name}</Link>
              </h6>
              <span>
                {file.file_size}
                <span style={{ marginLeft: '5px' }}>bytes</span>
              </span>
            </div>
            <div className='card-footer'>
              {new Date(file.last_modified).toLocaleString('en-US', {
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
      ))}
    </div>
  )
}

export default Documents
