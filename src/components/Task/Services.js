import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://cute-puce-xerus.cyclic.app/api',
});


export default api;
