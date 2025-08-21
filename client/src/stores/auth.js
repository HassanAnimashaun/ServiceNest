import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/Api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(true);

  async function fetchUser() {
    loading.value = true;
    try {
      const res = await api().get('/me', { withCredentials: true });
      user.value = res.data.user;
    } catch (err) {
      user.value = null;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    api()
      .post('/logout')
      .then(() => {
        user.value = null;
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error('Logout error:', err);
        window.location.href = '/login';
      });
  }

  const isAuthenticated = computed(() => !!user.value);

  return { user, loading, isAuthenticated, fetchUser, logout };
});
