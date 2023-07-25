import { Router } from 'express'
import carts from './cart.view.router.js'
import failLoginRouter from './faillogin.router.js'
import failRegisterRouter from './failregister.router.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'
import loginRouter from './login.router.js'
import productRouter from './product.router.js'
import productViewController from '../../controllers/productView.controller.js'
import realTimeChat from './chat.router.js'
import realTimeRouter from './realtime.router.js'
import registerRouter from './register.router.js'

const router = Router()

router.use('/realtimeproducts', realTimeRouter)
router.use('/chat', realTimeChat)
router.use('/cart', carts)
router.use('/products', productRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/failregister', failRegisterRouter)
router.use('/errorlogin', failLoginRouter)

router.get('/', isLoguedIn, productViewController.viewProducts)

export default router
