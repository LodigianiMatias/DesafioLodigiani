import { Router } from 'express'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'
import productManager from '../../services/ProductManager.js'

const router = Router()

router.get('/:pid', isLoguedIn, async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productManager.getProductById(pid)
    return res.status(200).render('oneProduct', { name: product.title, product })
  } catch (err) {
    res.status(404).render('404')
  }
})

export default router
