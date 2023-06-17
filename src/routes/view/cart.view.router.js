import { Router } from 'express'
import cartManager from '../../services/CartManager.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'

const app = Router()

app.get('/:cid', isLoguedIn, async (req, res) => {
  if (!req.session.user) {
    res.render('login', { name: 'Login' })
  }
  const { cid } = req.params
  try {
    const cart = await cartManager.getCartById(cid)
    return res.status(200).render('cart', { name: 'Cart', cart, user: req.session.user })
  } catch (err) {
    if (err.message === `Cart not found with id: ${cid}`) {
      return res.status(400).json({
        status: false,
        message: `Cart not found with id: ${cid}`
      })
    }
    res.status(500).json({
      success: false,
      message: 'Unexpected error'
    })
  }
})

export default app
