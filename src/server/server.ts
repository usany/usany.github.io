import { Server, Socket } from 'socket.io'
import { initializeApp, credential } from 'firebase-admin'
import serviceAccount from '../../service-account.json'
import socketOnMessage from './socketOnMessage'
import socketOnNewMessage from './socketOnNewMessage'
import socketOnSupporting from './socketOnSupporting'
import socketOnPiazzaMessage from './socketOnPiazzaMessage'

initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: import.meta.env.VITE_DBURL,
})
const io = new Server(5000, {
  cors: {
    origin: import.meta.env.VITE_LOCALHOST,
    // origin: 'https://usany.github.io',
  },
})
io.sockets.on('connection', (socket) => {
  console.log('user connected')
  socketOnPiazzaMessage(socket)
  socketOnMessage(socket)
  socketOnNewMessage(socket)
  socketOnSupporting(socket)
  socket.on('supporting', (res) => {
    const {
      id,
      choose,
      sendingToken,
      creatorId,
      creatorName,
      connectedId,
      connectedName,
      connectedUrl,
    } = res
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
  socket.on('stop supporting', (res) => {
    const {
      id,
      choose,
      sendingToken,
      creatorId,
      creatorName,
      connectedId,
      connectedName,
    } = res
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
  socket.on('confirm', (res) => {
    const {
      id,
      choose,
      sendingToken,
      creatorId,
      creatorName,
      connectedId,
      connectedName,
    } = res
    const message = {
      notification: {
        title: 'confirm!',
        body: `${connectedName} 님! ${creatorName} 님이 confirm. Check 내 상태.`,
      },
      token: sendingToken,
    }
    admin.messaging().send(message)
    socket.broadcast.emit(`sIncrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
  })
  socket.on('returning', (res) => {
    const {
      id,
      choose,
      sendingToken,
      creatorId,
      creatorName,
      connectedId,
      connectedName,
    } = res
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
  socket.on('confirmReturn', (res) => {
    const {
      id,
      choose,
      sendingToken,
      creatorId,
      creatorName,
      connectedId,
      connectedName,
    } = res
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
    admin.messaging().send(choose === 1 ? messageBorrow : messageLend)
    socket.broadcast.emit(`sIncrease${id}`, res)
    socket.broadcast.emit(`sOnPulse${id}`, res)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
