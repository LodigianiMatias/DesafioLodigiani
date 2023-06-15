import { ProductModel } from '../DAO/models/products.model.js'
import { Router } from 'express'
import carts from './cart.view.router.js'
import productManager from '../services/ProductManager.js'
import realTimeChat from './chat.router.js'
import realTimeRouter from './realtime.router.js'
import sessionRouter from './session.router.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { page, limit, query, sort } = req.query
    const productsPaginated = await ProductModel.paginate({}, { limit: limit || 3, page: page || 1, query: query || null, sort: sort || null })
    const { docs, ...rest } = productsPaginated
    const products = docs.map((item) => {
      return { _id: item._id, title: item.title, desc: item.desc, thumbnails: item.thumbnails, price: item.price }
    })
    return res.status(200).render('index', { name: 'Página de inicio', products, pagination: rest })
  } catch (err) {
    res.status(400).json({
      error: 'Could not get the product list'
    })
  }
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productManager.getProductById(pid)
    return res.status(200).render('oneProduct', { name: product.title, product })
  } catch (err) {
    return []
  }
})

router.use('/realtimeproducts', realTimeRouter)
router.use('/chat', realTimeChat)
router.use('/cart', carts)
router.use(('/session', sessionRouter))

export default router
