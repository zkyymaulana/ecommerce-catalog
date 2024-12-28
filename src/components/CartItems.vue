<template>
  <div class="cart-content">
    <div v-if="cartStore.items.length === 0" class="empty-cart">Keranjang kosong</div>
    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />
        <div class="cart-item-details">
          <p class="cart-item-title">{{ item.title }}</p>
          <p>${{ item.price.toFixed(2) }}</p>
          <div class="quantity-controls">
            <button @click="updateQuantity(item.id, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, 1)">+</button>
            <button class="remove-btn" @click="removeItem(item.id)">🗑️</button>
          </div>
        </div>
      </div>
      <div class="cart-total">Total: ${{ cartStore.totalPrice.toFixed(2) }}</div>
      <button @click="handleCheckout" class="checkout-btn" :disabled="isProcessing">
        {{ isProcessing ? 'Memproses...' : 'Bayar Sekarang' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

export default {
  name: 'CartItems',

  setup() {
    const cartStore = useCartStore()
    const isProcessing = ref(false)

    const updateQuantity = (itemId, change) => {
      cartStore.updateQuantity(itemId, change)
    }

    const removeItem = (itemId) => {
      cartStore.removeFromCart(itemId)
    }

    const handleCheckout = async () => {
      isProcessing.value = true // Set loading to true
      try {
        await cartStore.processCheckout()
      } catch (error) {
      } finally {
        isProcessing.value = false
        alert('Berhasil melakukan pembayaran!')
      }
    }

    return {
      cartStore,
      isProcessing,
      updateQuantity,
      removeItem,
      handleCheckout,
    }
  },
}
</script>

<style scoped>
.cart-content {
  padding: 20px;
  background-color: #f9f9f9;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
  padding: 2rem 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd; /* Menambahkan batas bawah */
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: contain; /* Menjaga gambar tetap proporsional tanpa terpotong */
  border-radius: 6px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.remove-btn {
  margin-left: auto;
  background: none !important;
  border: none !important;
  cursor: pointer;
}

.cart-total {
  margin-top: 1rem;
  font-weight: bold;
  text-align: right;
  font-size: 1.1rem;
}

.checkout-btn {
  width: 100%;
  padding: 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
