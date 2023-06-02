import { CartModel } from '../DAO/models/carts.model.js'
import { ProductModel } from '../DAO/models/products.model.js'

class CartManager {
  constructor (path) {
    this.path = path
  }

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
    const product = await ProductModel.findOne({ _id: pid }).orFail(new Error(`No se encontro el id del producto ${pid}`))
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`No se encontro el carrito con id ${cid}`))

    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)

    if (productIndex === -1) {
      if (product.stock === 0) throw new Error('No hay stock del producto solicitado')
      cart.products.push({ product: product._id })
      return await cart.save()
    }

    if (product.stock < cart.products[productIndex].quantity + 1) throw new Error('No hay stock del producto solicitado')
    cart.products[productIndex].quantity += 1
    return await cart.save()
  }

  async deleteCart (cid) {
    return await CartModel.deleteOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
  }
}

export default new CartManager('./src/database/cart.json')
