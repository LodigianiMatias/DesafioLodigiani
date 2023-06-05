import { CartModel } from '../DAO/models/carts.model.js'
import { ProductModel } from '../DAO/models/products.model.js'

class CartManager {
  async getCarts () {
    return await CartModel.find({})
  }

  async createCart () {
    return await CartModel.create({})
  }

  async getCartById (cid) {
    return await CartModel.findOne({ _id: cid }).populate('products.product', { title: 1, thumbnails: 1, desc: 1 }).orFail(new Error(`Cart not found with id: ${cid}`))
  }

  async addProductsToCart (cid, pid) {
    const product = await ProductModel.findOne({ _id: pid }).orFail(new Error(`Product not found with id: ${pid}`))
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
    if (productIndex === -1) {
      if (product.stock === 0) throw new Error('Not enough stock')
      cart.products.push({ product: product._id })
      return await cart.save()
    }

    if (product.stock < cart.products[productIndex].quantity + 1) throw new Error('Not enough stock')
    cart.products[productIndex].quantity += 1
    return await cart.save()
  }

  async removeProductsInCart (cid, pid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
    if (productIndex === -1) throw new Error(`Product not found with id: ${pid}`)
    cart.products.splice(productIndex, 1)
    return await cart.save()
  }

  async deleteCart (cid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
    cart.products = []
    return await cart.save()
  }
}

export default new CartManager()
