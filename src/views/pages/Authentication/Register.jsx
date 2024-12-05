import React, { useState, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { emailrgx } from '../Authentication/RegEx'

import UserContext from '../../../contexts/UserContext'
import { Button } from '@mui/material'
const schema = yup.object({
  email: yup
    .string()
    .matches(emailrgx, 'Email is required')
    .required('Email is required')
    .trim(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required')
    .trim(),
  role: yup.string().required('User role is required'),
  first_name: yup
    .string()
    .required('First Name is required')
    .matches(/^[A-Za-z\s]+$/, 'First Name must contain only letters')
    .trim(),

  last_name: yup
    .string()
    .required('Last Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Last Name must contain only letters')
    .trim(),
  cnic: yup
    .string()
    .required('CNIC is required')
    .matches(/^\d+$/, 'CNIC must contain only digits')
    .min(13, 'CNIC must be at least 13 digits')
    .max(13, 'CNIC must be at most 13 digits')
    .trim(),
  mobile_number: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^\d+$/, 'CNIC must contain only digits')
    .trim()
})

const Register = props => {
  const [passwordEye, setPasswordEye] = useState(true)
  const { setActiveStep, formData, setFormData } = useContext(UserContext)
  // const [repeatPasswordEye, setRepeatPasswordEye] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  })

  const onSubmit = async data => {
    console.log('Submitted Data:', data)
    try {
      // const result = await registerUser(data);
      const result = true
      if (result === true) {
        setFormData(data)
        setFormData(prevFormData => ({
          ...prevFormData,
          username: data.email
        }))
        setActiveStep(1)
      } else {
        console.log('Submitted Data Fail')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  return (
    <div className='container'>
      <div className='account-box'>
        <div className='account-wrapper'>
          <h3 className='account-title'>Register</h3>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label>First Name</label>
                  <Controller
                    name='first_name'
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.first_name ? 'error-input' : ''
                        }`}
                        type='text'
                        value={formData.first_name}
                        onChange={e => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className='text-danger'>
                    {errors?.first_name?.message}
                  </span>
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Last Name</label>
                  <Controller
                    name='last_name'
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.last_name ? 'error-input' : ''
                        }`}
                        type='text'
                        value={formData.last_name}
                        onChange={e => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className='text-danger'>
                    {errors?.last_name?.message}
                  </span>
                </div>
              </div>

              {/* Email and Role */}
              <div className='input-block mb-3'>
                <label>Email</label>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <input
                      className={`form-control ${
                        errors?.email ? 'error-input' : ''
                      }`}
                      type='text'
                      value={formData.email}
                      onChange={e => {
                        field.onChange(e)
                        field.onChange('username')
                        handleInputChange(e)
                      }}
                      {...field}
                    />
                  )}
                />
                <span className='text-danger'>{errors?.email?.message}</span>
              </div>
              <div className='input-block mb-3'>
                <label>Password</label>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <div
                      className='pass-group'
                      style={{ position: 'relative' }}
                    >
                      <input
                        type={passwordEye ? 'password' : 'text'}
                        className={`form-control ${
                          errors?.password ? 'error-input' : ''
                        }`}
                        onChange={e => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        value={formData.password}
                        {...field}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          right: '5%',
                          top: '30%'
                        }}
                        onClick={() => setPasswordEye(!passwordEye)}
                        className={`fa toggle-password ${
                          passwordEye ? 'fa-eye-slash' : 'fa-eye'
                        }`}
                      />
                    </div>
                  )}
                />
                <span className='text-danger'>{errors?.password?.message}</span>
              </div>
              <div className='input-block mb-3'>
                <label>Role</label>
                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`form-control ${
                        errors?.role ? 'error-input' : ''
                      }`}
                      onChange={e => {
                        field.onChange(e) // react-hook-form onChange
                        handleInputChange(e) // Update formData in context
                      }}
                      value={formData.role} // Sync with context state
                    >
                      <option value=''>Select Role</option>
                      <option value='Admin'>Admin</option>
                      <option value='Employee'>Employee</option>
                      <option value='Project Manager'>Project Manager</option>
                      <option value='Division Lead'>Leads</option>
                      <option value='HR'>HR</option>
                      <option value='BD'>BD</option>
                      <option value='BD'>IT</option>
                    </select>
                  )}
                />
                <span className='text-danger'>{errors?.role?.message}</span>
              </div>

              {/* <div className="input-block mb-3">
                      <label className="col-form-label">
                        Repeat Password<span style={{ color: "red" }}> *</span>
                      </label>
                      <Controller
                        name="repeatPassword"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type={repeatPasswordEye ? "password" : "text"}
                              className={`form-control  ${
                                errors?.repeatPassword ? "error-input" : ""
                              }`}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "30%",
                              }}
                              onClick={() =>
                                setRepeatPasswordEye(!repeatPasswordEye)
                              }
                              className={`fa toggle-password ${
                                repeatPasswordEye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                        defaultValue=""
                      />
                      <span className="text-danger">
                        {errors?.repeatPassword?.message}
                      </span>
                    </div> */}
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label>CNIC</label>
                  <Controller
                    name='cnic'
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.cnic ? 'error-input' : ''
                        }`}
                        type='text'
                        value={formData.cnic}
                        onChange={e => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className='text-danger'>{errors?.cnic?.message}</span>
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Mobile Number</label>
                  <Controller
                    name='mobile_number'
                    control={control}
                    render={({ field }) => (
                      <input
                        className={`form-control ${
                          errors?.mobile_number ? 'error-input' : ''
                        }`}
                        type='text'
                        value={formData.mobile_number}
                        onChange={e => {
                          field.onChange(e)
                          handleInputChange(e)
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className='text-danger'>
                    {errors?.mobile_number?.message}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between',
          bottom: '20px',
          width: '500px'
        }}
      >
        <Button
          disabled={true}
          onClick={handleBack}
          variant='outlined'
          style={{ width: '150px', marginLeft: '5px' }}
        >
          Back
        </Button>
        <Button
          type='submit'
          disabled={false}
          onClick={handleSubmit(onSubmit)}
          variant='contained'
          color='primary'
          style={{ width: '150px', marginRight: '5px' }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Register
