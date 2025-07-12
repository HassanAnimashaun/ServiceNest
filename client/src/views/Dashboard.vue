<!-- eslint-disable vue/multi-word-component-names -->
<script>
import SearchBar from '../components/SearchBar.vue';
import api from '@/services/Api';
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
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
      return;
    }

    try {
      const axiosInstance = api(token);
      const response = await axiosInstance.get('/reservations');
      this.reservations = response.data;
      console.log(response.data);
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      this.$router.push('/login');
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
