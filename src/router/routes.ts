import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/templates/UnauthTemplate.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('@/templates/AuthTemplate.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/booking',
    component: () => import('@/templates/BookingTemplate.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Booking',
        component: () => import('@/views/BookingDetails.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
]
