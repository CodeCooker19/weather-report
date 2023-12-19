import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'


const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
  
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
