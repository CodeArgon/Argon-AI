import React from 'react'
import { Link } from 'react-router-dom'
import { maintenance } from '../Routes/ImagePath'

const Unauthorized = () => {
  return (
    <div>
      <div className='main-wrapper'>
        <div className='under-maintenance text-center'>
          <div className='container'>
            <div className='maintenance-page'>
              <div>
                <img
                  style={{ height: '10%', width: '60%' }}
                  src={maintenance}
                  className='img-fluid'
                  alt='Img'
                />
              </div>
              <div className='maintenance-content'>
                <h3>Unauthorized Access</h3>
                <p>You do not have permission to view this page.</p>
                <Link to='/login' className='btn btn-custom btn-primary'>
                  Back to Dashboard
                  <i className='la la-arrow-alt-circle-right ms-2' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
