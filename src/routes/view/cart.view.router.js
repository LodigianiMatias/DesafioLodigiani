import { Router } from 'express'
import cartController from '../../controllers/cart.controller.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'

const app = Router()

app.get('/:cid', isLoguedIn, cartController.cartView)

export default app
