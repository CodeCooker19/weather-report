
<script>
import { event } from 'vue-gtag';
import { useHead } from '@unhead/vue';

event('Home', { method: 'Google' });
export default {
  name:"HomeView",
  
  methods:{
    head:()=>{
      return useHead({
        title:"HomeView",
        meta:[{
          name:"author",
          content:"freddielin"
        }]
      })
    }
  }
}
 
</script>

<template>
  <div class="bg-gray-800 flex relative w-screen h-screen items-center justify-center flex-col">
      <div class="text-white text-xl font-bold  ">
        Vite + Vue + Tailwind + Vuex + VueRouter
      </div>
      <a href="https://github.com/lolvOid/vite-vue-tailwind-vuex-template" target="_blank" class="text-7xl text-white hover:text-cyan-400">
        <fa-icon icon="fa-brands fa-github"></fa-icon>
        
      </a>
  </div>
</template>

