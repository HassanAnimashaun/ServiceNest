import Api from '/src/services/Api';

export default {
  login(credentials) {
    return Api().post('/login', credentials);
  },
  fetchMe() {
    return Api().get('/me'); // hits {baseURL}/api/me
  },
};
