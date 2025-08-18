import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth';

async function bootstrap() {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);

  const auth = useAuthStore();
  await auth.fetchUser();

  app.mount('#app');

  console.log('MODE:', import.meta.env.MODE);
  console.log('BASE_URL:', import.meta.env.VITE_API_BASE_URL);
}

bootstrap();
