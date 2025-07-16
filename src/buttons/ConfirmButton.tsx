import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { getDoc, updateDoc } from 'firebase/firestore'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const onConfirm = async ({ message, uid, displayName, profileUrl }) => {
  const { data, messagingToken } = await specificProcess({ message: message, toUid: uid })
  console.log(data)
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
    confirmingClock: new Date().toString(),
  }
  updateDoc(data, {
    round: 3,
    confirmingClock: new Date().toString(),
  })
  webSocket.emit('confirm', passingObject)
}

const ConfirmButton = ({ message, uid, displayName, increaseRound, handleConfirmingClock }) => {
  const languages = useSelectors((state) => state.languages.value)
  const profileUrl = useSelectors((state) => state.profileUrl.value)

  return (
    <Button
      variant="outlined"
      onClick={() => {
        onConfirm({
          message: message,
          uid: uid,
          displayName: displayName,
          profileUrl: profileUrl,
        })
        increaseRound()
        handleConfirmingClock(new Date().toString())
      }}
      startIcon={<SendIcon />}
    >
      {languages === 'ko' ?
        '승낙 메시지 확인'
        :
        'Confirm support message'
      }
    </Button>
  )
}

export default ConfirmButton
