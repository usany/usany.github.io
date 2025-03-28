import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import { webSocket } from 'src/webSocket.tsx'

const onConfirm = async ({ message, uid, displayName }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
  }
  updateDoc(data, { round: 3 })
  webSocket.emit('confirm', passingObject)
}
const onStopSupporting = async ({ message, uid, displayName }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
  }
  updateDoc(data, {
    round: 1,
    connectedId: null,
    connectedName: null,
    connectedUrl: null,
  })
  webSocket.emit('stop supporting', passingObject)
}
const onReturning = async ({ message, uid, displayName }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
  }
  updateDoc(data, { round: 4 })
  webSocket.emit('returning', passingObject)
}
const onSupporting = async ({ message, uid, displayName, profileUrl }) => {
  // const profileUrl = useSelector((state) => state.profileUrl.value)
  const { data, messagingToken } = await specificProcess({ message: message })
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
  }
  updateDoc(data, {
    round: 2,
    connectedId: uid,
    connectedName: displayName,
    connectedUrl: profileUrl,
  })
  webSocket.emit('supporting', passingObject)
}
const onDelete = async ({ message }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  deleteDoc(data)
}
const onConfirmReturn = async ({ num, points, message, uid, displayName }) => {
  const { data, messagingToken } = await specificProcess({ message: message })
  updateDoc(data, { round: 5 })
  const point = doc(dbservice, `members/${message.creatorId}`)
  const connectedPoint = doc(dbservice, `members/${message.connectedId}`)
  const creatorSnap = await getDoc(point)
  const connectedSnap = await getDoc(connectedPoint)
  const creatorDone = creatorSnap.data()?.done || []
  const connectedDone = connectedSnap.data()?.done || []
  if (message.text.choose === 1) {
    const creatorBorrowDone = creatorSnap.data()?.borrowDoneCount || []
    const connectedLendDone = connectedSnap.data()?.lendDoneCount || []
    updateDoc(point, { points: num - message.point })
    updateDoc(connectedPoint, { points: points + message.point })
    updateDoc(point, { borrowDoneCount: [...creatorBorrowDone, message.id] })
    updateDoc(connectedPoint, {
      lendDoneCount: [...connectedLendDone, message.id],
    })
  } else {
    const creatorLendDone = creatorSnap.data()?.lendDoneCount || []
    const connectedBorrowDone = connectedSnap.data()?.borrowDoneCount || []
    updateDoc(point, { points: num + message.point })
    updateDoc(connectedPoint, { points: points - message.point })
    updateDoc(point, { lendDoneCount: [...creatorLendDone, message.id] })
    updateDoc(connectedPoint, {
      borrowDoneCount: [...connectedBorrowDone, message.id],
    })
  }
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
  }
  updateDoc(point, {
    done: [...creatorDone, message.id],
  })
  updateDoc(connectedPoint, {
    done: [...connectedDone, message.id],
  })

  webSocket.emit('confirmReturn', passingObject)
  // webSocket.emit('confirm return', {
  //   id: message.id,
  //   choose: message.text.choose,
  //   sendingToken: messagingToken,
  //   creatorId: message.creatorId,
  //   creatorName: message.displayName,
  //   connectedId: uid,
  //   connectedName: displayName,
  // })
  // webSocket.emit('confirm return', {
  //   id: message.id,
  //   choose: message.text.choose,
  //   sendingToken: messagingToken,
  //   creatorId: message.creatorId,
  //   creatorName: message.displayName,
  //   connectedId: uid,
  //   connectedName: displayName,
  // })
}
const specificProcess = async ({ message }) => {
  const data = doc(dbservice, `num/${message.id}`)
  const toUserRef = doc(dbservice, `members/${message.creatorId}`)
  const toUser = await getDoc(toUserRef)
  const messagingToken = toUser.data().messagingToken
  return { data: data, messagingToken: messagingToken }
}
const ConfirmButton = ({ message, uid, displayName, increaseRound }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        onConfirm({
          message: message,
          uid: uid,
          displayName: displayName,
        })
        increaseRound()
      }}
      startIcon={<SendIcon />}
    >
      승낙 메시지 확인
    </Button>
  )
}
const StopSupportButton = ({ userObj, message, uid, displayName, decreaseRound }) => {
  return (
    <div className="flex justify-center">
      {/* <Button variant="contained" disabled>
        승낙 메시지 전송 완료
      </Button> */}
      <div className='px-5'>승낙 메시지 전송 완료</div>
      <Button
        variant="outlined"
        onClick={() => {
          if (userObj) {
            onStopSupporting({
              message: message,
              uid: uid,
              displayName: displayName,
            })
            decreaseRound()
          }
        }}
        startIcon={<SendIcon />}
      >
        취소
      </Button>
    </div>
  )
}
const ReturningButton = ({ message, uid, displayName, increaseRound }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        increaseRound()
        onReturning({
          message: message,
          uid: uid,
          displayName: displayName,
        })
      }}
      startIcon={<SendIcon />}
    >
      반납하기
    </Button>
  )
}
const SupportButton = ({
  userObj,
  move,
  handleClose,
  handleDialog,
  message,
  uid,
  displayName,
  increaseRound,
}) => {
  const profileUrl = useSelector((state) => state.profileUrl.value)

  return (
    <div className="flex justify-center">
      <Button
        variant="outlined"
        onClick={() => {
          if (userObj) {
            onSupporting({
              message: message,
              uid: uid,
              displayName: displayName,
              profileUrl: profileUrl
            })
            increaseRound()
          }
          // else {
          //   handleDialog()
          // }
        }}
        startIcon={<SendIcon />}
      >
        승낙하기
      </Button>
      {/* <Dialogs move={move} handleClose={handleClose} /> */}
    </div>
  )
}
const DeleteButton = ({ message, deleteMessage, decreaseRound }) => {
  return (
    <div className="flex justify-center">
      <Button
        variant="outlined"
        onClick={() => {
          onDelete({ message: message })
          deleteMessage()
          decreaseRound()
        }}
        startIcon={<DeleteIcon />}
      >
        지우기
      </Button>
    </div>
  )
}
const ConfirmReturnButton = ({ num, points, message, uid, displayName, increaseRound }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        onConfirmReturn({
          num: num,
          points: points,
          message: message,
          uid: uid,
          displayName: displayName,
        })
        increaseRound()
      }}
      startIcon={<SendIcon />}
    >
      반납 완료 확인
    </Button>
  )
}
// const webSocket = io("http://localhost:5000");
function Btn({
  messageObj,
  isOwner,
  uid,
  displayName,
  userObj,
  num,
  points,
  deleteMessage,
  round,
  increaseRound,
  decreaseRound,
  changeOnPulse
}) {
  const [move, setMove] = useState(false)
  const handleClose = () => {
    setMove(false)
  }
  const handleDialog = () => {
    setMove(true)
  }
  return (
    <>
      {isOwner ? (
        <>
          {round === 1 && (
            <DeleteButton message={messageObj} deleteMessage={deleteMessage} decreaseRound={decreaseRound} />
          )}
          {round === 2 && (
            <ConfirmButton
              message={messageObj}
              uid={uid}
              displayName={displayName}
              increaseRound={increaseRound}
            />
          )}
          {round === 3 && (
            <div className="flex justify-center">
              {
                messageObj.text.choose === 1 && (
                  <ReturningButton
                    message={messageObj}
                    uid={uid}
                    displayName={displayName}
                    increaseRound={increaseRound}
                  />
                )
                // <Button variant='outlined' onClick={() => {
                //   onReturning({ message: messageObj, uid: uid, displayName: displayName })
                // }}
                //   startIcon={<SendIcon />}>반납하기</Button>
              }
              {messageObj.text.choose === 2 && (
                <div>
                  {messageObj.connectedName} 님이 빌리는 중
                </div>
              )}
            </div>
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <div>
                  주인에게 확인 중
                </div>
              )}
              {messageObj.text.choose === 2 && (
                <ConfirmReturnButton
                  num={num}
                  points={points}
                  message={messageObj}
                  uid={uid}
                  displayName={displayName}
                  increaseRound={increaseRound}
                />
              )}
            </div>
          )}
          {round === 5 && <div>완료된 카드입니다</div>}
        </>
      ) : (
        <>
          {round === 1 && (
            <SupportButton
              userObj={userObj}
              move={move}
              handleClose={handleClose}
              handleDialog={handleDialog}
              message={messageObj}
              uid={uid}
              displayName={displayName}
              increaseRound={increaseRound}
            />
          )}
          {
            round === 2 && (
              <StopSupportButton
                userObj={userObj}
                message={messageObj}
                uid={uid}
                displayName={displayName}
                decreaseRound={decreaseRound}
              />
            )
            // <div className='flex flex-col justify-center'>
            //   <Button variant='contained'
            //     disabled
            //   >승낙 메시지 전송 완료</Button>
            //   <Button variant='outlined' onClick={() => {
            //     if (userObj) {
            //       onStopSupporting({ message: messageObj, uid: uid, displayName: displayName })
            //     }
            //   }}
            //     startIcon={<SendIcon />}>취소</Button>
            // </div>
          }
          {round === 3 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <div>
                  {messageObj.displayName} 님이 빌리는 중
                </div>
              )}
              {
                messageObj.text.choose === 2 && (
                  <ReturningButton
                    message={messageObj}
                    uid={uid}
                    displayName={displayName}
                    increaseRound={increaseRound}
                    changeOnPulse={changeOnPulse}
                  />
                )
                // <Button variant='outlined' onClick={() => {
                //   onReturning({ message: messageObj, uid: uid, displayName: displayName })
                // }}
                //   startIcon={<SendIcon />}>반납하기</Button>
              }
            </div>
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {
                messageObj.text.choose === 1 && (
                  <ConfirmReturnButton
                    num={num}
                    points={points}
                    message={messageObj}
                    uid={uid}
                    displayName={displayName}
                    increaseRound={increaseRound}
                  />
                )
                // <Button variant='outlined' onClick={() => {
                //   onConfirmReturn({ num: num, points: points, message: messageObj, uid: uid, displayName: displayName, data: data, messagingToken: messagingToken })
                // }} endIcon={<SendIcon />}>반납 완료 확인</Button>
              }
              {messageObj.text.choose === 2 && (
                <div>
                  {messageObj.item} 주인에게 확인 중
                </div>
              )}
            </div>
          )}
          {round === 5 && <div>완료된 카드입니다</div>}
        </>
      )}
    </>
  )
}

export default Btn
