import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://mlm-eo5g.onrender.com/api',
});


export default api;
