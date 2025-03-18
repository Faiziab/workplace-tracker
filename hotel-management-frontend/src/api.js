// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Change this if your backend is running on a different port or domain
});


// Add a request interceptor to attach the token to headers
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default API;
