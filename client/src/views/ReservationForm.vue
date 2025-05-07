<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <form
      @submit.prevent="submitForm"
      class="max-w-md bg-white p-6 rounded-2xl shadow-lg"
    >
      <!-- User Info -->
      <div class="">
        <input type="text" v-model="user.fname" placeholder="First Name" />
        <input type="text" v-model="user.lname" placeholder="Last Name" />
        <input type="email" v-model="user.email" placeholder="Email" />
        <input
          type="tel"
          v-model="user.phone"
          pattern="\d{10}"
          maxlength="10"
          placeholder="Phone Number"
        />
      </div>

      <!-- Car Info -->
      <div>
        <input
          type="tel"
          v-model="vehicle.year"
          pattern="\d*"
          maxlength="4"
          placeholder="Year"
        />
        <input type="text" v-model="vehicle.make" placeholder="Make" />
        <input type="text" v-model="vehicle.model" placeholder="Model" />
        <input
          type="text"
          v-model="vehicle.color"
          placeholder="Original Color"
        />
      </div>

      <!-- Service -->
      <div class="">
        <h2>Service Options:</h2>
        <label>
          <input type="checkbox" value="Wrap" v-model="service" class="mr-2" />
          Full Wrap
        </label>
        <label>
          <input type="checkbox" value="PPF" v-model="service" class="mr-2" />
          Paint Protection Film
        </label>
        <label>
          <input type="checkbox" value="Tint" v-model="service" class="mr-2" />
          Window Tint
        </label>
      </div>

      <!-- Notes -->
      <div class="p-3">
        <textarea
          v-model="description"
          placeholder="Describe what you want done"
          class="w-full border rounded p-2"
        ></textarea>
      </div>

      <!-- Photo Upload -->
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span>
              or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            @change="handleFileUpload"
          />
        </label>
      </div>

      <!-- Submit button -->
      <div class="text-center">
        <button
          type="submit"
          class="w-full bg-green-600 text-white rounded-lg mt-20 py-2 text-sm hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ReservationForm',
  data() {
    return {
      // Add your component data here
      user: {
        fname: '',
        lname: '',
        email: '',
        phone: '',
      },
      vehicle: {
        year: '',
        make: '',
        model: '',
        color: '',
      },
      service: [],
      description: '',
      vehicleImage: null,
    };
  },
  methods: {
    // Add your methods here
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
