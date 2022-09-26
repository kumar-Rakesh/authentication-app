import axios from "axios"

const url = 'https://comp-8967-authentication-app.herokuapp.com/api'

const API = axios.create({ baseURL: url })

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`
    }
    return req
})

export const register = (formData) => API.post('/auth/register', formData)

export const login = (formData) => API.post('/auth/login', formData)

export const getUserById = (id) => API.get(`/user/${id}`)

export const editUserById = (id, formData) => API.patch(`/user/${id}`, formData)

