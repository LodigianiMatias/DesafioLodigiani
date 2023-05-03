import apiRouter from './routes/api.router.js'
import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 8080

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
