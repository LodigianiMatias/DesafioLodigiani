import { Router } from 'express'
import productManager from '../services/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
  const products = await productManager.getProducts()
  const limit = parseInt(req.query.limit)
  if (!limit) {
    return res.status(200).json(products)
  } else {
    if (limit > products.length) {
      return res.status(409).json({
        error: 'Ingresó un limite mayor a la cantidad de objetos en DB'
      })
    } else {
      return res.status(200).json(products.slice(0, limit))
    }
  }
})

router.get('/:pid', async (req, res) => {
  const idRequested = parseInt(req.params.pid)
  const userSearch = await productManager.getProductsById(idRequested)
  if (userSearch) {
    return res.status(200).json(userSearch)
  } else {
    return res.status(409).json({ error: userSearch })
  }
})

router.post('/', async (req, res) => {
  const productToAdd = req.body
  const products = await productManager.addProduct(productToAdd)
  if (!products) {
    res.status(200).json({ message: 'Producto agregado con éxito' })
  } else {
    res.status(409).json({ error: products })
  }
})

router.put('/:pid', async (req, res) => {
  const idProduct = parseInt(req.params.pid)
  const newProduct = req.body
  const productModify = await productManager.updateProduct(idProduct, newProduct)
  if (!productModify) {
    res.status(200).json({ message: 'Producto modificado con éxito' })
  } else {
    res.status(409).json({ error: productModify })
  }
})

router.delete('/:pid', async (req, res) => {
  const idToDelete = parseInt(req.params.pid)
  const productEliminated = await productManager.deleteProduct(idToDelete)
  if (!productEliminated) {
    res.status(200).json({ message: 'Producto eliminado con éxito' })
  } else {
    res.status(409).json({ error: productEliminated })
  }
})

export default router
