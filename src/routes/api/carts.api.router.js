import { Router } from 'express'
import cartController from '../../controllers/cart.controller.js'

const router = Router()

router.get('/:cid', cartController.getCartById)

router.post('/:cid/products/:pid', cartController.addProducts)

router.put('/:cid', cartController.updateCart)

router.put('/:cid/products/:pid', cartController.updateQty)

router.delete('/:cid/products/:pid', cartController.removeProducts)

router.delete('/:cid', cartController.clearCart)

router.post('/', cartController.createCart)

export default router
