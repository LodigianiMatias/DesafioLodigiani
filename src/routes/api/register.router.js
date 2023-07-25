import { Router } from 'express'
import passport from 'passport'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.post('/', passport.authenticate('register', { failureRedirect: '/failregister' }), userController.registrationLocal)

export default router
