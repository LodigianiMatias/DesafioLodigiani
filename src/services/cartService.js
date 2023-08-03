import CartManager from '../DAO/mongo/cartManager.mongo.js'

class CartService {
  async getCarts () {
    return await CartManager.getCarts()
  }

  async createCart () {
    return await CartManager.createCart()
  }

  async getCartById (cid) {
    return await CartManager.getCartById(cid)
  }

  async addProductsToCart (cid, pid) {
    return await CartManager.addProductsToCart(cid, pid)
  }

  async updateCart (cid, products) {
    return await CartManager.updateCart(cid, products)
  }

  async updateProductQuantity (cid, pid, quantity) {
    return await CartManager.updateProductQuantity(cid, pid, quantity)
  }

  async removeProductsInCart (cid, pid) {
    return await CartManager.removeProductsInCart(cid, pid)
  }

  async clearCart (cid) {
    return await CartManager.clearCart(cid)
  }
}

export default new CartService()
