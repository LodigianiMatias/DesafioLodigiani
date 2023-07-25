import { Router } from 'express'
import apiLoginRouter from './login.router.js'
import apiRegisterRouter from './register.router.js'
import currentRouter from './current.router.js'
import githubRouter from './github.router.js'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.use('/register', apiRegisterRouter)
router.use('/login', apiLoginRouter)
router.use('/github', githubRouter)
router.use('/current', currentRouter)

router.delete('/logout', userController.deleteSession)

export default router
