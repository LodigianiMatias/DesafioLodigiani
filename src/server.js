import { __dirname } from './utils.js'
import apiRouter from './routes/api.router.js'
import express from 'express'
import handlebars from 'express-handlebars'
import path from 'path'
import viewRouter from './routes/view.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// MULTER
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')))

const PORT = 8080

app.use('/api', apiRouter)
app.use('/', viewRouter)

app.listen(PORT, () => {
  console.log(`Server up and running on port http://localhost:${PORT}`)
})
