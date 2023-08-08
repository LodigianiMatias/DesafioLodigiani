import { Router } from 'express'
import productViewController from '../../controllers/productView.controller.js'

const router = Router()

router.get('/', productViewController.realTime)

export default router
