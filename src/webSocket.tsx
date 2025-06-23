import { io } from 'socket.io-client'

const webSocket = io('https://service-ceni.onrender.com')
// const webSocket = io('http://localhost:5000')

const onClick = () => {
  console.log('practice')
  webSocket.emit('button', { name: 'John Doe', age: 30 })
}

export { onClick, webSocket }

