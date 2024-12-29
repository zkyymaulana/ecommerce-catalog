import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import CartComponent from '@/components/CartComponent.vue'
import { useCartStore } from '@/stores/cart'

// Mock router
const routes = [
  { path: '/', component: { template: '<div></div>' } } // Dummy component
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('CartComponent.vue', () => {
  let cartStore

  beforeEach(() => {
    // Inisialisasi Pinia dan Cart Store
    const pinia = createPinia()
    setActivePinia(pinia)
    cartStore = useCartStore()

    // Set state untuk testing
    cartStore.items = [
      { id: 1, title: 'Item 1', price: 100, quantity: 1 },
      { id: 2, title: 'Item 2', price: 200, quantity: 1 },
    ] // Menambahkan 2 item ke cart
    cartStore.purchaseHistory = [] // Set purchase history untuk testing
  })

  it('renders cart icon with badge when there are items in the cart', () => {
    const wrapper = mount(CartComponent, {
      global: {
        plugins: [router], // Menambahkan router ke mount
      },
    })

    // Pastikan ikon keranjang ada dan badge ditampilkan
    expect(wrapper.find('.cart-icon').exists()).toBe(true)
    expect(wrapper.find('.cart-badge').exists()).toBe(true)
    expect(wrapper.find('.cart-badge').text()).toBe('2') // Total items
  })

  it('closes the cart when the close button is clicked', async () => {
    const wrapper = mount(CartComponent, {
      global: {
        plugins: [createPinia()],  // Pastikan menggunakan pinia
      },
    })
  
    // Buka cart terlebih dahulu
    await wrapper.find('.cart-icon').trigger('click')
  
    // Pastikan cart terbuka
    const miniCart = wrapper.find('.mini-cart')
    expect(miniCart.exists()).toBe(true) // Pastikan elemen ada di DOM
    expect(miniCart.classes()).toContain('is-open') // Pastikan kelas 'is-open' ada
  
    // Klik tombol close untuk menutup
    await wrapper.find('.close-btn').trigger('click')
  
    // Tunggu pembaruan DOM dan pastikan elemen tertutup
    await wrapper.vm.$nextTick()  // Tunggu pembaruan DOM
    const updatedMiniCart = wrapper.find('.mini-cart')
  
    // Pastikan cart tertutup setelah klik tombol close
    expect(updatedMiniCart.exists()).toBe(false)  // Verifikasi bahwa elemen .mini-cart tidak ada di DOM lagi
  })
  

  it('opens the cart when the cart icon is clicked', async () => {
    const wrapper = mount(CartComponent)

    // Klik ikon keranjang untuk membuka cart
    await wrapper.find('.cart-icon').trigger('click')

    // Pastikan cart terbuka
    expect(wrapper.find('.mini-cart').classes()).toContain('is-open')
  })

  it('switches between cart and purchase history tabs', async () => {
    const wrapper = mount(CartComponent, {
      global: {
        plugins: [router], // Menambahkan router ke mount
      },
    })

    // Buka cart terlebih dahulu
    await wrapper.find('.cart-icon').trigger('click')

    // Pastikan tab cart aktif
    expect(wrapper.find('.cart-tabs button.active').text()).toBe('Keranjang')

    // Klik tab Riwayat
    await wrapper.find('.cart-tabs button:last-child').trigger('click')

    // Pastikan tab Riwayat aktif
    expect(wrapper.find('.cart-tabs button.active').text()).toBe('Riwayat')
  })
})
