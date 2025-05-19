import admin from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnSupporting = (socket: Socket) => {
  socket.on('supporting', (res) => {
    const { id, sendingToken, creatorName, connectedName } = res
    const message = {
      notification: {
        title: 'supporting!',
        body: `${creatorName} 님! ${connectedName} 님이 supporting. Check 내 상태.`,
      },
      token: sendingToken,
    }
    admin.messaging().send(message)
    socket.broadcast.emit(`sIncrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
    socket.broadcast.emit(`sSupportTrades${id}`, res)
  })
}

export default socketOnSupporting
