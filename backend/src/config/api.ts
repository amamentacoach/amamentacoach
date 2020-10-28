import axios from 'axios';

const api = axios.create({
    baseURL:'https://onesignal.com/api/v1'
})

export default api;