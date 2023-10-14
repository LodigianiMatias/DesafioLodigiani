import { CartModel } from './models/carts.model.js'
import { ProductModel } from './models/products.model.js'

class CartManager {
  async getCarts () {
    try {
      return await CartModel.find({}).orFail(new Error('Error getting carts'))
    } catch (err) {
      console.log(err.message)
    }
  }

  async createCart () {
    try {
      return await CartModel.create({})
    } catch (err) {
      console.log('Error creating cart')
    }
  }

  async getCartById (cid) {
    try {
      return await CartModel.findOne({ _id: cid }).populate('products.product', { title: 1, thumbnails: 1, desc: 1, price: 1 }).lean().orFail(`Cart not found with id: ${cid}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  async getProductsByCartId (cartId) {
    try {
      const cart = await CartModel.findOne({ _id: cartId }).populate('products.product', { _id: 1, price: 1, stock: 1 }).lean().orFail(new Error(`Cart not found with id: ${cartId}`))

      const cartProducts = cart.products
      return { cartProducts }
    } catch (err) {
      console.log(err.message)
    }
  }

  async addProductsToCart (cid, pid) {
    try {
      const product = await ProductModel.findOne({ _id: pid }).orFail(new Error(`Product not found by id: ${pid}`))
      const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
      const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
      if (productIndex === -1) {
        if (product.stock === 0) throw new Error('Not enough stock')
        cart.products.push({ product: product._id, quantity: 1 })
        return await cart.save()
      }
      if (product.stock < cart.products[productIndex].quantity + 1) { throw new Error('Not enough stock') }
      cart.products[productIndex].quantity += 1
      return await cart.save()
    } catch (err) {
      console.log(err.message)
    }
  }

  async updateCart (cid, cartUpdate) {
    try {
      const updatedCart = await CartModel.findOneAndUpdate(cid, { products: cartUpdate }, { new: true })
      console.log({ updatedCart: updatedCart.products })
      return updatedCart
    } catch (err) {
      console.log(err)
    };
  };

  async updateProductQuantity (cid, pid, quantity) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
    const productIndex = cart.products.findIndex((p) => p.product.toString() === pid)
    if (productIndex === -1) throw new Error('Product not found in cart')
    cart.products[productIndex].quantity = quantity
    return await cart.save()
  }

  async removeProductsInCart (cid, pid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
    if (productIndex === -1) throw new Error(`Product not found by id: ${pid}`)
    cart.products.splice(productIndex, 1)
    return await cart.save()
  }

  async clearCart (cid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new Error(`Cart not found with id: ${cid}`))
    cart.products = []
    return await cart.save()
  }
}

export default new CartManager()
