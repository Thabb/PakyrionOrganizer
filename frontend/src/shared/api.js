import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '',
  withCredentials: true
});

export default API;
