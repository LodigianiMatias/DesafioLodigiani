import { Router } from 'express'
import cartRouter from './carts.api.router.js'
import productRouter from './products.router.js'

const router = Router()

router.use('/products', productRouter)
router.use('/cart', cartRouter)

export default router
