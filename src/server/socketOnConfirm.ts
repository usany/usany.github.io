import { messaging } from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnConfirm = (socket: Socket) => {
  socket.on('confirm', (res) => {
    const { id, sendingToken, creatorName, connectedName } = res
    const message = {
      notification: {
        title: 'confirm!',
        body: `${connectedName} 님! ${creatorName} 님이 confirm. Check 내 상태.`,
      },
      token: sendingToken,
    }
    messaging().send(message)
    socket.broadcast.emit(`sIncrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
  })
}

export default socketOnConfirm
