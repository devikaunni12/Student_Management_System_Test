// src/api/axios.js
// Axios instance used by the whole frontend.

import axios from 'axios'

// Configure your backend base URL.
// - If Django is running on localhost:8000, use that.
// - For production, replace with your domain.
const baseURL = 'https://student-management-system-test.onrender.com'

// Create an Axios instance.
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach auth token from localStorage (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export default api