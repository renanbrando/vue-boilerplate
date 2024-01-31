import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const token = localStorage.getItem('token-concierge')

  if (requiresAuth) {
    if (token?.length) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
