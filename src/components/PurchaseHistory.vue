<template>
  <div class="history-tab">
    <div v-if="history.length === 0" class="empty-history">Belum ada riwayat pembelian</div>
    <div v-else class="history-items">
      <div v-for="purchase in history" :key="purchase.id" class="history-item">
        <p class="history-date">{{ formatDate(purchase.date) }}</p>
        <div class="history-products">
          <div v-for="item in purchase.items" :key="item.id" class="history-product">
            <img :src="item.image" :alt="item.title" />
            <span>{{ item.quantity }}x</span>
          </div>
        </div>
        <p class="history-total">Total: ${{ purchase.totalPrice.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseHistory',

  props: {
    history: {
      type: Array,
      required: true,
    },
  },

  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
.history-tab {
  padding: 20px;
  background-color: #f9f9f9;
  height: 100%;
  max-height: 80vh;
  overflow-y: auto;
}
.empty-history {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
  padding: 2rem 0;
}

.history-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.history-item {
  background-color: white;
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.history-date {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1rem;
}

.history-products {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.history-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.history-product img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 6px;
}

.history-total {
  font-weight: bold;
  color: #333;
  text-align: right;
  font-size: 1.1rem;
}
</style>
