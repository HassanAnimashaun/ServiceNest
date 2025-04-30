<template>
  <div class="flex item-center justify-between px-6 py-4 ">

    <div>
      <h1>Logo</h1>
    </div>

  <div class="flex items-center w-full max-w-xl mx-6">
    <div class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
      </svg>

      <input
        class="w-100 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="number" pattern="[0-9]*"
        v-model="query"
        @input="onSearch"
        placeholder="Enter Reservation #"
      />
   </div>

    <button
      class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
      @click = "onSearch"
    >
      Search
    </button>
  </div>

  <div>
    <h1>Settings Icon</h1>
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
    },
  };
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
