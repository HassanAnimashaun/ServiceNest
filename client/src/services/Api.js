import axios from 'axios';

export default () => {
  let baseURL = import.meta.env.VITE_API_BASE_URL;

  return axios.create({
    baseURL: baseURL + 'api',
    withCredentials: true,
  });
};
