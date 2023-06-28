import { Router } from 'express'
import apiLoginRouter from './login.router.js'
import apiRegisterRouter from './register.router.js'
import githubRouter from './github.router.js'

const router = Router()

router.use('/register', apiRegisterRouter)
router.use('/login', apiLoginRouter)

router.delete('/logout', async (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

router.use('/github', githubRouter)

export default router
