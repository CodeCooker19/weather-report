<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { event } from 'vue-gtag'
import {useHead} from "@unhead/vue";
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
const store = useStore();
const stack = computed(() => {
    return store.state.stack
})

event('app', { method: 'Google' })

const app = createApp(App);
app.use(PrimeVue);

useHead({
      
        meta:[{
          name:"description",
          content:"Vite+Vue+Tailwind"
        },{
          name:"author",
          content:"freddielin"
        }]
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>

</style>
