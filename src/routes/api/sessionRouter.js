import { Router } from 'express'
import bcrypt from 'bcrypt'
import userManager from '../../services/UserService.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password: plainPassword } = req.body
  const user = await userManager.getUserByEmail(email)
  if (!user) {
    return res.status(401).send('User not found')
  }
  if (bcrypt.compareSync(user.password, plainPassword)) {
    return res.status(401).send('Wrong password')
  }
  req.session.user = { email: user.email, name: user.name, lastname: user.lastname, id: user.id }
  res.redirect('/')
})

router.delete('/logout', async (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

router.post('/register', async (req, res) => {
  const data = req.body
  try {
    await userManager.addUser(data)
    res.redirect('/login')
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default router
