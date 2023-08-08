import { Router } from 'express'
import { isAdmin } from '../../middlewares/roles.middleware.js'
import productController from '../../controllers/product.controller.js'

const router = Router()

router.get('/', productController.getProducts)

router.get('/:pid', productController.getById)

router.post('/', isAdmin, productController.addProduct)

router.put('/:pid', productController.updateProduct)

router.delete('/:pid', isAdmin, productController.deleteProduct)

export default router
