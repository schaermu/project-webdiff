import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  linkActiveClass: 'btn-accent',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/auth/RegisterView.vue'),
    },
    {
      path: '/verify-email/:token',
      name: 'verify-email',
      component: () => import('@/views/auth/VerifyEmailView.vue'),
    },
    {
      path: '/watches',
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'watch-list',
          component: () => import('@/views/WatchesView.vue'),
        },
        {
          path: ':id',
          name: 'watch-details',
          props: true,
          component: () => import('@/views/WatchDetails.vue'),
        },
      ],
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/login'
})

export default router
