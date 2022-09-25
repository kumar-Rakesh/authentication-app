import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/')
  }

  const loginRegLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
  )

  const userLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          User
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/editProfile" className="nav-link">
          Edit Profile
        </Link>
      </li>
      <li className="nav-item">
        <a href="" onClick={handleLogout} className="nav-link">
          Logout
        </a>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample10"
        aria-controls="navbarsExample10"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse justify-content-md-center"
        id="navbarsExample10"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        {user ? userLink : loginRegLink}
      </div>
    </nav>
  )

}

export default Navbar
