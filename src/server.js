import { __dirname, connectMongo } from './utils/utils.js'

import { addLogger } from './utils/logger.utils.js'
import apiRouter from './routes/api/api.router.js'
import cluster from 'cluster'
import compression from 'express-compression'
import { cpus } from 'os'
import errorHandler from './middlewares/errors.middleware.js'
import express from 'express'
import handlebars from 'express-handlebars'
import { initSockets } from './socket/socketServer.js'
import initializePassport from './configuration/passport.config.js'
import { mongoSession } from './middlewares/mongo-session.js'
import passport from 'passport'
import path from 'path'
import viewRouter from './routes/view/view.router.js'

if (cluster.isPrimary) {
  const numProcess = cpus().length
  console.log('Numero de hilos: ' + numProcess)
}

const PORT = 8080
const app = express()

// LOGGER
app.use(addLogger)

// COMPRESSION
app.use(compression({
  brotli: { enabled: true, zlib: {} }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MONGO
connectMongo()

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// MULTER
app.use(express.static('src/public'))

// PASSPORT
app.use(mongoSession)
initializePassport()

// SESSION
app.use(passport.initialize())
app.use(passport.session())

// ROUTERS
app.use('/api', apiRouter)
app.use('/', viewRouter)

// ERROR HANDLER
app.use(errorHandler)

// SERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Server up and running on port http://localhost:${PORT}`)
})

app.get('*', (_, res) => {
  res.status(404).render('404', { name: 'URL not found' })
})
// SOCKET IO
initSockets(httpServer)
