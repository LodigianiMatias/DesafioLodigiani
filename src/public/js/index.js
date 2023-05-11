const socket = io()
socket.emit('message', 'hola')

socket.on('evento_para_socket_individual', (data) => {
  console.log(data)
})

socket.emit('products', 'Hola, BackEnd!')
