import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  if (req.session.cont) {
    req.session.cont++
    res.send('nos visitaste ' + req.session.cont)
  } else {
    req.session.cont = 1
    res.send('nos visitaste ' + 1)
  }
})

export default router
