<script>
import Login from '@/services/Login';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'AdminLogin',
  data() {
    return {
      username: 'Villinwraps',
      password: 'VillinWraps!2025',
      showPassword: false,
      rememberMe: false,
      error: '',
      loading: false,
      auth: useAuthStore(),
    };
  },
  mounted() {
    if (this.auth.isAuthenticated) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async login() {
      try {
        const loginRes = await Login.login({
          username: this.username,
          password: this.password,
        });
        console.log('Login response:', loginRes);

        const user = await this.auth.fetchUser();
        console.log('Fetched user:', user);
        console.log('isAuthenticated:', this.auth.isAuthenticated);

        if (this.auth.isAuthenticated) {
          console.log('Redirecting to dashboard');
          this.$router.push('/dashboard');
        }
      } catch (err) {
        console.error('Login error:', err);
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <div class="flex flex-col items-center gap-6 mb-6">
      <img src="/logo.png" alt="Logo" class="w-40" />
      <h2 class="text-2xl font-semibold text-center">Admin Login</h2>
    </div>

    <div class="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
      <form @submit.prevent="login" novalidate>
        <!-- Username -->
        <div class="relative mb-5">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <span class="material-symbols-outlined text-gray-500">person</span>
          </div>
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            required
            class="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Password -->
        <div class="relative mb-5">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <span class="material-symbols-outlined text-gray-500">key</span>
          </div>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            required
            class="pl-10 pr-10 py-2 w-full rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            @click.prevent="togglePassword"
            class="absolute inset-y-0 right-0 pr-2 flex items-center"
          >
            <span
              v-if="showPassword"
              class="material-symbols-outlined text-gray-500"
            >
              visibility
            </span>
            <span v-else class="material-symbols-outlined text-gray-500">
              visibility_off
            </span>
          </button>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            v-model="rememberMe"
            id="remember"
            class="mr-2"
          />
          <label for="remember" class="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white rounded-lg py-2 text-sm hover:bg-green-700 transition mb-2"
          :disabled="loading"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
