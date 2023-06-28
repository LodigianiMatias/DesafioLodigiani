import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  res.status(200).render('login', { name: 'Login | Ecommerce' })
})

export default router