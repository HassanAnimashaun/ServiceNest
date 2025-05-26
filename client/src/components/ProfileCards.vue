<script>
export default {
  name: 'ProfileCards',
  data() {
    return {
      // Add your component data here
      resNumber: 9101201929,
      name: 'Hassan Animashaun',
      date: '09/23/25',
    };
  },
  methods: {
    // Add your component methods here
  },
};
</script>

<template>
  <RouterLink>
    <div class="flex w-[90%] mb-2">
      <div
        class="bg-red-800 w-full text-white flex justify-between items-center p-4 rounded"
      >
        <p># {{ resNumber }}</p>
        <p>Hassan Animashaun</p>
        <p>05/03/25</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Add your component styles here */
</style>
