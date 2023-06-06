import { ProductModel } from '../DAO/models/products.model.js'
import { Router } from 'express'
import realTimeChat from './chat.router.js'
import realTimeRouter from './realtime.router.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { page } = req.query
    const productsPaginated = await ProductModel.paginate({}, { limit: 3, page: page || 1 })
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

router.use('/', realTimeRouter)
router.use('/', realTimeChat)

export default router
