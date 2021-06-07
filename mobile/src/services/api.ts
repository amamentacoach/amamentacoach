import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-amamentacoach.herokuapp.com',
});

export default api;
