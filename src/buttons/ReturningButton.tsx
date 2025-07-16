import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { getDoc, updateDoc } from 'firebase/firestore'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const onReturning = async ({ message, uid, displayName, profileUrl }) => {

  const { data, messagingToken } = await specificProcess({ message: message, toUid: message.text.choose === 1 ? uid : null })
  const doc = await getDoc(data)
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: doc.data()?.connectedId,
    connectedName: doc.data()?.connectedName,
    connectedUrl: profileUrl,
    preferLanguage: doc.data()?.preferLanguage || 'ko',
    returningClock: new Date().toString(),
  }
  updateDoc(data, {
    round: 4,
    returningClock: new Date().toString()
  })
  webSocket.emit('returning', passingObject)
}

const ReturningButton = ({ message, uid, displayName, increaseRound, handleReturningClock }) => {
  const languages = useSelectors((state) => state.languages.value)
  const profileUrl = useSelectors((state) => state.profileUrl.value)

  return (
    <Button
      variant="outlined"
      onClick={() => {
        increaseRound()
        onReturning({
          message: message,
          uid: uid,
          displayName: displayName,
          profileUrl: profileUrl
        })
        handleReturningClock(new Date().toString())
      }}
      startIcon={<SendIcon />}
    >
      {languages === 'ko' ?
        '반납하기'
        :
        'Return'
      }
    </Button>
  )
}

export default ReturningButton
