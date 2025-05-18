import { messaging } from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnMessage = (socket: Socket) => {
  socket.on('message', (res) => {
    const { conversation, sendingToken } = res
    console.log(res)
    const message = {
      notification: {
        title: 'greetings!',
        body: 'You have new messages.',
      },
      token: sendingToken,
    }
    messaging().send(message)
    if (conversation) {
      socket.broadcast.emit(`sMessage${conversation}`, res)
    } else {
      socket.broadcast.emit('sMessagePiazza', res)
    }
  })
}

export default socketOnMessage
