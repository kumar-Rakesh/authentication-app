import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../api/api'

function EditProfile() {

    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem('profile')).data.id
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })


    useEffect(() => {
        api.getUserById(userId).then(res => {
            if (res) {
                const userData = res.data.data
                console.log(userData)
                setUser(userData)
            }
        }).catch(err => console.log(err))
    }, [])

    const onChangeFirstName = (e) => {
        e.preventDefault()
        setUser({ ...user, firstName: e.target.value })
    }

    const onChangeLastName = (e) => {
        e.preventDefault()
        setUser({ ...user, lastName: e.target.value })
    }

    const onChangePassword = (e) => {
        e.preventDefault()
        setUser({ ...user, password: e.target.value })
    }

    const onChangeConfirmPassword = (e) => {
        e.preventDefault()
        setUser({ ...user, confirmPassword: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        api.editUserById(userId, user).then(res => {
            if (res) {
                window.alert('User Details saved successfully.')
                navigate('/profile')
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
                                placeholder="Enter your lastname name"
                                value={user.lastName}
                                onChange={onChangeLastName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                readOnly
                                name="email"
                                placeholder="Enter email"
                                value={user.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                // value={user.password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                // value={user.confirmPassword}
                                onChange={onChangeConfirmPassword}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
