import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).render('formproducts', { name: 'Form Products | Ecommerce', user: req.session.user })
})

export default router
