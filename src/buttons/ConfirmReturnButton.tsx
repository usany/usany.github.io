import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

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
}
const ConfirmReturnButton = ({ num, points, message, uid, displayName, increaseRound }) => {
  const languages = useSelectors((state) => state.languages.value)
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
      {languages === 'ko' ?
        '반납 완료 확인'
        :
        'Confirm return complete'
      }
    </Button>
  )
}

export default ConfirmReturnButton
