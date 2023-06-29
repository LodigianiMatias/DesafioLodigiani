import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('errorlogin', { name: 'Failed login' })
})

export default router
