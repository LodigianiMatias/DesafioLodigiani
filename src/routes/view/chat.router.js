import { Router } from 'express'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'

const router = Router()

router.get('/', isLoguedIn, async (req, res) => {
  try {
    return res.status(200).render('chat', { name: 'Chat Websocket' })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unexpected error'
    })
  }
})

export default router
