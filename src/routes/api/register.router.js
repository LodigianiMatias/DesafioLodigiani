import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'Could not register' })
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, currentCartId: req.user.currentCartId }

  res.status(200).json({ message: 'User registered' })
})

export default router
