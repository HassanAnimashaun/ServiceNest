<template>
  <div class="relative h-full h-[500px] bg-black text-white">
    <NavBar />
    <CarouselBanner />
    <main class="flex justify-between items-start gap-4 p-4">
      <!-- ABOUT -->
      <div class="max-w-md space-y-2">
        <p class="text-lg font-semibold">
          Fayetteville's premier wrap shop specializing in luxury and exotic
          vehicles.
        </p>
        <p class="text-md">
          Vehicle care is our number one priority. Visit us for top-notch wrap
          services and unmatched quality.
        </p>
      </div>

      <!-- SERVICES -->
      <div>
        <h1 class="text-red-500 text-6xl">Services</h1>
        <div>
          <ul>
            <li>FULL VEHICLE WRAPS</li>
            <li>PAINT PROTECTION FILM</li>
            <li>WINDOW TINT</li>
            <li>HOOD WRAPS</li>
            <li>RACING STRIPES</li>
            <li>AND MORE</li>
          </ul>
        </div>
      </div>
      <!-- CONTACT -->
      <div id="contact">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d816.3305769258081!2d-78.9287707!3d35.0736788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ab6d46ca1d99c5%3A0x68f71158ffd5991d!2sVillin%20Wraps!5e0!3m2!1sen!2sus!4v1746715937998!5m2!1sen!2sus"
          width="300"
          height="300"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div class="">
          <h3>
            2835 Bragg Blvd, Fayetteville, North Carolina
            <br />
            910-600-1103
          </h3>
        </div>
      </div>
    </main>
  </div>

  <footer class="bg-transparent">
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
