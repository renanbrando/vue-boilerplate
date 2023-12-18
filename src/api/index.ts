import axios from 'axios'

const API_URL = import.meta.env.VITE_API

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
})

export default api
