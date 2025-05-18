import admin from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnReturning = (socket: Socket) => {
  socket.on('returning', (res) => {
    const { id, choose, sendingToken, creatorName, connectedName } = res
    const messageBorrow = {
      notification: {
        title: 'returning!',
        body: `${connectedName} 님! ${creatorName} 님이 returning. Check 내 상태.`,
      },
      token: sendingToken,
    }
    const messageLend = {
      notification: {
        title: 'returning!',
        body: `${creatorName} 님! ${connectedName} 님이 returning. Check 내 상태.`,
      },
      token: sendingToken,
    }
    admin.messaging().send(choose === 1 ? messageBorrow : messageLend)
    socket.broadcast.emit(`sIncrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
  })
}

export default socketOnReturning
