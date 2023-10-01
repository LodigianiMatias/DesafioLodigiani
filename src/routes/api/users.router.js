import { Router } from 'express'
import { isAdmin } from '../../middlewares/roles.middleware'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.get('/', isAdmin, userController.getAllUsers)

export default router
