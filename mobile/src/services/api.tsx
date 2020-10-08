import axios from 'axios';

const api = axios.create({
  baseURL: 'https://amamentacoach.herokuapp.com',
});

export default api;
