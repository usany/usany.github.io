import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Dialogs from 'src/muiComponents/Dialogs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { webSocket, onClick } from 'src/webSocket.tsx'
function Btn({ msgObj, isOwner, uid, displayName, isLoggedIn, num, points, setValue, counter, setCounter }) {
  const [move, setMove] = useState(false)

  const onDeleteClick = () => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    deleteDoc(data)
  }
  console.log(msgObj)
  const onClick = (action) => {
    const data = doc(dbservice, `num/${msgObj.id}`)
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

      if (msgObj.text.choose == 1) {
        updateDoc(point, {points: num-msgObj.point});
        updateDoc(connectedPoint, {points: points+msgObj.point});
        webSocket.emit('confirm return', { sendingToken: 'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD', creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      } else {
        updateDoc(point, {points: num+msgObj.point});
        updateDoc(connectedPoint, {points: points-msgObj.point});
        webSocket.emit('confirm return', { sendingToken: 'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD', creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      }
    } else if (action === 'confirm') {
      updateDoc(data, {round: 3});
      webSocket.emit('confirm', { sendingToken: 'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD', creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
    } else if (action === 'returning') {
      updateDoc(data, {round: 4});
      webSocket.emit('returning', { sendingToken: 'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD', creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
    } else if (action === 'supporting') {
      if (isLoggedIn) { 
        updateDoc(data, {round: 2, connectedId: uid, connectedName: displayName});
        webSocket.emit('supporting', { sendingToken: 'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD', creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      } else {
        setMove(true)
      }
    } else if (action === 'stop supporting') {
      if (isLoggedIn) { 
        updateDoc(data, {round: 1, connectedId: null, connectedName: null});
        webSocket.emit('stop supporting', { sendingToken: 'cMKqnki-Feo7tMzDdKx-8L:APA91bF7iwhQSTQ4Ewv9rDWImAyEi0vwKvg6QHwqrJqDc3AB0vWEID7B1VKgT1q8By-G9VSdmXxfvADyz0ROOjA5ewtV_O87Ai66uUeIwZzIP5eREuhFJfZ-ZFD_ptwR-BsB0a3QAaYD', creatorId: msgObj.creatorId, creatorName: msgObj.displayName, connectedId: uid, connectedName: displayName, })
      }
    }
  }
  const handleClose = () => {
    setMove(false);
  };

  return (
    <>
      {isOwner &&
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
      }
      {!isOwner &&
        <div>
          {msgObj.round === 1 &&
            <div className='flex justify-center'>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('supporting')
                )
              }}
              startIcon={<SendIcon />}>승낙하기</Button>
              <Dialogs move={move} handleClose={handleClose} setValue={setValue}/>
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
        </div>  
      }
    </>
  )
}

export default Btn
