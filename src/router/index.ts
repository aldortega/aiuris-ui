import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/documentos/generador',
      name: 'document-generator',
      component: () => import('@/views/documents/DocumentGeneratorView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/perfil',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/preferencias',
      name: 'preferences',
      component: () => import('@/views/PreferencesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/primer-inicio/cambiar-contrasena',
      name: 'first-login-password',
      component: () => import('@/views/auth/FirstLoginPasswordView.vue'),
      meta: { requiresAuth: true, allowFirstLogin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/recuperar-contrasena',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (auth.isAuthenticated && auth.needsPasswordChange && !to.meta.allowFirstLogin) {
    return next({ name: 'first-login-password' })
  }

  if (to.meta.allowFirstLogin) {
    if (!auth.isAuthenticated) {
      return next({ name: 'login' })
    }

    if (!auth.needsPasswordChange) {
      return next({ name: 'home' })
    }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({
      name: 'login',
      query: to.fullPath && to.fullPath !== '/' ? { redirect: to.fullPath } : undefined,
    })
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    if (auth.needsPasswordChange) {
      return next({ name: 'first-login-password' })
    }

    return next({ name: 'home' })
  }

  return next()
})

export default router
