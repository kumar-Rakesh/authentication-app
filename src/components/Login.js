import React, { useState } from 'react'
import * as api from '../api/api'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    api.login({ email: email, password: password }).then(res => {
      if (res) {
        console.log(res.data)
        localStorage.setItem('profile', JSON.stringify(res.data))
        navigate('/profile')
      }
    }).catch(err => console.log(err))

  }

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={email}
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
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )

}

export default Login
