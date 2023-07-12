import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  const user = req.session
  res.json(user)
})

export default router
