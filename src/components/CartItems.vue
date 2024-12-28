<template>
  <div class="cart-content">
    <div v-if="cartStore.items.length === 0" class="empty-cart">Keranjang kosong</div>
    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />
        <div class="cart-item-details">
          <p class="cart-item-title">{{ item.title }}</p>
          <p>${{ item.price }}</p>
          <div class="quantity-controls">
            <button @click="updateQuantity(item.id, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, 1)">+</button>
            <button class="remove-btn" @click="removeItem(item.id)">🗑️</button>
          </div>
        </div>
      </div>
      <div class="cart-total">Total: ${{ cartStore.totalPrice.toFixed(2) }}</div>
      <button @click="$emit('checkout')" class="checkout-btn" :disabled="isProcessing">
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

    return {
      cartStore,
      isProcessing,
      updateQuantity,
      removeItem,
    }
  },
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.cart-item-details {
  flex: 1;
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

.cart-total {
  margin-top: 1rem;
  font-weight: bold;
  text-align: right;
}
</style>
