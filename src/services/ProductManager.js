import { ProductModel } from '../DAO/models/products.model.js'

export class ProductManager {
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
    const result = await ProductModel.paginate(filter, options).orFail('Pagination error')

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

  async getProductById (pid) {
    return await ProductModel.findOne({ _id: pid }).orFail(new Error(`Product not found by id: ${pid}`)).lean()
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
