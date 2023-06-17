import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  res.render('register', { name: 'Register' })
})

export default router
