<script>
export default {
  name: 'ProfileCard',
  props: {
    reservation: Object,
  },
  computed: {
    formattedDate() {
      return new Date(this.reservation.createdAt).toLocaleDateString();
    },
  },
  methods: {
    goToProfile() {
      this.$router.push(`/reservations/${this.reservation._id}`);
    },
  },
};
</script>

<template>
  <div
    class="bg-white shadow rounded-xl p-4 mb-4 hover:shadow-md cursor-pointer transition"
    @click="goToProfile"
  >
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold">{{ reservation.name }}</h2>
      <span class="text-sm text-gray-500">
        {{ formattedDate }}
      </span>
    </div>

    <div class="text-gray-700 mb-1">
      <span class="font-medium">Service:</span>
      <p>
        {{
          Array.isArray(reservation.service)
            ? reservation.service.join(', ')
            : reservation.service
        }}
      </p>
    </div>

    <div class="text-gray-700 text-sm">
      <span class="font-medium">Reservation #:</span>
      {{ reservation.reservationNumber || 'Not Assigned' }}
    </div>
  </div>
</template>

<style scoped></style>
