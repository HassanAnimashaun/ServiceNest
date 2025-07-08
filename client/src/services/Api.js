import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });
};
