<template>
  <div class=" flex items-center justify-between px-6 py-4">

    <!-- User Icon -->
    <details class="relative border border-transparent ">
      <summary class="w-10 h-10 select-none cursor-pointer list-none">
        <img src="/src/components/icons/user.png" alt="User" class="rounded-full hover:ring-2 hover:ring-slate-400" />
      </summary>

      <div class="absolute left-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 text-md text-gray-700 z-10">
        <button @click="goToDashboard" class="block w-full text-left hover:text-blue-600">Dashboard</button>
        <button @click="logout" class="block w-full text-left hover:text-red-600">Log Out</button>
      </div>
    </details>


    <!-- Search Bar -->
    <div class="absolute left-1/2 transform -translate-x-1/2 w-full sm:max-w-xl">
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
          <path fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd" />
        </svg>

        <input
          class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          type="text" pattern="[0-9]*" inputmode="numeric"
          v-model="query"
          @input="onSearch"
          @keyup.enter="onSearch"
          placeholder="Enter Reservation #" />
      </div>
    </div>
    </div>
</template>

<script>
import {ref} from 'vue'

const query = ref('')

export default {
    name: "SearchBar",
    data() {
      return {
        query: "",
        result: null,
        reservations: [
        { number: "12345", name: "John Doe", service: "Full Wrap" },
        { number: "67890", name: "Jane Smith", service: "Tint" },
      ],
      };
    },
    methods: {
      onSearch() {
        if(query.value.trim() === ''){
          this.result.value = null
          return
        }
        this.result = this.reservations.find(
        r => r.number.toLowerCase() === query.value.trim().toLowerCase()
        );
      },
      goToDashboard(){

      },
      logout(){

      }
    },
  };
</script>

<style>
</style>
