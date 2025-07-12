import axios from 'axios';

export default (token = null) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  if (!baseURL) {
    throw new Error('VITE_API_BASE_URL is not defined');
  }

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL,
    headers,
  });
};
