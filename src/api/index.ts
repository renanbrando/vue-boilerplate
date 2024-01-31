import axios from 'axios'

const API_URL = import.meta.env.VITE_API
const token = localStorage.getItem('token-concierge')

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    ...(token?.length && { Authorization: `Bearer ${token}` }),
  },
  baseURL: API_URL,
})

export default api
