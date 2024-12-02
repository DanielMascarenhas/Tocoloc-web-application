import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Ajuste para sua API backend
});

export default api;
