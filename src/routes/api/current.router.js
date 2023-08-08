import { Router } from 'express'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.get('/', isLoguedIn, userController.currentSession)

export default router
