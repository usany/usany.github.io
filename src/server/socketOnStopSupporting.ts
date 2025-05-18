import admin from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnStopSupporting = (socket: Socket) => {
  socket.on('stop supporting', (res) => {
    const { id, sendingToken, creatorName, connectedName } = res
    const message = {
      notification: {
        title: 'stop supporting!',
        body: `${creatorName} 님! ${connectedName} 님이 stop supporting. Check 내 상태.`,
      },
      token: sendingToken,
    }
    admin.messaging().send(message)
    socket.broadcast.emit(`sDecrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
    socket.broadcast.emit(`sStopSupportingTrades${id}`, res)
  })
}

export default socketOnStopSupporting
