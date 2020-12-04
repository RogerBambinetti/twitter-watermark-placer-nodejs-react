import axios from 'axios';

const api = axios.create({
    baseURL: 'https://letslove-server.herokuapp.com/'
});

export default api;