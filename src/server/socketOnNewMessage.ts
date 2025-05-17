import { messaging } from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnNewMessage = (socket: Socket) => {
  socket.on('messageNew', (res) => {
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
      socket.broadcast.emit(`sNewMessage`, res)
    } else {
      socket.broadcast.emit('sNewMessagePiazza', res)
    }
  })
}

export default socketOnNewMessage
