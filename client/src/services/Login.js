import Api from '/src/services/Api';

export default {
  login(credentials) {
    return Api().post('login', credentials);
  },

  register(credentials) {
    return Api().post('register', credentials);
  },
};

// AuthenticationService.register({
//   username: 'admin',
//   password: 'Admin'
// })
