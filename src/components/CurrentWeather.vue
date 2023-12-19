<template>
  <div :class="load ? 'w-[100%] block overflow-y-hidden' : 'w-[100%] block overflow-y-auto'">
    <div class="flex w-full justify-between">
      <div class="w-full h-[0.6rem] flex items-center mt-[0.35rem]">
        <input type="checkbox" class="toggle toggle-secondary w-[1.1rem] h-[0.5rem]" v-model="checked"
          @click="getcheckedData()" />
        <span v-if="!checked" class="text-white text-[0.4rem] ml-[0.31rem]">Today's Weather</span>
        <span v-else class="text-white text-[0.4rem] ml-[0.31rem]">This Week Weather</span>
      </div>
      <div class="h-[0.6rem] flex items-center mt-[0.35rem]">
        <input type="checkbox" class="toggle toggle-secondary w-[1.1rem] h-[0.5rem]" v-model="temp"
          @click="changeTemp()" />
        <span v-if="!temp" class="text-white text-[0.4rem] ml-[0.31rem]">°C</span>
        <span v-else class="text-white text-[0.4rem] ml-[0.31rem]">F</span>
      </div>
    </div>

    <div class="w-full h-[0.6rem] flex">
      <span v-if="!checked" class="text-white text-[0.4rem]">Current Weather</span>
      <span v-else class="text-white text-[0.4rem]">Week Weather</span>
    </div>
    <div class="w-full h-auto block rounded-[0.38rem] text-black bg-[#bbd8ec] mt-[0.35rem]">
      <div class="w-full bg-[#adcade] text-[0.5rem] flex justify-between rounded-t-[0.38rem] font-semibold p-[0.274rem]">
        <span>{{ getCurrentDay }}</span>
        <span v-if="!checked">{{ getCurrentHour }}</span>
      </div>
      <div class="w-full h-auto lg:flex block justify-between rounded-t-[0.38rem] px-[0.274rem]">
        <div class="lg:w-[25%] w-full flex justify-center text-black text-[1.75rem] items-start lg:items-center">
          <span v-if="!temp">{{ temperature }}<span class="text-gray-500">°C</span></span>
          <span v-else>{{ Math.round(this.temperature * 9 / 5 + 32) }}<span class="text-gray-500">F</span></span>
        </div>
        <div class="lg:w-[25%] w-full flex justify-center items-start lg:items-center">
          <img v-if="icon" :src="'https://openweathermap.org/img/wn/' + icon.slice(0, -1) + 'd@2x.png'" alt="weather" class="md:!w-[3rem] !w-[200] " />
        </div>
        <div class="w-full flex justify-around lg:hidden">
          <div class="block justify-center text-black text-[0.315rem]">
            <div v-if="!temp"><span class="text-bold">Real feel: {{ Math.round(realFeel) }}<span>°C</span></span></div>
            <div v-else><span class="text-bold">Real feel: {{ Math.round(realFeel * 9 / 5 + 32) }}<span>F</span></span>
            </div>
            <div><span class="text-bold">Pressure: {{ pressure }} hPa</span></div>
            <div><span class="text-bold">Wind Speed: {{ currentSpeed }} m/s</span></div>
            <div><span class="text-bold flex ">Wind Direction: <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" data-slot="icon"
                  :class="'w-[0.4rem] h-auto rotate-[' + windDirection + 'deg] ml-[0.2rem]'">
                  <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </span></div>
            <div><span class="text-bold">Condition: {{ condition }}</span></div>
            <div><span class="text-bold">Visibility: {{ visibility / 1000 }} km</span></div>
          </div>
          <div class="block justify-center text-black text-[0.315rem] px-[0.3rem]">
            <div><span class="text-bold">Humidity: {{ humidity }} %</span></div>
            <div><span class="text-bold">Cloudiness: {{ cloudniess }} %</span></div>
            <div><span class="text-bold">Sunrise: {{ formatHour(sunrise * 1000) }}</span></div>
            <div><span class="text-bold">Sunset: {{ formatHour(sunset * 1000) }}</span></div>
            <div v-if="!temp"><span class="text-bold">Min Temp: {{ minTemp }}<span>°C</span></span>
            </div>
            <div v-else><span class="text-bold">Min Temp: {{ Math.round(this.minTemp * 9 / 5 + 32) }}<span>F</span></span>
            </div>
            <div v-if="!temp"><span class="text-bold">Max Temp: {{ maxTemp }}<span>°C</span></span>
            </div>
            <div v-else><span class="text-bold">Max Temp: {{ Math.round(this.maxTemp * 9 / 5 + 32) }}<span>F</span></span>
            </div>
          </div>
        </div>
        <div class="w-full hidden lg:flex">
          <div class="w-full block justify-center text-black text-[0.315rem] my-[0.3rem]">
            <div v-if="!temp"><span class="text-bold">Real feel: {{ Math.round(realFeel) }}<span>°C</span></span></div>
            <div v-else><span class="text-bold">Real feel: {{ Math.round(realFeel * 9 / 5 + 32) }}<span>F</span></span>
            </div>
            <div><span class="text-bold">Pressure: {{ pressure }} hPa</span></div>
            <div><span class="text-bold">Wind Speed: {{ currentSpeed }} m/s</span></div>
            <div><span class="text-bold flex ">Wind Direction: <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" data-slot="icon"
                  :class="'w-[0.4rem] h-auto rotate-[' + windDirection + 'deg] ml-[0.2rem]'">
                  <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </span></div>
            <div><span class="text-bold">Condition: {{ condition }}</span></div>
            <div><span class="text-bold">Visibility: {{ visibility / 1000 }} km</span></div>
          </div>
          <div class="w-full block justify-center text-black text-[0.315rem] px-[0.3rem] my-[0.3rem]">
            <div><span class="text-bold">Humidity: {{ humidity }} %</span></div>
            <div><span class="text-bold">Cloudiness: {{ cloudniess }} %</span></div>
            <div><span class="text-bold">Sunrise: {{ formatHour(sunrise * 1000) }}</span></div>
            <div><span class="text-bold">Sunset: {{ formatHour(sunset * 1000) }}</span></div>
            <div v-if="!temp"><span class="text-bold">Min Temp: {{ minTemp }}<span>°C</span></span>
            </div>
            <div v-else><span class="text-bold">Min Temp: {{ Math.round(this.minTemp * 9 / 5 + 32) }}<span>F</span></span>
            </div>
            <div v-if="!temp"><span class="text-bold">Max Temp: {{ maxTemp }}<span>°C</span></span>
            </div>
            <div v-else><span class="text-bold">Max Temp: {{ Math.round(this.maxTemp * 9 / 5 + 32) }}<span>F</span></span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <span v-if="!checked" class="w-full text-white text-[0.34rem]">Next Couple of Hours</span>
    <span v-else class="w-full text-white text-[0.34rem]">Next 5 Days</span>
    <Forecast :weatherHours="weatherHours" :weatherDays="weatherDays" :checked="checked" :temp="temp"></Forecast>
    <Loader :loadingState="load"></Loader>
  </div>
