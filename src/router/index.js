import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDisplay from '../components/ProductDisplay.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products/1',
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductDisplay,
      props: true,
    },
  ],
})

export default router
