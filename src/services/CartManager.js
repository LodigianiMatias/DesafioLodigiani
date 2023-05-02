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
      return []
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
    if (!cart) throw new Error(`Carrito no encontrado con el id ${cid}`)
    return cart
  }

  async addProductsToCart (cid, pid) {
    const carts = await this.getCarts()
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) throw new Error(`Carrito no encontrado con el id ${cid}`)

    const productIndex = carts[cartIndex].products.findIndex(product => product.id === pid)
    if (productIndex === -1) {
      carts[cartIndex].products.push({ id: pid, quantity: 1 })
    } else {
      carts[cartIndex].products[productIndex].quantity += 1
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    return carts[cartIndex]
  }

  async deleteCart (cid) {
    const carts = await this.getCarts()
    const cartToDelete = carts.findIndex(cart => cart.id === cid)
    if (cartToDelete === -1) {
      throw new Error(`No se encontró el carrito con el id ${cid}`)
    }
    carts.splice(cartToDelete, 1)
    fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
  }
}

export default new CartManager('./src/database/cart.json')
