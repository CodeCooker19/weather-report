<template>
  <div class="w-full h-auto flex mt-[0.2rem]" v-if="!$props.checked">
    <div v-for="weather in weatherHours" :key="weather.dt" class="w-full flex">
      <div class="w-full h-auto rounded-[0.4rem] bg-[#1b1a1d] text-white block mr-[0.2rem]">
        <div
          class="w-full h-auto rounded-t-[0.4rem] border-b-[1px] border-[white] text-[0.23rem] py-[0.2rem] flex justify-center items-center">
          <span>{{ getTime(weather.dt * 1000) }}</span>
        </div>
        <div class="w-full h-auto rounded-t-[0.4rem] text-[0.23rem] py-[0.2rem] block self-center">
          <img class="w-full self-center"
            :src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon.slice(0, -1) + 'd@2x.png'"
            alt="weather-icon" />
          <span class="text-[0.35rem] w-full text-center block" v-if="!showtemp"> {{ getTemperature(weather.main.temp) }}<span
              class="text-gray-600 text-[0.28rem]">°C</span></span>
          <span class="text-[0.35rem] w-full text-center block" v-else> {{ getTemperature(Math.round(weather.main.temp
            * 9 / 5 + 32)) }}<span
              class="text-gray-600 text-[0.28rem]">F</span></span>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full h-auto flex mt-[0.2rem]" v-else>
    <div v-for="weather in weatherDays" :key="weather.dt" class="w-full flex">
      <div class="w-full h-auto rounded-[0.4rem] bg-[#1b1a1d] text-white block mr-[0.2rem]">
        <div
          class="w-full h-auto rounded-t-[0.4rem] border-b-[1px] border-[white] text-[0.23rem] py-[0.2rem] flex justify-center items-center">
          <span>{{ getDay(weather.dt * 1000) }}</span>
        </div>
        <div class="w-full h-auto rounded-t-[0.4rem] text-[0.23rem] py-[0.2rem] block self-center">
          <img class="w-full self-center"
            :src="'https://openweathermap.org/img/wn/' + weather.weather[0].icon.slice(0, -1) + 'd@2x.png'"
            alt="weather-icon" />
          <span class="text-[0.35rem] w-full text-center block" v-if="!showtemp"> {{ getTemperature(weather.main.temp_max)
          }}<span class="text-gray-600 text-[0.28rem]">°C</span></span>
          <span class="text-[0.35rem] w-full text-center block" v-else> {{ getTemperature(Math.round(weather.main.temp_max
            * 9 / 5 + 32)) }}<span class="text-gray-600 text-[0.28rem]">F</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "Forecast",
  data: function () {
    return {
      checked: false,
      showtemp: false
    };
  },
  props: {
    weatherHours: Array,
    weatherDays: Array,
    checked: Boolean,
    temp: Boolean
  },
  methods: {
    getTemperature(temp) {
      return Math.round(temp);
    },

    getTime(date) {
      return new Date(date).toLocaleString("en-us", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },

    getDate(date) {
      return new Date(date).toLocaleString("en-us", {
        month: "short",
        day: "numeric",
      });
    },

    getDay(date) {
      return new Date(date).toLocaleString("en-us", {
        weekday: "short",
      });
    },
  },
  watch: {
    temp(value) {
      this.showtemp = value
    }
  },
  computed: {

  },
};
</script>