import EErrors from '../../errors/enums.error.js'
import { ProductModel } from './models/products.model.js'
import customError from '../../errors/custom.error.js'

class ProductManager {
  async getProducts (queryParams) {
    const { limit = queryParams.limit || 10, page = queryParams.page || 1, sort, query } = queryParams
    const filter = {}

    if (query) {
      filter.$or = [
        { title: query }
      ]
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === 'desc' ? '-price' : 'price'
    }
    const result = await ProductModel.paginate(filter, options)
    if (!result) {
      customError.createError({
        name: 'Mongoose error',
        cause: 'Pagination',
        message: 'Pagination error',
        code: EErrors.PRODUCT_ERROR
      })
    }

    const response = {
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null
    }
    return response
  }

  async addProduct (product) {
    if (!product.title ||
            !product.desc ||
            !product.price ||
            !product.code ||
            !product.stock) {
      customError.createError({
        name: 'Fields error',
        cause: 'Empty fields',
        message: 'You must to complete all the fields',
        code: EErrors.PRODUCT_ERROR
      })
    }
    product.thumbnails = product.thumbnails ? product.thumbnails : '/thumbnails/placeholder.png'
    product.price = parseFloat(product.price)
    product.stock = parseInt(product.stock)
    product.code = parseInt(product.code)
    product.status = product.status ?? true
    let newProduct = null
    try {
      newProduct = await ProductModel.create(product)
    } catch (error) {
      customError.createError({
        name: 'Create Error',
        cause: 'Mongo',
        message: 'Could not create the product',
        code: EErrors.PRODUCT_ERROR
      })
    }
    return newProduct
  }

  async getProductById (pid) {
    return await ProductModel.findOne({ _id: pid }).orFail(
      customError.createError({
        name: 'Get Error',
        cause: 'Mongo',
        message: `Product not found by id: ${pid}`,
        code: EErrors.PRODUCT_ERROR
      })
    ).lean()
  }

  async updateProduct (id, product) {
    const searchProduct = await ProductModel.find({ _id: id })
    if (searchProduct === undefined) {
      customError.createError({
        name: 'Find error',
        cause: 'Mongo',
        message: `Product not found by id: ${id}`,
        code: EErrors.PRODUCT_ERROR
      })
    };

    if (!product.title ||
            !product.desc ||
            !product.price ||
            !product.code ||
            !product.stock) {
      customError.createError({
        name: 'Fields error',
        cause: 'Empty Fields',
        message: 'You must to complete all the fields',
        code: EErrors.PRODUCT_ERROR
      })
    }

    product.thumbnails = product.thumbnails ? product.thumbnails : '/thumbnails/placeholder.png'

    await ProductModel.updateOne({ _id: id }, product).orFail(
      customError.createError({
        name: 'Update error',
        cause: 'Mongo',
        message: 'Error updating product',
        code: EErrors.PRODUCT_ERROR
      })
    )
    return ProductModel.find({ _id: id }).orFail(
      customError.createError({
        name: 'Find error',
        cause: 'Mongo',
        message: 'Error on finding product',
        code: EErrors.PRODUCT_ERROR
      })
    )
  }

  async deleteProduct (id) {
    console.log(id)
    return await ProductModel.deleteOne({ _id: id }).orFail(
      customError.createError({
        name: 'Delete error',
        cause: 'Mongo',
        message: 'Error deleteing product',
        code: EErrors.PRODUCT_ERROR
      })
    )
  }
}

export default new ProductManager()
