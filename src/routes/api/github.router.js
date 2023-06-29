import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/callback', passport.authenticate('github', { failureRedirect: '/errorlogin' }), (req, res) => {
  req.session.user = req.user

  res.redirect('/')
})

export default router
