import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('logger', { name: 'Logger | Ecommerce' })
})

export default router
