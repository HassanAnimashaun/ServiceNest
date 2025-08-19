import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default {
  login: (credentials) =>
    axios.post(
      `${baseURL.endsWith('/') ? baseURL + 'api/login' : baseURL + '/api/login'}`,
      credentials,
      {
        withCredentials: true, // must be enabled for cookie-based JWT
      }
    ),
};
