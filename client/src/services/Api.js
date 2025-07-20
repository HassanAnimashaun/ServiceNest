import axios from 'axios';

export default () => {
  let baseURL = import.meta.env.VITE_API_BASE_URL;
  if (!baseURL.endsWith('/')) baseURL += '/';
  baseURL += 'api/';

  return axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });
};
