import { MsgModel } from '../DAO/mongo/models/chat.model.js'
import { Server } from 'socket.io'
import productManager from '../services/productService.js'

export const initSockets = (server) => {
  const ioServer = new Server(server)
  ioServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con id: ' + socket.id)

    socket.on('createProduct', async (data) => {
      try {
        const newProduct = await productManager.addProduct(data)
        ioServer.emit('newProduct', newProduct)
        socket.emit('messageSuccess', 'Producto creado con éxito')
      } catch (err) {
        socket.emit('messageError', err.message)
      }
    })

    socket.on('deleteProduct', async (idProduct) => {
      try {
        console.log(idProduct)
        await productManager.deleteProduct(idProduct)
        const productsRefresh = await productManager.getProducts()
        ioServer.emit('refreshPage', productsRefresh)
      } catch (err) {
        socket.emit('errorMessage', err.message)
      }
    })

    socket.on('msg_front_to_back', async (msg) => {
      try {
        await MsgModel.create(msg)
        const msgs = await MsgModel.find({})
        ioServer.emit('msg_back_to_front', msgs)
      } catch (err) {

      }
    })
  })
}
