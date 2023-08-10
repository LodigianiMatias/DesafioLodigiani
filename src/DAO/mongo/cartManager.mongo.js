import { CartModel } from './models/carts.model.js'
import EErrors from '../../errors/enums.error.js'
import { ProductModel } from './models/products.model.js'
import customError from '../../errors/custom.error.js'

class CartManager {
  async getCarts () {
    try {
      return await CartModel.find({}).orFail(
        customError.createError({
          name: 'Find error',
          cause: 'Mongo',
          message: 'Error getting carts',
          code: EErrors.CART_ERROR
        }))
    } catch (err) {
      console.log(err.message)
    }
  }

  async createCart () {
    try {
      return await CartModel.create({}).orFail(
        customError.createError({
          name: 'Create error',
          cause: 'Mongo',
          message: 'Error creating cart',
          code: EErrors.CART_ERROR
        })
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  async getCartById (cid) {
    try {
      return await CartModel.findOne({ _id: cid }).populate('products.product', { title: 1, thumbnails: 1, desc: 1, price: 1 }).lean().orFail(
        customError.createError({
          name: 'Find error',
          cause: 'Mongo',
          message: `Cart not found with id: ${cid}`,
          code: EErrors.CART_ERROR
        })
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  async addProductsToCart (cid, pid) {
    try {
      const product = await ProductModel.findOne({ _id: pid }).orFail(
        customError.createError({
          name: 'Find error',
          cause: 'Mongo',
          message: `Product not found by id: ${pid}`,
          code: EErrors.PRODUCT_ERROR
        })
      )
      const cart = await CartModel.findOne({ _id: cid }).orFail(
        customError.createError({
          name: 'Find error',
          cause: 'Mongo',
          message: `Cart not found with id: ${cid}`,
          code: EErrors.CART_ERROR
        })
      )
      const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
      if (productIndex === -1) {
        if (product.stock === 0) {
          customError.createError({
            name: 'Stock error',
            cause: 'Stock',
            message: 'Not enough stock',
            code: EErrors.PRODUCT_ERROR
          })
        }
        cart.products.push({ product: product._id, quantity: 1 })
        return await cart.save()
      }
      if (product.stock < cart.products[productIndex].quantity + 1) {
        customError.createError({
          name: 'Stock error',
          cause: 'Stock',
          message: 'Not enough stock',
          code: EErrors.PRODUCT_ERROR
        })
      }
      cart.products[productIndex].quantity += 1
      return await cart.save()
    } catch (err) {
      console.log(err.message)
    }
  }

  async updateCart (cid, products) {
    return await CartModel.findByIdAndUpdate(cid, { products }, { new: true }).orFail(
      customError.createError({
        name: 'Update error',
        cause: 'Mongo',
        message: 'Error updating cart',
        code: EErrors.CART_ERROR
      })
    )
  }

  async updateProductQuantity (cid, pid, quantity) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(
      customError.createError({
        name: 'Find error',
        cause: 'Mongo',
        message: `Cart not found with id: ${cid}`,
        code: EErrors.CART_ERROR
      })
    )
    const productIndex = cart.products.findIndex((p) => p.product.toString() === pid)
    if (productIndex === -1) {
      customError.createError({
        name: 'Find error',
        cause: 'No product',
        message: 'Product not found in cart',
        code: EErrors.CART_ERROR
      })
    }
    cart.products[productIndex].quantity = quantity
    return await cart.save()
  }

  async removeProductsInCart (cid, pid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(
      customError.createError({
        name: 'Find error',
        cause: 'Mongo',
        message: `Cart not found with id: ${cid}`,
        code: EErrors.CART_ERROR
      })
    )
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
    if (productIndex === -1) {
      customError.createError({
        name: 'Find error',
        cause: 'Mongo',
        message: `Product not found by id: ${pid}`,
        code: EErrors.PRODUCT_ERROR
      })
    }
    cart.products.splice(productIndex, 1)
    return await cart.save()
  }

  async clearCart (cid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(
      customError.createError({
        name: 'Find error',
        cause: 'Mongo',
        message: `Cart not found with id: ${cid}`,
        code: EErrors.CART_ERROR
      })
    )
    cart.products = []
    return await cart.save()
  }
}

export default new CartManager()
