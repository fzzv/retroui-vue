import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/components/button',
  },
  {
    path: '/components/button',
    name: 'Button',
    component: () => import('../components/button.vue'),
  },
  {
    path: '/components/icon',
    name: 'Icon',
    component: () => import('../components/icon.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
