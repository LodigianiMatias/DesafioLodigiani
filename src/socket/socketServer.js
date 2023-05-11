import { Server } from 'socket.io'

export const initSockets = (server) => {
  const ioServer = new Server(server)
  ioServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con id: ' + socket.id)
    ioServer.emit('evento_para_socket_individual', 'Este mensaje sólo lo debe recibir el socket')
    socket.on('products', data => {
      console.log(data)
    })
  })
}
