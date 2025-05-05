import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import ReservationProfile from '@/views/ReservationProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
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
