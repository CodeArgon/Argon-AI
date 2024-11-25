import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { BASE_URL } from '../../../constants/urls'
import UserContext from '../../../contexts/UserContext'
import Swal from 'sweetalert2'

import {registerLeadActivities} from "../../../helpers/users";
const AddQuotation = () => {
  const [paymentTerm, setPaymentTerm] = useState(null)
  const [paymentList, setPaymentList] = useState(null)
  const [customer, setCustomer] = useState('')
  const [approvedBy, setApprovedBy] = useState(null)
  const [dl, setDL] = useState([])
  const { leadData, setLead, setlead, lead, userData } = useContext(UserContext)

  // const initialLead =
  // const [lead, setLead] = useState(
  //   JSON.parse(localStorage.getItem('leadData')) || {}
  // )
  const [visibleItems, setVisibleItems] = useState([leadData?.status])

  const paymentListOptions = [
    { value: 'PKR', label: 'PKR' },
    { value: 'USD', label: 'USD' }
  ]

  const paymentTermsOptions = [
    { value: '15 days', label: '15 days' },
    { value: '30 days', label: '30 days' },
    { value: '45 days', label: '45 days' },
    { value: '60 days', label: '60 days' }
  ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#667eea' : '#fff',
      color: state.isFocused ? '#fff' : '#000',
      '&:hover': {
        backgroundColor: '#667eea'
      }
    })
  }

  // Fetch DLs
  const fetchDLs = async () => {
    const authToken = localStorage.getItem('BearerToken')
    try {
      const response = await fetch(`${BASE_URL}users/by-role/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roles: ['Employee'] })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setDL(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchDLs()
  }, [])

  const DLsOptions = dl.map(user => ({
    value: user.id,
    label: user.username
  }))

  const validateForm = () => {
    return customer && paymentList && paymentTerm && approvedBy
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      alert('Please fill in all required fields.')
      return
    }

    const data = {
      customer_name: customer,
      payment_list: paymentList?.value,
      payment_term: paymentTerm?.value,
      approved_by: approvedBy?.value,
      lead: leadData.id
    }

    try {
      console.log('this is the data for adding the quotation ', data)
      const authToken = localStorage.getItem('BearerToken')
      const response = await fetch(`${BASE_URL}quotations/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        


        const formData = new FormData()
        formData.append('status', 'quotation')
        const authToken = localStorage.getItem('BearerToken')
        try {
          const response = await fetch(`${BASE_URL}leads/${leadData.id}/`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${authToken}`
            },
            body: formData
          })

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }

          const updatedLead = await response.json()
          localStorage.setItem('leadData', JSON.stringify(updatedLead))
          setLead(updatedLead)
          setlead(updatedLead)
          setVisibleItems(prevItems => [...prevItems, 'Opportunity'])
          const str = `Qutation is  created for Lead ${leadData.name}  by ${userData?.user?.username}`;
      console.log("String ",str,"Lead ID ",leadData.id);
      const result = await registerLeadActivities(leadData.id,userData?.user?.username,str);
      if (result?.id != '') {
        console.log("result ", result);

        localStorage.setItem("leadData", JSON.stringify(result));
        setLead(result)
        setlead(result)
      }
        } catch (error) {
          console.error('Failed to update status:', error)
        }
        Swal.fire('Quotation submitted successfully!')
      } else {
        Swal.fire('Failed to submit quotation.')
      }
    } catch (error) {
      console.error('Error submitting quotation:', error)
      Swal.fire('An error occurred while submitting the quotation.')
    }
  }

  return (
    <>
      <div
        id='add_quotations'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Quotation</h5>
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
                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Customer<span className='text-danger'>*</span>
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    value={customer}
                    onChange={e => setCustomer(e.target.value)}
                    required
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>Payment List</label>
                  <Select
                    placeholder='Select'
                    options={paymentListOptions}
                    value={paymentList}
                    onChange={setPaymentList}
                    className='select'
                    styles={customStyles}
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>Payment Term</label>
                  <Select
                    placeholder='Select'
                    options={paymentTermsOptions}
                    value={paymentTerm}
                    onChange={setPaymentTerm}
                    className='select'
                    styles={customStyles}
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>Approved By</label>
                  <Select
                    placeholder='Select'
                    options={DLsOptions}
                    value={approvedBy}
                    onChange={setApprovedBy}
                    className='select'
                    styles={customStyles}
                  />
                </div>

                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    type='submit'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    disabled={!validateForm()} // Disable button if form is not valid
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Quotation Modal */}
      <div
        id='edit_quotations'
        className='modal custom-modal fade'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Edit Policy</h5>
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
              <form>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>
                    Customer<span className='text-danger'>*</span>
                  </label>
                  <input className='form-control' type='text' />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>Payment List</label>
                  <Select
                    placeholder='Select'
                    options={paymentListOptions}
                    value={paymentList}
                    onChange={setPaymentList}
                    className='select'
                    styles={customStyles}
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>Payment Term</label>
                  <Select
                    placeholder='Select'
                    options={paymentTermsOptions}
                    value={paymentTerm}
                    onChange={setPaymentTerm}
                    className='select'
                    styles={customStyles}
                  />
                </div>
                <div className='input-block mb-3'>
                  <label className='col-form-label'>Approved By</label>
                  <Select
                    placeholder='Select'
                    //options={}
                    //onChange={}
                    className='select'
                    styles={customStyles}
                  />
                </div>

                <div className='submit-section'>
                  <button
                    className='btn btn-primary submit-btn'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                    type='reset'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Quotation Modal */}
    </>
  )
}

export default AddQuotation
