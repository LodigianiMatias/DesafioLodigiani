import { Router } from 'express'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'
import productViewController from '../../controllers/productView.controller.js'

const router = Router()

router.get('/', isLoguedIn, productViewController.realTime)

export default router
