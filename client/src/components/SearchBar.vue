<template>
  <header
    class="bg-white shadow-sm px-4 py-3 flex items-center justify-between relative"
  >
    <!-- Left: Logo -->
    <div class="flex items-center md:hidden">
      <img src="/logo.png" alt="Logo" class="h-10 w-10 rounded-full" />
    </div>

    <!-- Center: Search -->
    <div class="hidden sm:flex flex-1 justify-center px-4">
      <div class="relative w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          type="text"
          v-model="query"
          @input="onSearch"
          @keyup.enter="onSearch"
          placeholder="Enter Reservation #"
        />
      </div>
    </div>

    <!-- Right: Desktop Menu -->
    <div class="hidden md:block relative" ref="userMenuWrapper">
      <button
        @click="toggleUserMenu"
        class="rounded-full hover:ring-2 hover:ring-slate-400"
      >
        <img src="/logo.png" alt="User" class="h-10 w-10 rounded-full" />
      </button>
      <div
        v-if="showUserMenu"
        class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2 text-gray-700"
      >
        <button
          @click="goToDashboard"
          class="block w-full text-left hover:text-blue-600"
        >
          Dashboard
        </button>
        <button
          @click="handleLogout"
          class="block w-full text-left py-1 hover:text-red-600"
        >
          Log Out
        </button>
      </div>
    </div>

    <!-- Mobile: Hamburger -->
    <div class="md:hidden">
      <button @click="toggleMobileMenu" class="hamburger-button">
        <svg
          class="w-8 h-8 text-slate-700"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <transition name="slide-fade">
      <div
        v-if="showMobileMenu"
        class="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 p-4 md:hidden"
        ref="mobileMenuWrapper"
      >
        <div class="mb-3">
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
            type="text"
            v-model="query"
            @input="onSearch"
            @keyup.enter="onSearch"
            placeholder="Enter Reservation #"
          />
        </div>
        <button
          @click="goToDashboard"
          class="block w-full text-left py-2 hover:text-blue-600"
        >
          Dashboard
        </button>
        <button
          @click="handleLogout"
          class="block w-full text-left py-2 hover:text-red-600"
        >
          Log Out
        </button>
      </div>
    </transition>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'SearchBar',
  data() {
    return {
      query: '',
      showUserMenu: false,
      showMobileMenu: false,
      auth: useAuthStore(),
    };
  },
  methods: {
    onSearch() {
      if (!this.query.trim()) return;
      fetch(`/api/reservations/search?q=${encodeURIComponent(this.query)}`, {
        headers: { Authorization: `Bearer ${this.authToken}` },
        cache: 'no-store',
      })
        .then((res) => res.json())
        .then((data) => {
          this.reservations = data;
        })
        .catch((err) => console.error(err));
    },
    goToDashboard() {
      this.$router.push('/dashboard');
      this.closeMenus();
    },
    handleLogout() {
      this.auth.logout();
      this.closeMenus();
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    closeMenus() {
      this.showUserMenu = false;
      this.showMobileMenu = false;
    },
    handleClickOutside(event) {
      if (
        this.showUserMenu &&
        this.$refs.userMenuWrapper &&
        !this.$refs.userMenuWrapper.contains(event.target)
      ) {
        this.showUserMenu = false;
      }
      if (
        this.showMobileMenu &&
        this.$refs.mobileMenuWrapper &&
        !this.$refs.mobileMenuWrapper.contains(event.target) &&
        !event.target.closest('.hamburger-button')
      ) {
        this.showMobileMenu = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
