<template>
  <div class="relative h-full h-[500px]">
    <NavBar />
    <CarouselBanner />
  </div>

  <main>
    <div class="">
      <p class="absolute inset-y-0 right-0">
        Fayetteville's premier wrap shop specializing in luxury and exotic
        vehicles. Vehicle care is our number one priority.
      </p>
    </div>
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d816.3305769258081!2d-78.9287707!3d35.0736788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ab6d46ca1d99c5%3A0x68f71158ffd5991d!2sVillin%20Wraps!5e0!3m2!1sen!2sus!4v1746715937998!5m2!1sen!2sus"
        width="300"
        height="300"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </main>

  <footer>
    <FooterBar />
  </footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CarouselBanner from '@/components/CarouselBanner.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  methods: {},
  components: {
    // Register any components you want to use in this template
    NavBar,
    CarouselBanner,
    FooterBar,
  },
};
</script>

<style scoped></style>
