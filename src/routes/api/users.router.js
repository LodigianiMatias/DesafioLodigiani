import { Router } from 'express'
import { isAdmin } from '../../middlewares/roles.middleware.js'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.get('/', isAdmin, userController.getAllUsers)
router.put('/premium/:uid', userController.upgradeUser)
router.post('/deleteAllInactive', userController.deleteAllInactiveUsers)

export default router
