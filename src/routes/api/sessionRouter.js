import { Router } from 'express'
import apiLoginRouter from './login.router.js'
import apiRegisterRouter from './register.router.js'
import githubRouter from './github.router.js'

const router = Router()

router.use('/register', apiRegisterRouter)
router.use('/login', apiLoginRouter)
router.use('/github', githubRouter)

router.delete('/logout', async (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

export default router
