import ProductManager from '../DAO/mongo/productManager.mongo.js'

class ProductService {
  async getProducts (queryParams) {
    return await ProductManager.getProducts(queryParams)
  }

  async addProduct (product) {
    return await ProductManager.addProduct(product)
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
