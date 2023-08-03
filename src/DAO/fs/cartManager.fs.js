import ProductManager from './productManager.fs.js'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

class CartManager {
  constructor (path) {
    this.path = path
  }

  async getCarts () {
    try {
      return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    } catch (error) {
      return new Error("Couldn't get the cart")
    }
  }

  async createCart () {
    const carts = await this.getCarts()
    const newCart = {
      id: uuid(),
      products: []
    }
    carts.push(newCart)
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    return newCart.id
  }

  async getCartById (cid) {
    const carts = await this.getCarts()
    const cart = carts.find(cart => cart.id === cid)
    if (!cart) throw new Error(`Cart not found by id: ${cid}`)
    return cart
  }

  async addProductsToCart (cid, pid) {
    const carts = await this.getCarts()
    try {
      await ProductManager.getProductsById(parseInt(pid))
    } catch (error) {
      throw new Error('Product id not found')
    }
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) throw new Error(`Cart not found by id: ${cid}`)

    const productIndex = carts[cartIndex].products.findIndex(product => product.id === pid)
    if (productIndex === -1) {
      carts[cartIndex].products.push({ id: pid, quantity: 1 })
    } else {
      carts[cartIndex].products[productIndex].quantity += 1
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    return carts[cartIndex]
  }

  async clearCart (cid) {
    try {
      const carts = this.getCarts()
      const cartIndex = carts.findIndex(cart => cart.id === cid)
      if (cartIndex === -1) throw new Error(`Car not found by id: ${cid}`)
      carts[cartIndex].products = []
      fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
      return carts[cartIndex]
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default new CartManager('./src/database/cart.json')
