import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../../../constants/urls'

const Folders = ({ searchTerm }) => {
  const [folders, setFolders] = useState([])
  const [filteredFolders, setFilteredFolders] = useState([])

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
        setFilteredFolders(response.data) // Initialize filteredFolders
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    fetchFolders()
  }, [])

  useEffect(() => {
    // Filter folders based on search term
    const filtered = folders.filter(folder =>
      folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredFolders(filtered)
  }, [searchTerm, folders]) // Re-run filter whenever searchTerm or folders change

  return (
    <div className='row row-sm'>
      {filteredFolders.length > 0 ? (
        filteredFolders.map((folder, index) => (
          <div
            className='col-6 col-sm-4 col-md-3 col-lg-4 col-xl-2'
            key={index}
          >
            <div className='card card-file'>
              <div className='card-file-thumb'>
                <i
                  className='fa-solid fa-folder fa-2xs'
                  style={{ color: '#FFD43B' }}
                ></i>
              </div>
              <div className='card-body'>
                <h6>
                  <Link
                    to={`/document-list?folder=${encodeURIComponent(
                      folder.name
                    )}`}
                  >
                    {folder.name}
                  </Link>
                </h6>
                <span>{folder.file_size}</span>
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
