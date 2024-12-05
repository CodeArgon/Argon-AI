import React, { useState, useContext } from 'react'
import { BASE_URL } from '../../../constants/urls'
import UserContext from '../../../contexts/UserContext'
import Swal from 'sweetalert2'

const AddOrder = () => {
  const [orderData, setOrderData] = useState({
    name: '',
    unitPrice: '',
    quantity: ''
  })
  const { leadData, setlead } = useContext(UserContext)

  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target

    if ((name === 'quantity' || name === 'unitPrice') && value <= 0) {
      setError('Enter positive value')
      setOrderData({ ...orderData, [name]: '' }) // Reset invalid field
    } else {
      setError('') // Clear error if the value is valid
      setOrderData({ ...orderData, [name]: value })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!orderData.name || !orderData.unitPrice || !orderData.quantity) {
      setError('All fields are required.')
      return
    }

    const requestData = {
      name: orderData.name,
      unit_price: parseFloat(orderData.unitPrice),
      quantity: parseInt(orderData.quantity, 10),
      lead: leadData.id,
      total_price:
        parseFloat(orderData.unitPrice) * parseInt(orderData.quantity, 10)
    }

    try {
      const authToken = localStorage.getItem('BearerToken')
      const response = await fetch(`${BASE_URL}orders/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        console.log('Order submitted successfully')
        Swal.fire('Order submitted successfully')
        setOrderData({ name: '', unitPrice: '', quantity: '', totalPrice: '' })
        setlead(leadData)
        setError('')
      } else {
        console.error('Failed to submit order')
        Swal.fire('Order submitted successfully')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    }
  }

  const isFormValid =
    orderData.name &&
    parseFloat(orderData.unitPrice) > 0 &&
    parseInt(orderData.quantity, 10) > 0

  return (
    <>
      {/* Add Orders Modal */}
      <div id='add_orders' className='modal custom-modal fade' role='dialog'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Order</h5>
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
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                {error && <p className='text-danger'>{error}</p>}
                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Order Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='name'
                    value={orderData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Unit Price <span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    type='number'
                    step='0.01'
                    name='unitPrice'
                    value={orderData.unitPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Quantity <span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    type='number'
                    name='quantity'
                    value={orderData.quantity}
                    onChange={handleChange}
                    min='1'
                    required
                  />
                </div>
                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    type='submit'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    disabled={!isFormValid}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Orders Modal */}
    </>
  )
}

export default AddOrder
