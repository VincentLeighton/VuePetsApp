import { createRouter, createWebHistory } from 'vue-router'
import PetListView from '@/views/PetListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PetListView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/add-pet',
      name: 'add-pet',
      component: () => import('../views/AddPetView.vue'),
    },
  ],
})

export default router
