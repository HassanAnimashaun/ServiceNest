<template>
  <div
    class="p-6 text-center transition-opacity duration-500 opacity-0 animate-fade-in"
  >
    <h1 class="text-3xl font-bold mb-4">Thanks, {{ name }}!</h1>
    <p>Your reservation has been submitted. We'll be in touch soon.</p>
    <p>
      Your reservation number is
      <strong>{{ reservation }}</strong>
      .
    </p>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPage',
  computed: {
    name() {
      return this.$route.query.name || 'there';
    },
    reservation() {
      return this.$route.query.number || 'N/A';
    },
  },
};
</script>

<style>
@keyframes fade-in {
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.5s forwards;
}
</style>
