const { Server } = require('socket.io')
// const http = require('http')
// const server = http.createServer(async (req, res) => {
//   const pathname = url.parse(req.url).pathname
//   const method = req.method
//   let data = null
//   console.log(pathname)
// }
// )
// server.listen(5000)
var admin = require('firebase-admin')
var serviceAccount = require('../service-account.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://remake-36fe0-default-rtdb.asia-southeast1.firebasedatabase.app',
})
const sampleMessage = {
  notification: {
    title: 'greetings!',
    body: 'You have new messages.',
  },
  // token: 'cMKqnki-Feo7tMzDdKx-8L:APA91bFujZvNtRJ6SOkDPSgWCk7N_8YSHah8i-lY6qyIBtTGzzNopFsOIFpEb2RmKRfrNRitLmV855D86iSn4bMx9DjyLC-UPyEoURK_9ihINWNWMWze0q9QwMb28cNj02FRSCQ73ee9',
  token:
    'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD',
}
console.log('connect')
const createMessage = ({
  messageTitle,
  messageText,
  messageToken,
  toUser,
  fromUser,
}) => {
  const message = {
    notification: {
      title: messageTitle,
      body: `${toUser} 님 ${fromUser} 님이 승인했습니다. 확인하세요. ${messageText}`,
    },
    // token: 'cMKqnki-Feo7tMzDdKx-8L:APA91bFujZvNtRJ6SOkDPSgWCk7N_8YSHah8i-lY6qyIBtTGzzNopFsOIFpEb2RmKRfrNRitLmV855D86iSn4bMx9DjyLC-UPyEoURK_9ihINWNWMWze0q9QwMb28cNj02FRSCQ73ee9',
    token: messageToken,
  }
  return message
}
const io = new Server('5000', {
  cors: {
    origin: 'http://localhost:5173',
    // origin: 'https://usany.github.io',
  },
})

const clients = new Map()
// http.get('http://localhost:5000/api/world/', res => {
// let data = [];
// const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
// console.log('Status Code:', res.statusCode);
// console.log('Date in Response header:', headerDate);

// res.on('data', chunk => {
//   console.log(chunk)
// });

// res.on('end', () => {
//   console.log('Response ended: ');
//   const users = JSON.parse(Buffer.concat(data).toString());

//   for(user of users) {
//     console.log(`Got user with id: ${user.id}, name: ${user.name}`);
//   }
// });
//   console.log(res.statusCode)
// }).on('error', err => {
//   console.log('Error: ', err.message);
// });
io.sockets.on('connection', (socket) => {
  console.log('user connected')
  socket.on('piazzaMessage', (res) => {
    const { conversation, sendingToken } = res
    console.log(res)
    // const message = {
    //   notification: {
    //     title: 'greetings!',
    //     body: 'You have new messages.',
    //   },
    //   token: sendingToken,
    // };
    // admin.messaging().send(message)
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
      conversation === 'piazza'
        ? socket.broadcast.emit('sMessagePiazza', res)
        : socket.broadcast.emit(`sMessage${conversation}`, res)
    }
  })
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
  socket.on('messageNew', (res) => {
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
        ? socket.broadcast.emit('sNewMessagePiazza', res)
        : socket.broadcast.emit(`sNewMessage`, res)
    }
  })
  socket.on('login', (data) => {
    const { userId, roomNumber } = data
    console.log(userId)
    // 2
    socket.join(roomNumber)
    clients.set(userId, socket.id)
    socket.broadcast.emit('sLogin', userId)
  })
  socket.on('button', (data) => {
    const { name, age } = data
    // 2
    console.log(name)
    console.log(age)
    admin.messaging().send(message)
  })
  // socket.on("messagingToken", (data) => {
  //   const { name, age } = data;
  //   console.log(name)
  //   console.log(age)
  //   admin.messaging().send(message)
  // });
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
