<template>
  <div class="history-tab" style="background-color: aqua">
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
.history-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.history-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.history-products {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.history-product {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-product img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.history-total {
  margin-top: 0.5rem;
  font-weight: bold;
  text-align: right;
}
</style>
