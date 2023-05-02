import { Router } from 'express'
import cartManager from '../services/CartManager.js'
import productManager from '../services/ProductManager.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart()
    res.status(201).json({
      message: 'Carrito creado con éxito',
      cart
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error en la creación del carrito'
    })
  }
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartManager.getCartById(cid)
    res.status(200).json({
      cart
    })
  } catch (error) {
    res.status(400).json({
      message: 'Error: Carrito no encontrado'
    })
  }
})

router.put('/:cid/:pid', async (req, res) => {
  const { cid, pid } = req.params
  try {
    const product = await productManager.getProductsById(parseInt(pid))
    const productToAdd = await cartManager.addProductsToCart(cid, product.id)
    res.status(200).json({
      success: true,
      productToAdd
    })
  } catch (error) {
    res.status(400).json({
      message: 'Id de carrito o producto no encontrado'
    })
  }
})
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    await cartManager.deleteCart(cid)
    res.status(200).json({
      success: true,
      message: 'Carrito eliminado con éxito'
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})

export default router
