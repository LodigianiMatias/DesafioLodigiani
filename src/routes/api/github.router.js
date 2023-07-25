import { Router } from 'express'
import passport from 'passport'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.get('/', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/callback', passport.authenticate('github', { failureRedirect: '/errorlogin' }), userController.loginGitHub)

export default router
