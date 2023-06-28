import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/login', passport.authenticate('login', { failureRedirect: '/errorlogin' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'Invalid credentials' })
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName }

  return res.json({ message: 'Logged in', payload: req.user })
})

export default router
