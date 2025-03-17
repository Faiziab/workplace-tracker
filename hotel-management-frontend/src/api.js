// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Change this if your backend is running on a different port or domain
});

export default API;
