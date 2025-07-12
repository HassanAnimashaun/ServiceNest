import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ReservationProfile from '@/views/ReservationProfile.vue';
import Reservation from '@/views/ReservationForm.vue';
import ConfirmationPage from '@/views/ConfirmationPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'reservation',
      component: Reservation,
    },
    {
      path: '/confirmation',
      name: 'ConfirmationPage',
      component: ConfirmationPage,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'profile/:id',
          name: 'dashboard-profile',
          meta: { requiresAuth: true },
          component: ReservationProfile,
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    // User not logged in → redirect to login
    return next('/login');
  }

  next(); // Allow navigation
});

export default router;
