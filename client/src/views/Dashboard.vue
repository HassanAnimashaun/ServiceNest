<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useAuthStore } from '@/stores/auth';
import SearchBar from '../components/SearchBar.vue';
import api from '@/services/Api';

export default {
  components: {
    SearchBar,
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
      const response = await api().get('/reservations');
      this.reservations = response.data;
    } catch (err) {
      console.error(err);
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

    <div v-if="reservations.length">
      <div
        v-for="r in reservations"
        :key="r._id"
        class="bg-white p-4 mb-4 rounded-xl shadow"
      >
        <h2 class="font-bold text-lg">{{ r.name }}</h2>
        <p>Service: {{ r.service }}</p>
        <p>
          Vehicle: {{ r.vehicle.year }} {{ r.vehicle.make }}
          {{ r.vehicle.model }}
        </p>
        <p>Status: {{ r.status }}</p>
        <p>Reservation #: {{ r.reservationNumber }}</p>
        <p>Created: {{ new Date(r.createdAt).toLocaleString() }}</p>
      </div>
    </div>

    <div v-else class="text-gray-700">No reservations found.</div>
  </div>
</template>

<style></style>
