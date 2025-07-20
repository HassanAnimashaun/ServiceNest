import axios from 'axios';

export default () => {
  let baseURL = import.meta.env.VITE_API_BASE_URL;
  if (!baseURL) throw new Error('VITE_API_BASE_URL is not defined');

  // Ensure trailing slash
  if (!baseURL.endsWith('/')) baseURL += '/';

  return axios.create({
    baseURL: baseURL + 'api',
    withCredentials: true,
  });
};