</template>
  
<script>
import axios from "axios";
import Forecast from "./Forecast.vue";
import Loader from "./Loader.vue";
export default {
  name: "CurrentWeather",
  components: {
    Forecast,
    Loader
  },
  data() {
    return {
      checked: false,
      temp: false,
      load: false,
      temperature: "",
      pressure: "",
      humidity: "",
      cloudniess: "",
      condition: "",
      sunrise: "",
      sunset: "",
      minTemp: "",
      maxTemp: "",
      visibility: "",
      realFeel: "",
      icon: "",
      weatherDays: [],
      weatherHours: [],
      windSpeed: [],
      currentSpeed: "",
      windDirection: ""
    };
  },
  props: {
    lat: { type: Number, default: 0 },
    lon: { type: Number, default: 0 },
  },
  methods: {
    getcheckedData(event) {
      this.checked = !this.checked;
    },
    changeTemp() {
      this.temp = !this.temp;
    },

    formatHour(hour) {
      let date = new Date(hour);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)

      return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
    },

    async getWeatherNextHours(lat, lon) {
      // Clear the array
      this.load = true;
      this.weatherHours = [];
      await axios.get(
        `https://api.openweathermap.org/data/2.5//forecast?lat=${lat}&lon=${lon}&units=metric&appid=f7eca4cea3e42d0a44c4a8375976e415`
      ).then((data) => {
        const currentTime = new Date().getTime() / 1000;
        data.data.list.forEach((weather) => {
          if (weather.dt > currentTime && this.weatherHours.length < 5) {
            this.weatherHours.push(weather);
            this.load = false
          }
        });
      });
    },

    async getWeatherNextDays(lat, lon) {
      this.load = true;
      let auxWeather = [];
      //Empty the array
      this.weatherDays = [];
      await axios.get(
        `https://api.openweathermap.org/data/2.5//forecast?lat=${lat}&lon=${lon}&units=metric&appid=f7eca4cea3e42d0a44c4a8375976e415`
      ).then((data) => {
        auxWeather = data.data.list;
        let auxDate = "";
        const currenDate = new Date().toLocaleString("en-us", {
          day: "numeric",
          month: "long",
          year: "2-digit",
        });
        auxWeather.forEach((weather) => {
          let weatherDate = new Date(weather.dt * 1000).toLocaleString("en-us", {
            day: "numeric",
            month: "long",
            year: "2-digit",
          });

          if (auxDate != weatherDate && weatherDate != currenDate) {
            this.weatherDays.push(weather);
          }
          auxDate = weatherDate;
        });
        this.load = false;
      });
    },

    async getWindSpeed(lat, lon) {
      this.load = true;
      let allWeather = [];
      //Clear speedWind
      this.windSpeed = [];
      await axios.get(
        `https://api.openweathermap.org/data/2.5//forecast?lat=${lat}&lon=${lon}&units=metric&appid=f7eca4cea3e42d0a44c4a8375976e415`
      ).then((data) => {
        allWeather = data.data.list;
        allWeather.forEach(weather => {
          if (this.windSpeed.length < 5)
            this.windSpeed.push([
              new Date(weather.dt_txt).toLocaleString("en-us", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              }),
              weather.wind.speed,
            ]);
        });
        this.load = false;
      });
    },
  },
  watch: {
    async lat(newLat, oldLat) {
      if (newLat !== oldLat) {
        this.load = true;
        await axios.get(`https://api.openweathermap.org/data/2.5//weather?lat=${newLat}&lon=${this.$props.lon}&units=metric&appid=f7eca4cea3e42d0a44c4a8375976e415`).then((res) => {
          this.realFeel = res.data.main.feels_like;
          this.humidity = res.data.main.humidity;
          this.pressure = res.data.main.pressure;
          this.temperature = Math.round(res.data.main.temp);
          this.minTemp = res.data.main.temp_min;
          this.maxTemp = res.data.main.temp_max;
          this.visibility = res.data.visibility;
          this.sunrise = res.data.sys.sunrise;
          this.sunset = res.data.sys.sunset;
          this.cloudniess = res.data.clouds.all;
          this.condition = res.data.weather[0].description;
          this.icon = res.data.weather[0].icon;
          this.currentSpeed = res.data.wind.speed;
          this.windDirection = res.data.wind.deg;
          this.getWeatherNextDays(newLat, this.$props.lon);
          this.getWeatherNextHours(newLat, this.$props.lon);
          this.getWindSpeed(newLat, this.$props.lon);
          this.load = false;
        });
      }
    }
  },
  computed: {
    getCurrentHour() {
      return new Date().toLocaleString("en-us", { hour: "2-digit", minute: "2-digit" });
    },

    getCurrentDay() {
      return new Date().toLocaleString("en-us", { weekday: "long" });
    },
  },
};
</script>