import productManager from '../services/productService.js'

class ProductController {
  async getProducts (req, res) {
    const queryParams = req.query
    try {
      const products = await productManager.getProducts(queryParams)
      res.status(200).json({
        success: true,
        products
      })
    } catch (err) {
      if (err.message === 'Pagination error') {
        return res.status(400).json({
          success: false,
          message: 'Pagination error'
        })
      }
      res.status(500).json({
        success: false,
        message: 'Unexpected error'
      })
    }
  }

  async getById (req, res) {
    const { pid } = req.params
    try {
      const product = await productManager.getProductById(pid)
      return res.status(200).json({
        success: true,
        payload: product
      })
    } catch (err) {
      if (err.message === `Product not found by id: ${pid}`) {
        return res.status(400).json({
          success: false,
          message: `Product not found by id: ${pid}`
        })
      }
      res.status(400).json({
        success: false,
        error: 'Product id not found'
      })
    }
  }

  async addProduct (req, res) {
    try {
      const productToAdd = req.body
      if (req.file) {
        req.body.thumbnails = `/thumbnails/${req.file.filename}`
      }
      const product = await productManager.addProduct(productToAdd, req.session.user)
      res.status(200).json({
        success: true,
        message: 'Product succesfully added',
        payload: product
      })
    } catch (err) {
      if (err.message === 'Product code already exists. Try with another code') {
        return res.status(409).json({
          success: false,
          error: 'Product code already exists. Try with another code'
        })
      }
      if (err.message === 'You must to complete all the fields') {
        return res.status(400).json({
          success: false,
          error: 'You must to complete all the fields'
        })
      }
      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          error: 'Product code already exists. Try with another one'
        })
      }
      return res.status(500).json({
        success: false,
        error: 'Unexpected error'
      })
    }
  }

  async updateProduct (req, res) {
    const idProduct = req.params.pid
    const newProduct = req.body
    try {
      const productModify = await productManager.updateProduct(idProduct, newProduct)
      res.status(200).json({
        status: true,
        message: 'Prodcut succesfully modified',
        payload: productModify
      })
    } catch (err) {
      if (err.message === `Product not found by id: ${idProduct}`) {
        return res.status(400).json({
          status: false,
          message: `Product not found by id ${idProduct}`
        })
      }
      if (err.message === 'You must to complete all the fields') {
        return res.status(400).json({
          status: false,
          message: 'You must to complete all the fields'
        })
      }
      res.status(500).json({
        status: false,
        message: 'Unexpected error',
        error: err
      })
    }
  }

  async deleteProduct (req, res) {
    const { pid } = req.params
    try {
      await productManager.deleteProduct(pid)
      res.status(200).json({
        status: true,
        message: 'Product succesfully deleted'
      })
    } catch (err) {
      if (err.message === `Product not found by id: ${pid}`) {
        return res.status(409).json({
          status: false,
          error: `Product not found by id: ${pid}`
        })
      }
      res.status(500).json({
        status: false,
        error: 'Unexpected error'
      })
    }
  }
}

export default new ProductController()
