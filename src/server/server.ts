import { Server } from 'socket.io'
import admin, { initializeApp, credential } from 'firebase-admin'
import serviceAccount from '../../service-account.json'
import socketOnMessage from './socketOnMessage'
import socketOnNewMessage from './socketOnNewMessage'
import socketOnSupporting from './socketOnSupporting'
import socketOnPiazzaMessage from './socketOnPiazzaMessage'
import socketOnStopSupporting from './socketOnStopSupporting'
import socketOnConfirm from './socketOnConfirm'
import socketOnReturning from './socketOnReturning'
import socketOnConfirmReturn from './socketOnConfirmReturn'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://remake-36fe0-default-rtdb.asia-southeast1.firebasedatabase.app',
})
const io = new Server(5000, {
  cors: {
    origin: 'http://localhost:5173',
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
