import CartManager from '../DAO/mongo/cartManager.mongo.js'

class CartService {
  async getCarts () {
    try {
      return await CartManager.getCarts()
    } catch (error) {
      console.log(error)
    }
  }

  async createCart () {
    try {
      return await CartManager.createCart()
    } catch (error) {
      console.log(error)
    }
  }

  async getCartById (cid) {
    try {
      return await CartManager.getCartById(cid)
    } catch (error) {
      console.log(error)
    }
  }

  async addProductsToCart (cid, pid) {
    try {
      return await CartManager.addProductsToCart(cid, pid)
    } catch (error) {
      console.log(error)
    }
  }

  async updateCart (cid, products) {
    try {
      return await CartManager.updateCart({ _id: cid }, products)
    } catch (error) {
      console.log(error)
    }
  }

  async updateProductQuantity (cid, pid, quantity) {
    try {
      return await CartManager.updateProductQuantity(cid, pid, quantity)
    } catch (error) {
      console.log(error)
    }
  }

  async removeProductsInCart (cid, pid) {
    try {
      return await CartManager.removeProductsInCart(cid, pid)
    } catch (error) {
      console.log(error)
    }
  }

  async getProductsByCartId (cartId) {
    try {
      const cartProducts = await CartManager.getProductsByCartId(cartId)
      return cartProducts
    } catch (err) {
      console.log('Falló mostrar los productos del cart.')
    }
  };

  async clearCart (cid) {
    return await CartManager.clearCart(cid)
  }
}

export default new CartService()
