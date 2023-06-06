import axios from 'axios';

/**
 * a
 * @param {string} name
 * @return {string|null}
 */
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'HTTP_X_CSRFTOKEN';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '',
  withCredentials: true
});

export default API;
