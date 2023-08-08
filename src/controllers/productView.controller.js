import { ProductModel } from '../DAO/mongo/models/products.model.js'
import { ROLES } from '../DAO/mongo/models/users.model.js'
import productManager from '../services/productService.js'

class ProductViewController {
  async realTime (req, res) {
    try {
      const { page } = req.query
      const productsPaginated = await ProductModel.paginate({}, { limit: 3, page: page || 1 })
      const { docs, ...rest } = productsPaginated
      const products = docs.map((item) => {
        return { _id: item._id, title: item.title, desc: item.desc, thumbnails: item.thumbnails, price: item.price }
      })
      return res.status(200).render('realTimeProducts', { name: 'WebSocket', products, pagination: rest })
    } catch (err) {
      res.status(400).json({
        error: 'Could not get the product list'
      })
    }
  }

  async oneProduct (req, res) {
    const { pid } = req.params
    try {
      const product = await productManager.getProductById(pid)
      return res.status(200).render('oneProduct', { name: product.title, product })
    } catch (err) {
      res.status(404).render('404')
    }
  }

  async viewProducts (req, res) {
    try {
      const { page, limit, query, sort } = req.query
      const productsPaginated = await ProductModel.paginate({}, { limit: limit || 3, page: page || 1, query: query || null, sort: sort || null })
      const { docs, ...rest } = productsPaginated
      const userSession = req.session.user
      if (userSession.role === ROLES.ADMIN) {
        userSession.isAdmin = true
      } else if (userSession.role === ROLES.USER) {
        userSession.isUser = true
      }
      const products = docs.map((item) => {
        return { _id: item._id, title: item.title, desc: item.desc, thumbnails: item.thumbnails, price: item.price }
      })
      return res.status(200).render('index', { name: 'Página de inicio', products, pagination: rest, user: userSession })
    } catch (err) {
      res.status(400).json({
        error: 'Could not get the product list'
      })
    }
  }
}

export default new ProductViewController()
