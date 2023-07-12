import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/', passport.authenticate('login', { failureRedirect: '/errorlogin' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'Invalid credentials' })
  }
  req.session.user = { _id: req.user._id, email: req.user.email, name: req.user.name, lastname: req.user.lastname, currentCartId: req.user.currentCartId }

  res.redirect('/')
})

export default router
