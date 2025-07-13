import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const onStopSupporting = async ({ message, uid, displayName, profileUrl }) => {
  const { data, messagingToken } = await specificProcess({ message: message, toUid: null })
  const userDoc = await getDoc(data)
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
    connectedUrl: profileUrl,
    preferLanguage: userDoc.data()?.preferLanguage || 'ko',
  }
  updateDoc(data, {
    round: 1,
    connectedId: null,
    connectedName: null,
    connectedUrl: null,
    connectedClock: null,
  })
  const connectedUserRef = doc(dbservice, `members/${uid}`)
  const connectedUserSnap = await getDoc(connectedUserRef)
  const connectedUserData = connectedUserSnap.data()
  const connectedUserConnectedCards = connectedUserData?.connectedCards
  const newConnectedUserConnectedCards = connectedUserConnectedCards.filter((element) => element !== message.id)
  updateDoc(connectedUserRef, {
    connectedCards: [...newConnectedUserConnectedCards]
  })
  webSocket.emit('stop supporting', passingObject)
}
const StopSupportButton = ({ userObj, message, uid, displayName, decreaseRound, changeConnectedUser, toggleOnTransfer, handleConnectedClock }) => {
  const languages = useSelectors((state) => state.languages.value)
  const profileUrl = useSelectors((state) => state.profileUrl.value)

  return (
    <div className="flex justify-center">
      {/* <Button variant="contained" disabled>
        승낙 메시지 전송 완료
      </Button> */}
      <div className='px-5'>{languages === 'ko' ? '승낙 메시지 전송 완료' : 'Support message sent'}</div>
      <Button
        variant="outlined"
        onClick={() => {
          if (userObj) {
            onStopSupporting({
              message: message,
              uid: uid,
              displayName: displayName,
              profileUrl: profileUrl
            })
            decreaseRound()
            changeConnectedUser({
              uid: '',
              displayName: '',
              url: ''
            })
            toggleOnTransfer()
            handleConnectedClock('')
          }
        }}
        startIcon={<SendIcon />}
      >
        {languages === 'ko' ? '취소' : 'Cancel'}
      </Button>
    </div>
  )
}

export default StopSupportButton
