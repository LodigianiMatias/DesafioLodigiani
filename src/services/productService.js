// import ProductManager from '../DAO/mongo/productManager.mongo.js'

import { ProductManager } from '../DAO/facotry.js'

class ProductService {
  async getProducts (queryParams) {
    return await ProductManager.getProducts(queryParams)
  }

  async addProduct (product, user) {
    const userId = user._id
    return await ProductManager.addProduct(product, userId)
  }

  async getProductById (pid) {
    return await ProductManager.getProductById(pid)
  }

  async updateProduct (id, product) {
    return await ProductManager.updateProduct(id, product)
  }

  async deleteProduct (id) {
    return await ProductManager.deleteProduct(id)
  }
}

export default new ProductService()
