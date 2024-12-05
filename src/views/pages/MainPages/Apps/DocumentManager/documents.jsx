import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../../../constants/urls'
import { useLocation } from 'react-router-dom'

const Documents = ({ searchQuery }) => {
  const [values, setValues] = useState([])
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const folderName = queryParams.get('folder')

  const handleFilter = async type => {
    try {
      // Fetch all files from the API
      const authToken = localStorage.getItem('BearerToken')
      const response = await axios.get(
        `${BASE_URL}folders/${folderName}/archive/`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )

      const allFiles = response.data // API response data
      let filteredValues = []

      // Apply filter based on the selected type
      switch (type) {
        case 'Documents':
          filteredValues = allFiles.filter(
            item => item.name.includes('.docx') || item.name.includes('.doc')
          )
          break

        case 'PDFs':
          filteredValues = allFiles.filter(item => item.name.includes('.pdf'))
          break

        case 'SpreadSheets':
          filteredValues = allFiles.filter(
            item => item.name.includes('.xlsx') || item.name.includes('.xls')
          )
          break

        case 'Presentations':
          filteredValues = allFiles.filter(
            item => item.name.includes('.pptx') || item.name.includes('.ppt')
          )
          break

        case 'Images':
          filteredValues = allFiles.filter(
            item =>
              item.name.includes('.png') ||
              item.name.includes('.jpg') ||
              item.name.includes('.jpeg')
          )
          break

        default: // Show all files if no specific type is selected
          filteredValues = allFiles
          break
      }

      // Update the state with the filtered data
      setValues(filteredValues)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem('BearerToken')
    axios
      .get(`${BASE_URL}folders/${folderName}/archive/`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then(res => {
        setValues(res.data)
        console.log('here', res.data)
      })
  }, [folderName])

  // Filter files based on the search query
  const filteredValues = values.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenInNewTab = fileURL => {
    window.open(fileURL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className='row row-sm'>
      <div
        style={{
          display: 'flex',
          alignContent: 'flex-end',
          justifyContent: 'flex-end',
          marginBottom: '10px'
        }}
      >
        <div
          className='dropdown'
          style={{ marginTop: '10px', marginLeft: 'auto' }}
        >
          <Link
            to='#'
            className='btn btn-white btn-sm btn-rounded dropdown-toggle'
            style={{ gap: '10px' }}
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Filter
          </Link>
          <div className='dropdown-menu'>
            <Link
              className='dropdown-item'
              to='#'
              onClick={() => handleFilter('Documents')}
            >
              Documents
            </Link>
            <Link
              className='dropdown-item'
              to='#'
              onClick={() => handleFilter('SpreadSheets')}
            >
              SpreadSheets
            </Link>
            <Link
              className='dropdown-item'
              to='#'
              onClick={() => handleFilter('Presentations')}
            >
              Presentations
            </Link>
            <Link
              className='dropdown-item'
              to='#'
              onClick={() => handleFilter('PDFs')}
            >
              PDFs
            </Link>
            <Link
              className='dropdown-item'
              to='#'
              onClick={() => handleFilter('Images')}
            >
              Images
            </Link>
          </div>
        </div>
      </div>
      {filteredValues.map((file, index) => (
        <div className='col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3' key={index}>
          <div className='card card-file'>
            <div className='dropdown-file'>
              <Link to='#' className='dropdown-link' data-bs-toggle='dropdown'>
                <i className='fa fa-ellipsis-v' />
              </Link>
              <div className='dropdown-menu dropdown-menu-right'>
                <Link
                  onClick={() => handleOpenInNewTab(file.file)}
                  className='dropdown-item'
                >
                  Download
                </Link>
              </div>
            </div>
            <div className='card-file-thumb'>
              <i
                className='fa-solid fa-file fa-2xs'
                style={{ color: '#FFD43B' }}
              ></i>
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
