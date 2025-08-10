<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="max-w bg-white p-6 rounded-2xl shadow-lg">
      <div class="p-8 grid gap-8">
        <!-- Info -->
        <div class="">
          <h2 class="text-3xl text-blue-500 font-mono font-bold">
            {{ reservation.name }}
          </h2>
          <h3 class="text-l text-blue-500 font-mono font-bold">
            {{ reservation.reservationNumber }}
          </h3>
          <p class="font-mono">Service: Wrap, Tint</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-20">
          <!-- Contact -->
          <div class="text-center">
            <h3 class="text-2xl text-blue-500 font-mono">Contact</h3>
            <p class="font-mono">{{ reservation.name }}</p>
            <p class="font-mono">{{ reservation.email }}</p>
            <p class="font-mono">{{ reservation.phone }}</p>
          </div>
          <!-- Vehicle -->
          <div class="text-center">
            <h3 class="text-2xl text-blue-500 font-mono">Vehicle</h3>
            <p class="font-mono">{{ reservation.vehicle.year }}</p>
            <p class="font-mono">{{ reservation.vehicle.make }}</p>
            <p class="font-mono">{{ reservation.vehicle.model }}</p>
            <p class="font-mono">{{ reservation.vehicle.color }}</p>
          </div>
        </div>

        <div class="grid grid-col-1 md:grid-cols-1 gap-8">
          <!-- Description -->
          <div>
            <h3 class="text-2xl text-blue-500 font-mono text-center">
              Description
            </h3>
            <p class="font-mono mt-2 text-left text-balance">
              Is simply dummy text of the printing and typesetting industry.
              Lorem is simply dummy text of the printing and typesetting
              industry.Is simply dummy text of the printing and typesetting
              industry. Lorem is simply dummy text of the printing and
              typesetting industry.Is simply dummy text of the printing and
              typesetting industry. Lorem is simply dummy text of the printing
              and typesetting industry.
            </p>
          </div>

          <!-- Photos -->
          <div>
            <h3 class="text-2xl text-blue-500 font-mono text-center">Photos</h3>
            <!-- Replace with actual photos -->
            <div class="w-32 h-32 bg-gray-200 mt-4 rounded"></div>
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
