import { hasRoles, isUser } from '../../middlewares/roles.middleware.js'

import { Router } from 'express'
import carts from './cart.view.router.js'
import failLoginRouter from './faillogin.router.js'
import failRegisterRouter from './failregister.router.js'
import formProducts from './formproducts.router.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'
import loggerRouter from './logger.js'
import loginRouter from './login.router.js'
import mockingRouter from './mocking.view.js'
import productRouter from './product.router.js'
import productViewController from '../../controllers/productView.controller.js'
import realTimeChat from './chat.router.js'
import realTimeRouter from './realtime.router.js'
import registerRouter from './register.router.js'
import ticketViewRouter from './ticker.router.js'
import { ROLES } from '../../DAO/mongo/models/users.model.js'

const router = Router()

router.use('/realtimeproducts', isLoguedIn, realTimeRouter)
router.use('/chat', isLoguedIn, isUser, realTimeChat)
router.use('/loggerTest', loggerRouter)
router.use('/cart', isLoguedIn, isUser, carts)
router.use('/products', isLoguedIn, productRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/failregister', failRegisterRouter)
router.use('/formproducts', isLoguedIn, hasRoles([ROLES.ADMIN, ROLES.USER_PREMIUM]), formProducts)
router.use('/errorlogin', failLoginRouter)
router.use('/mockingproducts', mockingRouter)
router.use('/ticket', ticketViewRouter)

router.get('/', isLoguedIn, productViewController.viewProducts)

export default router
