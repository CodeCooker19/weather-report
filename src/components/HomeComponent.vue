<template>
  <div class="w-full !h-[.538rem] flex">
    <h5 class="flex w-[5rem] text-white text-[0.35rem] pr-[0.5rem]">
      <div class="flex justify-center items-center">
        <svg fill="#fff" viewBox="0 0 24 24"
          class="w-[0.35rem] h-[0.35rem]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>
      <span class="ml-[0.1rem]">
        {{ city }}, {{ country }}
      </span>
    </h5>
    <vue-google-autocomplete ref="address" id="map"
      classname="lg:w-[10rem] w-full h-[0.538rem] rounded-[.32rem] text-white outline-none bg-[#5b5b5b] text-[0.25rem] flex px-[.3rem]"
      placeholder="Please type your address" v-on:placechanged="getAddressData">
    </vue-google-autocomplete>
  </div>
  <div class="w-full flex h-full">
    <CurrentWeather :lat=latitude :lon=longitude></CurrentWeather>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import CurrentWeather from "./CurrentWeather.vue";
import axios from "axios";
export default {
  name: "Home",
  components: { VueGoogleAutocomplete, CurrentWeather },
  data: function () {
    return {
      address: "",
      city: "",
      country: "",
      loading: true,
      latitude: "",
      longitude: ""
    };
  },

  async mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
    await this.getCity()
  },

  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      this.city = addressData.administrative_area_level_1;
      this.country = addressData.country;
      this.latitude = addressData.latitude;
      this.longitude = addressData.longitude;
    },
    async getCity() {
      this.loading = true;
      try {
        const data = await axios.get("https://ipapi.co/json/");
        if (data && data.status === 200) {
          this.loading = false;
          this.city = data.data.city;
          this.country = data.data.country;
          this.latitude = data.data.latitude;
          this.longitude = data.data.longitude;
        }
        this.loading = false
      } catch (error) {
        this.loading = false;

      }
    },
  },
};
</script>