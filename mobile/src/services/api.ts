import axios from 'axios';
import config from 'react-native-config';

const api = axios.create({
  baseURL: config.API_URL,
});

export default api;
