import { Router } from 'express'

const router = Router()

router.get('/github', (req, res) => {
  res.send('Github')
})

export default router
