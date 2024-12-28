const BASE_URL = 'https://fakestoreapi.com'

export const ProductService = {
  async getAllProducts() {
    try {
      const response = await fetch(`${BASE_URL}/products`)
      if (!response.ok) {
        throw new Error('Gagal mengambil data')
      }
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  filterClothingProducts(products) {
    return products.filter(
      (product) => product.category === "men's clothing" || product.category === "women's clothing",
    )
  },
}
