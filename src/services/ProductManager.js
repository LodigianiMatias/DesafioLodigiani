import { ProductModel } from '../DAO/models/products.model.js'

export class ProductManager {
  async getProducts (lt) {
    return await ProductModel.find({}).limit(lt).lean()
  };

  async addProduct (product) {
    if (!product.title ||
            !product.desc ||
            !product.price ||
            !product.code ||
            !product.stock) {
      throw new Error('You must to complete all the fields')
    }
    product.thumbnails = product.thumbnails ? product.thumbnails : '/thumbnails/placeholder.png'
    product.price = parseFloat(product.price)
    product.stock = parseInt(product.stock)
    product.code = parseInt(product.code)
    product.status = product.status ?? true

    const newProduct = await ProductModel.create(product)
    return newProduct
  }

  async getProductById (id) {
    return await ProductModel.findOne({ _id: id }).orFail(new Error(`Product not found by id: ${id}`)).lean()
  }

  async updateProduct (id, product) {
    const searchProduct = await ProductModel.find({ _id: id })
    console.log(searchProduct)
    if (searchProduct === undefined) {
      throw new Error(`Product not found by id: ${id}`)
    };

    if (!product.title ||
            !product.desc ||
            !product.price ||
            !product.code ||
            !product.stock) {
      throw new Error('You must to complete all the fields')
    }

    product.thumbnails = product.thumbnails ? product.thumbnails : '/thumbnails/placeholder.png'

    await ProductModel.updateOne({ _id: id }, product)
    return ProductModel.find({ _id: id })
  }

  async deleteProduct (id) {
    console.log(id)
    return await ProductModel.deleteOne({ _id: id })
  }
}

export default new ProductManager()
