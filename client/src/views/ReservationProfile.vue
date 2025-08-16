<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50"
  >
    <div class="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h2 class="text-3xl text-blue-500 font-mono font-bold">
          {{ reservation.name }}
        </h2>
        <h3 class="text-lg text-blue-500 font-mono font-bold">
          {{ reservation.reservationNumber }}
        </h3>
        <p class="font-mono">Service: Wrap, Tint</p>
      </div>

      <!-- Info Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Contact -->
        <div
          class="flex flex-col items-center p-4 gap-3 bg-gray-100 rounded-xl shadow-sm min-h-[200px]"
        >
          <h3 class="text-2xl text-blue-500 font-mono mb-2">Contact</h3>
          <p class="font-mono">{{ reservation.name }}</p>
          <a
            :href="`mailto:${reservation.email}`"
            target="_self"
            rel="noopener"
          >
            <p class="font-mono">{{ reservation.email }}</p>
          </a>
          <a :href="`tel:${reservation.phone}`" target="_self" rel="noopener">
            <p class="font-mono">{{ reservation.phone }}</p>
          </a>
        </div>

        <!-- Vehicle -->
        <div
          class="flex flex-col items-center p-4 gap-3 bg-gray-100 rounded-xl shadow-sm min-h-[200px]"
        >
          <h3 class="text-2xl text-blue-500 font-mono mb-2">Vehicle</h3>
          <p class="font-mono">{{ reservation.vehicle?.year }}</p>
          <p class="font-mono">{{ reservation.vehicle?.make }}</p>
          <p class="font-mono">{{ reservation.vehicle?.model }}</p>
          <p class="font-mono">{{ reservation.vehicle?.color }}</p>
        </div>
      </div>

      <!-- Description + Photos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <!-- Description -->
        <div
          class="flex flex-col p-4 bg-gray-100 rounded-xl shadow-sm min-h-[250px]"
        >
          <h3 class="text-2xl text-blue-500 font-mono text-center mb-2">
            Description
          </h3>
          <p class="font-mono mt-2 text-left flex-1">
            {{ reservation.note || 'No description provided.' }}
          </p>
        </div>

        <!-- Photos -->
        <div
          class="flex flex-col items-center p-4 bg-gray-100 rounded-xl shadow-sm min-h-[250px]"
        >
          <h3 class="text-2xl text-blue-500 font-mono text-center mb-2">
            Photos
          </h3>
          <div class="grid grid-cols-2 gap-4 mt-4 w-full">
            <!-- Placeholder if no images -->
            <div class="w-full aspect-square bg-gray-200 rounded"></div>
            <div class="w-full aspect-square bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import ReservationService from '@/services/ReservationService';

export default {
  name: 'ReservationProfile',

  data() {
    return {
      reservation: {},
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

    const resId = this.$route.params.id;
    try {
      const response = await ReservationService.getReservationById(resId);
      console.log('Reservations fetched:', response.data);
      this.reservation = response.data;
    } catch (err) {
      console.error('Error fetching reservations:', err);
      auth.logout();
    }
  },
};
</script>

<style scoped>
.reservation-profile {
  padding: 2rem;
}
</style>
