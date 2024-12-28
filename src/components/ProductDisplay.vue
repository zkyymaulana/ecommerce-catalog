<template>
  <div class="page_container">
    <div class="background_split" :class="getBackgroundClass"></div>

    <div class="notifications">
      <div v-if="cartStore.showAddToCartAlert" class="notification success">
        Produk berhasil ditambahkan ke keranjang! 🛍️
      </div>

      <div v-if="cartStore.isCheckoutSuccess" class="notification success">
        Pembayaran berhasil! ✅
      </div>
    </div>

    <CartComponent />

    <div class="product_display">
      <div class="card_wrapper">
        <button @click="navigateProduct('prev')" class="nav-btn prev-btn" :disabled="loading">
          &lt;
        </button>

        <ProductSkeleton v-if="loading" />

        <div class="product_card" v-else>
          <div class="product_card-available" v-if="isProductAvailable">
            <div class="product_content">
              <div class="product_image">
                <img :src="products.data.image" :alt="products.data.title" />
              </div>

              <div class="product_info">
                <nav class="breadcrumb">
                  <a href="/">Katalogue</a> &gt; <a href="/products">Products</a> &gt;
                  <a href="#" class="current">{{ products.data.category }}</a>
                </nav>

                <h1 class="product_title">{{ products.data.title }}</h1>

                <div class="product_meta">
                  <div class="product_rating">
                    <div class="stars">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="star"
                        :class="{ filled: i <= Math.floor(products.data.rating.rate) }"
                      >
                        ★
                      </span>
                    </div>
                    <span class="rating_text">
                      {{ products.data.rating.rate }} ({{ products.data.rating.count }} ulasan)
                    </span>
                  </div>
                  <span class="product_category">{{ products.data.category }}</span>
                </div>

                <p class="product_description">{{ products.data.description }}</p>
              </div>
            </div>

            <div class="action-container">
              <div class="price-display">${{ products?.data?.price }}</div>
              <button @click="addToCart(products.data)" class="add-cart-btn">Add to Cart</button>
            </div>
          </div>

          <div class="product_card-unavailable" v-else>
            <img src="../assets/sad-face.png" alt="Product Unavailable" class="unavailable-image" />
            <p class="unavailable-text">301 Sorry, This product is unavailable to show</p>
          </div>
        </div>

        <button @click="navigateProduct('next')" class="nav-btn next-btn" :disabled="loading">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import CartComponent from './CartComponent.vue'
import Loader from './Loader.vue'
import ProductSkeleton from './ProductSkeleton.vue'

export default {
  name: 'ProductDisplayComponent',
  components: {
    CartComponent,
    Loader,
    ProductSkeleton,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useProductStore()
    const cartStore = useCartStore()
    const router = useRouter()

    return {
      store,
      cartStore,
      router,
    }
  },

  data() {
    return {
      isLoading: false,
    }
  },

  computed: {
    products() {
      return { data: this.store.currentProduct }
    },
    loading() {
      return this.isLoading
    },
    isProductAvailable() {
      return this.store.isProductAvailable
    },
    currentId() {
      return parseInt(this.id)
    },
    hasNextProduct() {
      return this.store.getNextProductId(this.currentId) !== null
    },
    hasPrevProduct() {
      return this.store.getPrevProductId(this.currentId) !== null
    },
    getBackgroundClass() {
      if (!this.isProductAvailable) return 'bg-gray'
      return this.products?.data?.category.includes("men's") ? 'bg-brightBlue' : 'bg-palePurple'
    },
    formatCategory() {
      if (!this.products?.data?.category) return ''
      const category = this.products.data.category
      if (category.includes("men's")) {
        return 'Man'
      } else if (category.includes("women's")) {
        return 'Women'
      }
      return category
    },
  },

  methods: {
    async navigateProduct(direction) {
      let newId = direction === 'next' ? this.currentId + 1 : this.currentId - 1

      if (newId > 20) {
        newId = 1
      } else if (newId < 1) {
        newId = 20
      }

      this.isLoading = true

      await new Promise((resolve) => setTimeout(resolve, 500))

      await this.router.push(`/products/${newId}`)

      this.isLoading = false
    },

    addToCart(product) {
      this.cartStore.addToCart(product)
    },
  },

  async mounted() {
    this.isLoading = true
    await this.store.fetchProduct(this.currentId)
    this.isLoading = false
  },

  watch: {
    async id(newId) {
      this.isLoading = true
      await this.store.fetchProduct(newId)
      this.isLoading = false
    },
  },
}
</script>

<style scoped>
.page_container {
  min-height: 100vh;
  position: relative;
  background-color: white;
}

.background_split {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  z-index: 0;
}

.bg-gray {
  background-color: #f5f5f5;
}
.bg-brightBlue {
  background-color: #e3f2fd;
}
.bg-palePurple {
  background-color: #f3e5f5;
}

.notifications {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification {
  padding: 1rem 2rem;
  border-radius: 8px;
  background: #4caf50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.3s ease;
}

.product_display {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_wrapper {
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.product_card {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  width: 800px;
  display: flex;
  flex-direction: column;
}

.product_card-available {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product_content {
  flex: 1;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.product_image {
  width: 300px;
  height: 300px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
}

.product_image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product_info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.product_title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product_description {
  color: #666;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-container {
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
}

.nav-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.nav-btn:active {
  transform: scale(0.95);
}

.price-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  background: #f8f9fa;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.add-cart-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(52, 152, 219, 0.3);
}

.add-cart-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .product_card {
    width: 700px;
  }

  .product_image {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .product_card {
    width: 100%;
    min-height: 600px;
  }

  .product_content {
    flex-direction: column;
    align-items: center;
  }

  .product_image {
    width: 200px;
    height: 200px;
  }

  .product_info {
    text-align: center;
  }

  .action-container {
    flex-direction: column;
    align-items: stretch;
  }

  .price-display {
    text-align: center;
  }
}

.breadcrumb {
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: #3498db;
}

.breadcrumb a.current {
  color: #3498db;
  font-weight: 500;
}

.product_meta {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.product_rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star.filled {
  color: #f1c40f;
}

.rating_text {
  color: #666;
  font-size: 0.9rem;
}

.product_category {
  background: #f1f8ff;
  color: #3498db;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  align-self: flex-start;
}

@media (max-width: 768px) {
  .product_meta {
    align-items: center;
  }

  .product_rating {
    flex-direction: column;
    align-items: center;
  }

  .product_category {
    align-self: center;
  }

  .breadcrumb {
    text-align: center;
  }

  .product_title {
    text-align: center;
  }

  .product_description {
    text-align: center;
    -webkit-line-clamp: 4;
  }
}

.product_card-unavailable {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.unavailable-image {
  width: 80%;
  height: 80%;
  object-fit: cover;
  opacity: 0.8;
}

.unavailable-text {
  font-size: 1.4rem;
  color: #666;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .unavailable-image {
    width: 100px;
    height: 100px;
  }

  .unavailable-text {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: wait;
}
</style>
