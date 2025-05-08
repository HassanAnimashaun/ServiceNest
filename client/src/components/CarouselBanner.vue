<template>
  <div id="indicators-carousel" class="relative w-full" data-carousel="static">
    <!-- Wrapper -->
    <div class="relative overflow-hidden md:h-96">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        :class="{
          hidden: currentIndex !== index,
          block: currentIndex === index,
          'duration-700': true,
          'ease-in-out': true,
        }"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="absolute block w-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Controler -->
    <button @click="prevSlide" class="hidden"></button>
    <button @click="nextSlide" class="hidden"></button>
  </div>
</template>

<script>
export default {
  name: 'CarouselBanner',
  data() {
    return {
      currentIndex: 0,
      autoplay: null,
      carouselItems: [
        {
          src: '/assets/bmw.jpg',
          alt: 'BMW',
        },
        {
          src: '/assets/benz.jpg',
          alt: 'BENZ',
        },
        {
          src: '/assets/maybach.jpg',
          alt: 'MAYBACH',
        },
      ],
    };
  },
  mounted() {
    this.autoplay = setInterval(this.nextSlide, 4000);
  },
  beforeUnmount() {
    clearInterval(this.autoplay);
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.carouselItems.length) %
        this.carouselItems.length;
    },
  },
};
</script>

<style></style>
