import { Socket } from 'socket.io'

const socketOnPiazzaMessage = (socket: Socket) => {
  socket.on('piazzaMessage', (res) => {
    const { conversation } = res
    console.log(res)
    if (conversation) {
      socket.broadcast.emit(`sMessage${conversation}`, res)
    } else {
      socket.broadcast.emit('sMessagePiazza', res)
    }
  })
}

export default socketOnPiazzaMessage
