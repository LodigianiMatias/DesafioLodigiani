import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
  console.log('Entro el post')
  if (!req.user) {
    return res.json({ error: 'Could not register' })
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName }

  res.redirect('/login')
})

export default router
