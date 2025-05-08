import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'flowbite';

// ✅ Import the library correctly
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// ✅ Import specific icons
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

// ✅ Add icons to the library
library.add(faInstagram, faFacebook, faTwitter, faYoutube);

const app = createApp(App);

// ✅ Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app');
