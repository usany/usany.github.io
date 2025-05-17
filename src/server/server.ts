import { Server } from 'socket.io'
import { initializeApp, credential } from 'firebase-admin'
import serviceAccount from '../../service-account.json'
import socketOnMessage from './socketOnMessage'
import socketOnNewMessage from './socketOnNewMessage'
import socketOnSupporting from './socketOnSupporting'
import socketOnPiazzaMessage from './socketOnPiazzaMessage'
import socketOnStopSupporting from './socketOnStopSupporting'
import socketOnConfirm from './socketOnConfirm'
import socketOnReturning from './socketOnReturning'
import socketOnConfirmReturn from './socketOnConfirmReturn'

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
  socketOnStopSupporting(socket)
  socketOnConfirm(socket)
  socketOnReturning(socket)
  socketOnConfirmReturn(socket)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
