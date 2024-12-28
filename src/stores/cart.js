import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    purchaseHistory: [],
    isCheckoutSuccess: false,
    showAddToCartAlert: false,
  }),

  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      }

      // Tampilkan alert
      this.showAddToCartAlert = true
      setTimeout(() => {
        this.showAddToCartAlert = false
      }, 2000)
    },

    updateQuantity(itemId, change) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        item.quantity += change
        if (item.quantity <= 0) {
          this.removeFromCart(itemId)
        }
      }
    },

    removeFromCart(itemId) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },

    processCheckout() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.purchaseHistory.push({
            id: Date.now(),
            items: [...this.items],
            totalPrice: this.totalPrice,
            date: new Date().toISOString(),
          })
          this.items = []
          this.isCheckoutSuccess = true
          setTimeout(() => {
            this.isCheckoutSuccess = false
          }, 3000)
          resolve(true)
        }, 2000)
      })
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cart',
        storage: localStorage,
        paths: ['purchaseHistory'],
      },
    ],
  },
})
