import axios from 'axios'

axios.defaults.baseURL = 'http://0.0.0.0:8000/api';

axios.interceptors.request.use(
(config) => {
const token = localStorage.getItem("token");

if (token) {
config.headers['Authorization'] = `token ${token}`;
}

return config;
},

(error) => {
return Promise.reject(error);
}
);