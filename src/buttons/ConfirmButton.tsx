import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { updateDoc } from 'firebase/firestore'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

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

export default ConfirmButton
