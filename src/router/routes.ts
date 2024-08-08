import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/templates/DefaultTemplate.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/:id',
    component: () => import('@/templates/DefaultTemplate.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'details',
        component: () => import('@/views/Details.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
]
