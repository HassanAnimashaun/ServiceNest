<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useAuthStore } from '@/stores/auth';
import SearchBar from '../components/SearchBar.vue';
import ProfileCards from '../components/ProfileCards.vue';
import ReservationService from '@/services/ReservationService';

export default {
  components: {
    SearchBar,
    ProfileCards,
  },
  data() {
    return {
      reservations: [],
      error: '',
    };
  },
  methods: {
    async searchReservation(query) {
      if (!query.trim()) return;
      const res = await fetch(`/api/reservations/search?q=${query}`, {
        headers: { Authorization: `Bearer ${this.auth.user?.token}` },
      });
      const data = await res.json();
      this.reservations = data;
    },
  },
  async mounted() {
    const auth = useAuthStore();
    await auth.fetchUser();

    if (!auth.isAuthenticated) {
      this.$router.push('/login');
      return;
    }

    try {
      const response = await ReservationService.getAllReservations();
      console.log('Reservations fetched:', response.data);
      this.reservations = response.data;
    } catch (err) {
      console.error('Error fetching reservations:', err);
      auth.logout();
    }
  },
};
</script>

<template>
  <SearchBar />

  <div class="p-4 text-black">
    <h1 v-if="$route.name === 'Dashboard'" class="text-xl font-bold mb-4">
      All Reservations
    </h1>

    <div v-if="$route.name === 'Dashboard'" class="space-y-4">
      <div v-if="error" class="text-red-500 mb-3">{{ error }}</div>

      <ProfileCards
        v-for="res in reservations"
        :key="res._id"
        :reservation="res"
      />
    </div>

    <router-view></router-view>
  </div>
</template>

<style></style>
