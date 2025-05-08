<template>
  <div class="absolute bottom-0 w-full p-4 flex justify-between items-center">
    <div class="flex gap-2">
      <a :href="socialLinks.instgram" target="_blank">
        <font-awesome-icon
          :icon="['fab', 'instagram']"
          class="text-pink-500 hover:text-pink-600 transition duration-300 text-2xl"
        />
      </a>

      <a :href="socialLinks.facebook" target="_blank">
        <font-awesome-icon
          :icon="['fab', 'facebook']"
          class="text-blue-500 hover:text-blue-600 transition duration-300 text-2xl"
        />
      </a>

      <a :href="socialLinks.youtube" target="_blank">
        <font-awesome-icon
          :icon="['fab', 'youtube']"
          class="text-red-500 hover:text-red-600 transition duration-300 text-2xl"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data() {
    return {
      socialLinks: {
        instgram: 'https://www.instagram.com/villin_wraps/?hl=en',
        facebook: 'https://www.facebook.com/Villinwraps/',
        youtube: 'https://www.youtube.com/channel/UC-J7fT9or0CZfbCEhFqPXeQ',
      },
    };
  },
};
</script>
