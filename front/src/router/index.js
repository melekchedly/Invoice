import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import About from '../views/About.vue'
import User from '@/views/User.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'Home',
      component: Home
    },
    {
      path:'/details/:id',
      name:'Details',
      component: Details
    },
    {
      path:'/about',
      name:'About',
      component: About
    },
    {
      path:'/user',
      name:'User',
      component: User
    },
  
  ]
})

export default router
