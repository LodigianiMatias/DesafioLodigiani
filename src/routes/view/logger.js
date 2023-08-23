import { Router } from 'express'
import { logger } from '../../utils/logger.utils.js'

const router = Router()

router.get('/', (req, res) => {
  logger.debug('Debug')
  logger.error('Error')
  logger.info('Info')
  logger.warn(
    'Alguien ingresó a la ruta, esta es una warn'
  )
  res.render('logger', { name: 'Logger | Ecommerce' })
})

export default router
