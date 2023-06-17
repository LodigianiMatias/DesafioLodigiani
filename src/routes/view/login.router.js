import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  res.status(200).render('login', { name: 'Login' })
})

export default router
