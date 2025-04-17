import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { updateDoc } from 'firebase/firestore'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

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

const ReturningButton = ({ message, uid, displayName, increaseRound }) => {
  const languages = useSelectors((state) => state.languages.value)

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
      {languages === 'ko' ?
        '반납하기'
        :
        'Return'
      }
    </Button>
  )
}

export default ReturningButton
