import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://mlm-production.up.railway.app/api',
});


export default api;
