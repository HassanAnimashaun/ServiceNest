<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useAuthStore } from '@/stores/auth';
import SearchBar from '../components/SearchBar.vue';
import ProfileCards from '@/components/ProfileCards.vue';
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
  async mounted() {
    const auth = useAuthStore();
    await auth.fetchUser();

    if (!auth.isAuthenticated) {
      this.$router.push('/login');
      return;
    }

    try {
      const response = await ReservationService.getAllReservations(); // ✅ use service here
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
    <h1 class="text-xl font-bold mb-4">All Reservations</h1>

    <div v-if="error" class="text-red-500 mb-3">{{ error }}</div>

    <ProfileCards
      v-for="res in reservations"
      :key="res._id"
      :reservation="res"
    />
  </div>
</template>

<style></style>
