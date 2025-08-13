import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ReservationProfile from '@/views/ReservationProfile.vue';
import Reservation from '@/views/ReservationForm.vue';
import ConfirmationPage from '@/views/ConfirmationPage.vue';
import { useAuthStore } from '@/stores/auth';

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
          component: ReservationProfile,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.user) {
    await auth.fetchUser();
  }

  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth && !auth.isAuthenticated) {
    return next('/login');
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return next('/dashboard');
  }

  next();
});

export default router;
