import { Router } from 'express'
import cartManager from '../services/CartManager.js'

const app = Router()

app.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartManager.getCartById(cid)
    return res.status(200).render('cart', { name: 'Cart', cart })
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
