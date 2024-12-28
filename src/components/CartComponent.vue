<template>
  <!-- Overlay - hapus event click -->
  <div v-if="isOpen" class="cart-overlay"></div>

  <div class="cart-wrapper">
    <div class="cart-icon" @click="toggleCart">
      🛒
      <span class="cart-badge" v-if="cartStore.totalItems">{{ cartStore.totalItems }}</span>
    </div>

    <div class="mini-cart" :class="{ 'is-open': isOpen }" v-if="isOpen">
      <div class="cart-header">
        <div class="cart-tabs">
          <button :class="{ active: activeTab === 'cart' }" @click="activeTab = 'cart'">
            Keranjang
          </button>
          <button :class="{ active: activeTab === 'history' }" @click="activeTab = 'history'">
            Riwayat
          </button>
        </div>
        <!-- Hanya tombol close yang bisa menutup cart -->
        <button class="close-btn" @click="closeCart">×</button>
      </div>

      <CartItems v-if="activeTab === 'cart'" @checkout="handleCheckout" />

      <PurchaseHistory v-else :history="cartStore.purchaseHistory" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItems from './CartItems.vue'
import PurchaseHistory from './PurchaseHistory.vue'

export default {
  name: 'CartComponent',
  components: {
    CartItems,
    PurchaseHistory,
  },

  setup() {
    const cartStore = useCartStore()
    const isOpen = ref(false)
    const activeTab = ref('cart')
    const isProcessing = ref(false)

    const toggleCart = () => {
      isOpen.value = !isOpen.value
      if (isOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }

    const closeCart = () => {
      isOpen.value = false
      document.body.style.overflow = 'auto'
    }

    const handleCheckout = async () => {
      isProcessing.value = true
      try {
        await cartStore.processCheckout()
        closeCart()
      } catch (error) {
        console.error('Checkout failed:', error)
      } finally {
        isProcessing.value = false
      }
    }

    return {
      cartStore,
      isOpen,
      activeTab,
      isProcessing,
      toggleCart,
      closeCart,
      handleCheckout,
    }
  },
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 998;
}

.cart-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
}

.cart-icon {
  font-size: 2rem;
  cursor: pointer;
  position: relative;
  padding: 10px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
}

.mini-cart {
  position: fixed;
  top: 0;
  right: 0;
  width: 35vw;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.mini-cart.is-open {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cart-tabs {
  display: flex;
  flex: 1;
  border-bottom: 1px solid #eee;
}

.cart-tabs button {
  flex: 1;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.cart-tabs button.active {
  border-bottom: 2px solid #3498db;
  color: #3498db;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  line-height: 1;
}

.close-btn:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .mini-cart {
    width: 100vw;
  }
}
</style>
