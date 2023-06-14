import { Router } from 'express'

const app = Router()

app.get('/', async (req, res) => {
  try {
    return res.status(200).render('chat', { name: 'Chat Websocket' })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unexpected error'
    })
  }
})

export default app
