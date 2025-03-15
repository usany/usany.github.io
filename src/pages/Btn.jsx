import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Dialogs from 'src/muiComponents/Dialogs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { webSocket, onClick } from 'src/webSocket.tsx'

// const webSocket = io("http://localhost:5000");
function Btn({ msgObj, isOwner, uid, displayName, userObj, num, points }) {
  const [move, setMove] = useState(false)

  const onDeleteClick = () => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    deleteDoc(data)
  }
  // console.log(msgObj)
  const onClick = async (action) => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    const toUserRef = doc(dbservice, `members/${msgObj.creatorId}`)
    const toUser = await getDoc(toUserRef)
    // console.log(toUser.data().messagingToken)
    const messagingToken = toUser.data().messagingToken
    if (action === 'delete') {
      deleteDoc(data)
      const [msgObj, ...newCounter] = counter
      setCounter([
        ...newCounter
      ])
    } else if (action === 'confirm return') {
      updateDoc(data, {round: 5});
      const point = doc(dbservice, `members/${msgObj.creatorId}`)
      const connectedPoint = doc(dbservice, `members/${msgObj.connectedId}`)
      const creatorSnap = await getDoc(point)
      const connectedSnap = await getDoc(connectedPoint)
      const creatorDone = creatorSnap.data().done || []
      const connectedDone = connectedSnap.data().done || []
      if (msgObj.text.choose == 1) {
        const creatorBorrowDone = creatorSnap.data().borrowDoneCount || []
        const connectedLendDone = connectedSnap.data().lendDoneCount || []
        updateDoc(point, {points: num-msgObj.point});
        updateDoc(connectedPoint, {points: points+msgObj.point});
        updateDoc(point, {borrowDoneCount: [...creatorBorrowDone, msgObj.id]});
        updateDoc(connectedPoint, {lendDoneCount: [...connectedLendDone, msgObj.id]});
        webSocket.emit('confirm return', { choose: msgObj.text.choose, sendingToken: messagingToken, creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      } else {
        const creatorLendDone = creatorSnap.data().lendDoneCount || []
        const connectedBorrowDone = connectedSnap.data().borrowDoneCount || []
        updateDoc(point, {points: num+msgObj.point});
        updateDoc(connectedPoint, {points: points-msgObj.point});
        updateDoc(point, {lendDoneCount: [...creatorLendDone, msgObj.id]});
        updateDoc(connectedPoint, {borrowDoneCount: [...connectedBorrowDone, msgObj.id]});
        webSocket.emit('confirm return', { choose: msgObj.text.choose, sendingToken: messagingToken, creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      }
      console.log('practice')
      updateDoc(point, {done: 
        [...creatorDone, msgObj.id]
      });
      updateDoc(connectedPoint, {done: 
        [...connectedDone, msgObj.id]
      });
    } else if (action === 'confirm') {
      updateDoc(data, {round: 3});
      webSocket.emit('confirm', { choose: msgObj.text.choose, sendingToken: messagingToken, creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
    } else if (action === 'returning') {
      updateDoc(data, {round: 4});
      webSocket.emit('returning', { choose: msgObj.text.choose, sendingToken: messagingToken, creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
    } else if (action === 'supporting') {
      if (userObj) { 
        updateDoc(data, {round: 2, connectedId: uid, connectedName: displayName});
        webSocket.emit('supporting', { choose: msgObj.text.choose, sendingToken: messagingToken, creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      } else {
        setMove(true)
      }
    } else if (action === 'stop supporting') {
      if (userObj) { 
        updateDoc(data, {round: 1, connectedId: null, connectedName: null});
        webSocket.emit('stop supporting', { choose: msgObj.text.choose, sendingToken: messagingToken, creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      }
    }
  }
  const handleClose = () => {
    setMove(false);
  };

  return (
    <>
      {isOwner ?
        <>
          {msgObj.round === 1 && 
            <div className='flex flex-col justify-center'>
              <Button variant='outlined' onClick={() => onClick('delete') } startIcon={<DeleteIcon />}>지우기</Button>
            </div>
          }
          {msgObj.round === 2 &&
            <Button variant='outlined' onClick={() => {
              return (
                onClick('confirm')
              )
            }}
            startIcon={<SendIcon />}>승낙 메시지 확인</Button>
          }
          {msgObj.round === 3 &&
            <div className='flex justify-center'>
              {msgObj.text.choose == 1 && 
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('returning')
                )
                }}
                startIcon={<SendIcon />}>반납하기</Button>
              }
              {msgObj.text.choose == 2 && 
              <Button variant='outlined' disabled>{msgObj.connectedName} 님이 빌리는 중</Button>}
            </div>
          }
          {msgObj.round === 4 &&
            <div className='flex justify-center'>
              {msgObj.text.choose == 1 && 
              <Button variant='outlined' disabled>주인에게 확인 중</Button>}
              {msgObj.text.choose == 2 && 
              <Button variant='outlined' 
              onClick={() => onClick('confirm return')} 
              startIcon={<SendIcon />}>반납 완료 확인</Button>}
            </div>
          }
        </>
        :
        <>
          {msgObj.round === 1 &&
            <div className='flex justify-center'>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('supporting')
                )
              }}
              startIcon={<SendIcon />}>승낙하기</Button>
              <Dialogs move={move} handleClose={handleClose} />
            </div>
          }
          {msgObj.round === 2 &&
            <div className='flex flex-col justify-center'>
              <Button variant='contained' 
                disabled
              >승낙 메시지 전송 완료</Button>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('stop supporting')
                )
              }}
              startIcon={<SendIcon />}>취소</Button>
            </div>
          }
          {msgObj.round === 3 &&
            <div className='flex justify-center'>
              {msgObj.text.choose == 1 && 
              <Button variant='outlined' disabled>{msgObj.displayName} 님이 빌리는 중</Button>}
              {msgObj.text.choose == 2 && 
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('returning')
                )
                }}
              startIcon={<SendIcon />}>반납하기</Button>
              }
            </div>
          }
          {msgObj.round === 4 &&
            <div className='flex justify-center'>
              {msgObj.text.choose == 1 && 
              <Button variant='outlined' onClick={() => onClick('confirm return')} endIcon={<SendIcon />}>반납 완료 확인</Button>}
              {msgObj.text.choose == 2 && 
              <Button variant='outlined' disabled>주인에게 확인 중</Button>}
            </div>
          }
        </>  
      }
    </>
  )
}

export default Btn
