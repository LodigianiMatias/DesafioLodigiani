import { Server } from 'socket.io'
import productManager from '../services/ProductManager.js'

export const initSockets = (server) => {
  const ioServer = new Server(server)
  ioServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con id: ' + socket.id)

    socket.on('createProduct', data => {
      console.log(data)
      const newProduct = productManager.addProduct(data)
      ioServer.emit('newProduct', newProduct)
    })
  })
}
