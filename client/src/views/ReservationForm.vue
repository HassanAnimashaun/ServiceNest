<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <form
      @submit.prevent="submitForm"
      class="max-w-md bg-white p-6 rounded-2xl shadow-lg"
    >
      <!-- User Info -->
      <div class="space-y-4 px-4">
        <input
          type="text"
          v-model="user.fname"
          placeholder="First Name"
          class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          v-model="user.lname"
          placeholder="Last Name"
          class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="email"
          v-model="user.email"
          placeholder="Email"
          class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="tel"
          v-model="user.phone"
          pattern="\d{10}"
          maxlength="10"
          placeholder="Phone Number"
          class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <!-- Car Info -->
      <div class="space-y-4 px-4 pt-4">
        <input
          type="tel"
          v-model="vehicle.year"
          pattern="\d*"
          maxlength="4"
          placeholder="Year"
          class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <!-- Make Select -->
        <Multiselect
          v-model="vehicle.make"
          :options="makeOptions"
          :taggable="true"
          :searchable="true"
          @change="fetchModelsForMake"
          placeholder="Select a make"
          class="w-full text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <!-- Model select -->
        <Multiselect
          v-model="vehicle.model"
          :options="modelOptions"
          :taggable="true"
          :searchable="true"
          placeholder="Select or type a model"
          class="w-full text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <!-- Description -->
        <input
          type="text"
          v-model="vehicle.color"
          placeholder="Original Color"
          class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <!-- Service -->
      <div class="px-4 py-2">
        <h2 class="text-lg font-semibold mb-3">Service Options:</h2>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              type="checkbox"
              value="Wrap"
              v-model="service"
              class="mr-3 h-5 w-5 text-yellow-500"
            />
            Full Wrap
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              value="PPF"
              v-model="service"
              class="mr-3 h-5 w-5 text-yellow-500"
            />
            Paint Protection Film
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              value="Tint"
              v-model="service"
              class="mr-3 h-5 w-5 text-yellow-500"
            />
            Window Tint
          </label>
        </div>
      </div>

      <!-- Notes -->
      <div class="px-4 py-2">
        <textarea
          v-model="description"
          placeholder="Describe what you want done"
          class="w-full h-32 text-base border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
        ></textarea>
      </div>

      <!-- Photo Upload -->
      <div class="flex items-center justify-center w-full px-4 py-4">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full max-w-md h-60 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
        >
          <div class="flex flex-col items-center justify-center px-4 pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500"
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
            <p class="mb-2 text-sm text-gray-600 text-center">
              <span class="font-semibold">Click to upload</span>
              or drag and drop
            </p>
            <p class="text-xs text-gray-500 text-center">
              SVG, PNG, JPG, or GIF (MAX. 800x400px)
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
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
  name: 'ReservationForm',
  components: { Multiselect },
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
      makeOptions: [],
      modelOptions: [],
      service: [],
      description: '',
      vehicleImage: null,
    };
  },
  created() {
    this.fetchMakes();
  },
  watch: {
    'vehicle.make'(newMake) {
      this.vehicle.model = null;
      this.modelOptions = [];
      if (newMake) {
        this.fetchModelsForMake();
      }
    },
  },
  methods: {
    async fetchMakes() {
      try {
        const res = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json'
        );
        const data = await res.json();
        this.makeOptions = data.Results.map((m) => m.Make_Name);
      } catch (err) {
        console.error('Error fetching makes:', err);
      }
    },
    async fetchModelsForMake() {
      if (!this.vehicle.make) return;
      try {
        const res = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${this.vehicle.make}?format=json`
        );
        const data = await res.json();
        this.modelOptions = data.Results.map((m) => m.Model_Name);
      } catch (err) {
        console.error('Error fetching models:', err);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.vehicleImage = file;
      }
    },
    submitForm() {
      const formData = {
        user: this.user,
        vehicle: this.vehicle,
        service: this.service,
        description: this.description,
        vehicleImageName: this.vehicleImage ? this.vehicleImage.name : null,
      };
      console.log('Reservation sent', formData);
    },
  },
};
</script>

<style scoped>
/* Style the internal input of vueform Multiselect */
.vueform-multiselect__input {
  padding: 0.75rem 1rem; /* py-3 px-4 */
  font-size: 1rem; /* text-base */
}

/* Also keep border radius consistent */
.vueform-multiselect {
  border-radius: 0.75rem; /* rounded-xl */
}

/* For focus ring on input */
.vueform-multiselect:focus-within {
  outline: none;
  box-shadow: 0 0 0 2px #facc15; /* Tailwind yellow-500 ring */
  border-color: #facc15;
}
</style>
