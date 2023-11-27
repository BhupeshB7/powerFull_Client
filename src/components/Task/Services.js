import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mlm-production.up.railway.app/api',
});


export default api;
