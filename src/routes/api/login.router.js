import { Router } from 'express'
import passport from 'passport'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.post('/', passport.authenticate('login', { failureRedirect: '/errorlogin' }), userController.loginLocal)

export default router
