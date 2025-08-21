import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default () => {
  return axios.create({
    baseURL: baseURL + '/api', // append /api once
    withCredentials: true,
  });
};
