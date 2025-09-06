import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

export interface UserData {
  createdCards: string[]
  connectedCards: string[]
  borrowDoneCount: string[]
  lendDoneCount: string[]
  points: number
}
interface Props {
  num: number
  points: number
  uid: string
  displayName: string
  increaseRound: () => void
}

const onConfirmReturn = async ({ num, points, message, uid, profileUrl }) => {
  const { data, messagingToken } = await specificProcess({
    message: message,
    toUid: message.text.choose === 1 ? null : uid,
  })
  const dataDoc = await getDoc(data)
  updateDoc(data, {
    round: 5,
    confirmedReturnClock: new Date().toString(),
  })
  const point = doc(dbservice, `members/${message.creatorId}`)
  const connectedPoint = doc(
    dbservice,
    `members/${dataDoc.data()?.connectedId}`,
  )
  const creatorSnap = await getDoc(point)
  const connectedSnap = await getDoc(connectedPoint)
  const creatorData = creatorSnap.data() as UserData
  const connectedData = connectedSnap.data() as UserData
  const creatorDone = creatorSnap.data()?.done || []
  const connectedDone = connectedSnap.data()?.done || []
  const createdCards = creatorData?.createdCards
  const connectedCards = connectedData?.connectedCards
  const newCreatedCards = createdCards.filter(
    (element) => element !== message.id,
  )
  const newConnectedCards = connectedCards.filter(
    (element) => element !== message.id,
  )

  if (message.text.choose === 1) {
    const creatorBorrowDone = creatorData?.borrowDoneCount || []
    const connectedLendDone = connectedData?.lendDoneCount || []
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
  updateDoc(point, { createdCards: [...newCreatedCards] })
  updateDoc(connectedPoint, {
    connectedCards: [...newConnectedCards],
  })

  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: dataDoc.data()?.connectedId,
    connectedName: dataDoc.data()?.connectedName,
    connectedUrl: profileUrl,
    preferLanguage: dataDoc.data()?.preferLanguage || 'ko',
    confirmedReturnClock: new Date().toString(),
  }
  updateDoc(point, {
    done: [...creatorDone, message.id],
  })
  updateDoc(connectedPoint, {
    done: [...connectedDone, message.id],
  })

  webSocket.emit('confirmReturn', passingObject)
}
const ConfirmReturnButton = ({
  num,
  points,
  message,
  increaseRound,
  handleConfirmedReturnClock,
}: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  return (
    <Button
      variant="outlined"
      onClick={() => {
        onConfirmReturn({
          num: num,
          points: points,
          message: message,
          uid: profile?.uid,
          profileUrl: profile?.profileImage ? profile?.profileImageUrl : profile?.defaultProfile,
        })
        increaseRound()
        handleConfirmedReturnClock(new Date().toString())
      }}
      startIcon={<SendIcon />}
    >
      {languages === 'ko' ? '반납 완료 확인' : 'Confirm return complete'}
    </Button>
  )
}

export default ConfirmReturnButton
