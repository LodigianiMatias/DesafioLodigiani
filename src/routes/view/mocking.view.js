import { Router } from 'express'
import mockController from '../../controllers/mock.controller.js'

const router = Router()

router.get('/', mockController.getMockgingProducts)

export default router
