import { Server } from 'socket.io'
import { initializeApp } from 'firebase-admin'
import serviceAccount from '../../service-account.json'

socket.on('message', (res) => {
  const { conversation, sendingToken } = res
  console.log(res)
  const message = {
    notification: {
      title: 'greetings!',
      body: 'You have new messages.',
    },
    token: sendingToken,
  }
  admin.messaging().send(message)
  // if (target) {
  //   const toUser = clients.get(target);
  //   io.sockets.to(toUser).emit("sMessage", res);
  //   return;
  // }
  // 1
  // const myRooms = Array.from(socket.rooms);
  // if (myRooms.length > 1) {
  //   socket.broadcast.in(myRooms[1]).emit("sMessage", res);
  //   return;
  // }
  {
    !conversation
      ? socket.broadcast.emit('sMessagePiazza', res)
      : socket.broadcast.emit(`sMessage${conversation}`, res)
  }
})
