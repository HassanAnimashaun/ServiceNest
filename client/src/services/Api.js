import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function joinURL(base, path) {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export default () => {
  return axios.create({
    baseURL: joinURL(baseURL, 'api'),
    withCredentials: true,
  });
};
