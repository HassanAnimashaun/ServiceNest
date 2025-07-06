<!-- eslint-disable vue/multi-word-component-names -->
<script>
import SearchBar from '../components/SearchBar.vue';
// import ProfileCard from '../components/ProfileCards.vue';

export default {
  components: {
    SearchBar,
    // ProfileCard,
  },
  data() {
    return {
      reservations: [],
      error: '',
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');

      const res = await fetch('http://localhost:3000/api/reservations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch reservations');
      }

      const data = await res.json();
      this.reservations = data;
    } catch (err) {
      this.error = err.message || 'Something went wrong';
      console.error('Fetch error:', err);
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
