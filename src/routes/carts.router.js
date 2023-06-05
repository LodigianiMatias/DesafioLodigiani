import { Router } from 'express'
import cartManager from '../services/CartManager.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart()
    res.status(201).json({
      message: 'Cart created succesfully',
      payload: cart
    })
  } catch (error) {
    if (error.message === 'Error creating cart') {
      return res.status(400).json({
        error: 'Error creating cart'
      })
    }
    res.status(500).json({
      status: false,
      message: 'Unexpected error'
    })
  }
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartManager.getCartById(cid)
    res.status(200).json(cart.products)
  } catch (err) {
    if (err.message === `Cart not found with id: ${cid}`) {
      return res.status(400).json({
        success: false,
        message: `Cart not found with id: ${cid}`
      })
    }
    res.status(500).json({
      success: false,
      message: 'Unexpected error'
    })
  }
})

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params
  try {
    const productToAdd = await cartManager.addProductsToCart(cid, pid)
    res.status(200).json({
      success: true,
      productToAdd
    })
  } catch (err) {
    if (err.message === `Product not found with id: ${pid}`) {
      return res.status(400).json({
        status: false,
        message: `Product not found with id: ${pid}`
      })
    }
    if (err.message === `Cart not found with id: ${cid}`) {
      return res.status(400).json({
        status: false,
        message: `Cart not found with id: ${cid}`
      })
    }
    if (err.message === 'Not enough stock') {
      return res.status(400).json({
        status: false,
        message: 'Not enough stock'
      })
    }
    res.status(500).json({
      success: false,
      message: 'Unexpected error'
    })
  }
})

router.delete(':cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params
  try {
    await cartManager.removeProductsInCart(cid, pid)
    res.status(200).json({
      success: true
    })
  } catch (err) {
    if (err.message === `Cart not found with id: ${cid}`) {
      return res.status(400).json({
        success: false,
        message: `Cart not found with id: ${cid}`
      })
    }
    if (err.message === `Cart not found with id: ${cid}`) {
      return res.status(400).json({
        success: false,
        message: `Cart not found with id: ${cid}`
      })
    }
    res.status(500).json({
      success: false,
      message: 'Unexpected error'
    })
  }
})

router.delete('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    await cartManager.deleteCart(cid)
    res.status(200).json({
      success: true,
      message: 'Cart reseted succesfully'
    })
  } catch (err) {
    if (err.message === `Cart not found with id: ${cid}`) {
      return res.status(400).json({
        success: false,
        message: `Cart not found with id: ${cid}`
      })
    }
    res.status(500).json({
      error: 'Unexpected error'
    })
  }
})

export default router
