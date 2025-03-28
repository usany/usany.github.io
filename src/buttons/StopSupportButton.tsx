import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { updateDoc } from 'firebase/firestore'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

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

export default StopSupportButton
