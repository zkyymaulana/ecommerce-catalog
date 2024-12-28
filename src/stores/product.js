import { defineStore } from 'pinia'
import { ProductService } from '../services'

export const useProductStore = defineStore('product', {
  state: () => ({
    allProducts: [],
    filteredProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    isProductAvailable: false,
    isLastProduct: false,
  }),

  actions: {
    async fetchAllProducts() {
      this.loading = true
      try {
        const products = await ProductService.getAllProducts()
        this.allProducts = products
        this.filteredProducts = ProductService.filterClothingProducts(products)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true
      try {
        if (this.allProducts.length === 0) {
          await this.fetchAllProducts()
        }

        const product = this.filteredProducts.find((p) => p.id === parseInt(id))

        if (product) {
          this.currentProduct = product
          this.isProductAvailable = true

          // Cek apakah ini produk terakhir dalam daftar yang difilter
          const currentIndex = this.filteredProducts.indexOf(product)
          this.isLastProduct = currentIndex === this.filteredProducts.length - 1
        } else {
          this.isProductAvailable = false
          this.currentProduct = null
        }
      } catch (error) {
        this.error = error.message
        this.isProductAvailable = false
      } finally {
        this.loading = false
      }
    },

    getNextProductId(currentId) {
      const currentIndex = this.filteredProducts.findIndex((p) => p.id === parseInt(currentId))
      if (currentIndex < this.filteredProducts.length - 1) {
        return this.filteredProducts[currentIndex + 1].id
      }
      return null
    },

    getPrevProductId(currentId) {
      const currentIndex = this.filteredProducts.findIndex((p) => p.id === parseInt(currentId))
      if (currentIndex > 0) {
        return this.filteredProducts[currentIndex - 1].id
      }
      return null
    },
  },
})
