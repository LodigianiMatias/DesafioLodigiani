import { Router } from 'express'
import cartRouter from './carts.api.router.js'
import productRouter from './products.api.router.js'
import sessionRouter from './sessionRouter.js'
import userRouter from './users.router.js'

const router = Router()

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
router.use('/session', sessionRouter)

export default router
