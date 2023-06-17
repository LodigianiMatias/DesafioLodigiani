import { ProductModel } from '../../DAO/models/products.model.js'
import { Router } from 'express'
import carts from './cart.view.router.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'
import loginRouter from './login.router.js'
import productRouter from './product.router.js'
import realTimeChat from './chat.router.js'
import realTimeRouter from './realtime.router.js'
import registerRouter from './register.router.js'
import sessionRouter from './session.router.js'

const router = Router()

router.use('/realtimeproducts', realTimeRouter)
router.use('/chat', realTimeChat)
router.use('/cart', carts)
router.use('/session', sessionRouter)
router.use('/products', productRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)

router.get('/', isLoguedIn, async (req, res) => {
  try {
    const { page, limit, query, sort } = req.query
    const productsPaginated = await ProductModel.paginate({}, { limit: limit || 3, page: page || 1, query: query || null, sort: sort || null })
    const { docs, ...rest } = productsPaginated
    const products = docs.map((item) => {
      return { _id: item._id, title: item.title, desc: item.desc, thumbnails: item.thumbnails, price: item.price }
    })
    return res.status(200).render('index', { name: 'Página de inicio', products, pagination: rest, user: req.session.user })
  } catch (err) {
    res.status(400).json({
      error: 'Could not get the product list'
    })
  }
})

export default router
