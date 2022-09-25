import React, { useState, useEffect } from 'react'
import * as api from '../api/api'

function Profile() {

  const userId = JSON.parse(localStorage.getItem('profile')).data.id
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    api.getUserById(userId).then(res => {
      if (res) {
        const user = res.data.data
        console.log(user)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        // setImage(window.URL.createObjectURL(new Blob([Int8Array.from(image)], { type: 'jpg' })))
        setImage(user.image)
      }
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
        </div>
        <h1 className="text-center"><img width="200" height="200" src={image}></img></h1>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{lastName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default Profile
