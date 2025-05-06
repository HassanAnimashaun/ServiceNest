import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import ReservationProfile from '@/views/ReservationProfile.vue'
import Reservation from '@/views/ReservationForm.vue'
import HomePage from '@/views/HomePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'profile/:id',
          name: 'dashboard-profile',
          component: ReservationProfile
        }
      ]
    }
  ],
})

export default router
