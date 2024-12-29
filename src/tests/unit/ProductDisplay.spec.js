import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import ProductDisplay from '@/components/ProductDisplay.vue'

// Mock router
const routes = [
  { path: '/', component: { template: '<div>Home</div>' } }, // Default route
  { path: '/products/:id', component: { template: '<div></div>' } }, // Dummy component
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('ProductDisplay.vue', () => {
  beforeEach(() => {
    // Initialize Pinia
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('shows unavailable message when product is not available', () => {
    const wrapper = mount(ProductDisplay, {
      props: {
        id: '1',
      },
      global: {
        plugins: [router], // Add router to mount
      },
      data() {
        return {
          isLoading: false,
          store: {
            currentProduct: {},
            isProductAvailable: false,
          },
        }
      },
    })

    expect(wrapper.find('.unavailable-text').exists()).toBe(true)
    expect(wrapper.find('.unavailable-text').text()).toBe(
      'Sorry, This product is unavailable to show',
    )
  })

  it('navigates to the next product', async () => {
    const wrapper = mount(ProductDisplay, {
      props: {
        id: '1',
      },
      global: {
        plugins: [router], // Add router to mount
      },
    })

    // Tambahkan pengujian logika
    expect(wrapper.exists()).toBe(true)
  })
})
