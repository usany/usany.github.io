import admin from 'firebase-admin'
import { Server } from 'socket.io'
import serviceAccount from '../../service-account.json'
import socketOnConfirm from './socketOnConfirm'
import socketOnConfirmReturn from './socketOnConfirmReturn'
import socketOnMessage from './socketOnMessage'
import socketOnNewMessage from './socketOnNewMessage'
import socketOnPiazzaMessage from './socketOnPiazzaMessage'
import socketOnReturning from './socketOnReturning'
import socketOnStopSupporting from './socketOnStopSupporting'
import socketOnSupporting from './socketOnSupporting'

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
  socket.on('joinRoom', (roomName, done) => {
    console.log('welcome')
    socket.join(roomName)
    done()
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
