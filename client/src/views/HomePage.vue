<template>
  <div>
    <NavBar />
    <CarouselBanner />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CarouselBanner from '@/components/CarouselBanner.vue';

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    // Register any components you want to use in this template
    NavBar,
    CarouselBanner,
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
