import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { webSocket } from 'src/webSocket.tsx'

const onSupporting = async ({ message, uid, displayName, profileUrl }) => {
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
        }}
        startIcon={<SendIcon />}
      >
        승낙하기
      </Button>
    </div>
  )
}

export default SupportButton
