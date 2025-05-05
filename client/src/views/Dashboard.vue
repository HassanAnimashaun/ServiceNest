<!-- eslint-disable vue/multi-word-component-names -->
<script>
import SearchBar from '../components/SearchBar.vue';
import ProfileCard from '../components/ProfileCards.vue'


export default {
  components: {
    SearchBar,
    ProfileCard
  },
  data() {
    return {
      // Add your data properties here
    };
  },
  methods: {
    // Add your methods here
  },
  mounted() {
    // Lifecycle hook
  },
};
</script>

<template>
  <SearchBar/>

  <div class="w-screen h-screen flex text-white">


    <div class="w-full h-full bg-gray-400">
      <ProfileCard/>
      <router-view />

    </div>
  </div>
</template>


<style>

</style>
