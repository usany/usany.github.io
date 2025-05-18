import { messaging } from 'firebase-admin'
import { Socket } from 'socket.io'

const socketOnConfirmReturn = (socket: Socket) => {
  socket.on('confirmReturn', (res) => {
    const { id, choose, sendingToken, creatorName, connectedName } = res
    console.log(choose)
    const messageBorrow = {
      notification: {
        title: 'confirm return!',
        body: `${creatorName} 님! ${connectedName} 님이 confirm return. Check 포인트.`,
      },
      token: sendingToken,
    }
    const messageLend = {
      notification: {
        title: 'confirm return!',
        body: `${connectedName} 님! ${creatorName} 님이 confirm return. Check 포인트.`,
      },
      token: sendingToken,
    }
    messaging().send(choose === 1 ? messageBorrow : messageLend)
    socket.broadcast.emit(`sIncrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
  })
}

export default socketOnConfirmReturn
