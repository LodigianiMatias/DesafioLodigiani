import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('register', { name: 'Register | Ecommerce' })
})

export default router
