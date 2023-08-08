import { Router } from 'express'
import cartController from '../../controllers/cart.controller.js'

const app = Router()

app.get('/:cid', cartController.cartView)

export default app
