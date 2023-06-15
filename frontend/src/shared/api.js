import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// eslint-disable-next-line require-jsdoc
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '',
  withCredentials: true
});

export default API;
