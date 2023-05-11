import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import apiRouter from './routes/api.router.js'
import express from 'express'
import handlebars from 'express-handlebars'
import path from 'path'
import viewRouter from './routes/view.router.js'

const PORT = 8080
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

app.use('/api', apiRouter)
app.use('/', viewRouter)

const httpServer = app.listen(PORT, () => {
  console.log(`Server up and running on port http://localhost:${PORT}`)
})

// SOCKET IO
const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('Nuevo cliente conectado')
  socket.on('message', (data) => {
    console.log(data)
  })

  socket.emit('evento_para_socket_individual', 'Este mensaje sólo lo debe recibir el socket')
})
