import { Router } from 'express'
import ticketController from '../../controllers/ticket.controller.js'

const router = Router()

router.get('/:tid', ticketController.checkOut)

export default router
