import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../api/api'
import FileBase64 from 'react-file-base64'

function Register() {


  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', image: '' })
  const navigate = useNavigate()

  const onChangeFirstName = (e) => {
    e.preventDefault()
    setUser({ ...user, firstName: e.target.value })
  }

  const onChangeLastName = (e) => {
    e.preventDefault()
    setUser({ ...user, lastName: e.target.value })
  }

  const onChangeEmail = (e) => {
    e.preventDefault()
    setUser({ ...user, email: e.target.value })
  }

  const onChangePassword = (e) => {
    e.preventDefault()
    setUser({ ...user, password: e.target.value })
  }

  const onChangeConfirmPassword = (e) => {
    e.preventDefault()
    setUser({ ...user, confirmPassword: e.target.value })
  }

  const onDone = ({ base64 }) => {
    setUser({ ...user, image: base64 })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    api.register(user).then(res => {
      if (res) {
        window.alert('User registered successfully. Kindly login.')
        navigate('/login')
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="name">First name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter your first name"
                value={user.firstName}
                onChange={onChangeFirstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Last name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter your last name"
                value={user.lastName}
                onChange={onChangeLastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={user.email}
                onChange={onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={onChangePassword}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={onChangeConfirmPassword}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="confirmPassword">Image</label>
              &nbsp;
              <FileBase64
                className="form-control"
                multiple={false}
                onDone={onDone}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
            >
              Register!
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
