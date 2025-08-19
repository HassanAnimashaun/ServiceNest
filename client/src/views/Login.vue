<script>
import Login from '@/services/Login';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'AdminLogin',
  data() {
    return {
      error: '',
      showPassword: false,
      username: '',
      password: '',
      rememberMe: false,
      auth: useAuthStore(),
      isLoading: false,
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
      this.loading = true;

      try {
        await Login.login({
          username: this.username,
          password: this.password,
        });

        await this.auth.fetchUser();

        this.$router.push('/dashboard');
      } catch (err) {
        console.error('Login error:', err);
        this.error =
          err.response?.data?.error ||
          err.message ||
          'Login failed. Please try again.';
      }
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100"
  >
    <div class="flex flex-col items-center gap-4 mb-6">
      <img src="/logo.png" alt="profile" class="w-32 sm:w-40" />
      <h2 class="text-xl sm:text-2xl font-semibold text-center">Admin Login</h2>
    </div>

    <div class="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
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
            id="username"
            v-model="username"
            class="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
            required
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
            id="password"
            v-model="password"
            class="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
            required
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            <span v-if="showPassword" class="material-symbols-outlined">
              visibility
            </span>
            <span v-else class="material-symbols-outlined">visibility_off</span>
          </button>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            id="remember"
            v-model="rememberMe"
            class="mr-2"
          />
          <label for="remember" class="text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <!-- Error message -->
        <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-green-600 text-white rounded-lg py-2 text-sm hover:bg-green-700 transition"
          :disabled="loading"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style>
/* Make sure icons inside inputs don't block clicks */
.pointer-events-none {
  pointer-events: none;
}
</style>
