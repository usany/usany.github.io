import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const useStopSupporting = async (message) => {
  const profile = useSelectors((state) => state.profile.value)
  const profileUrl = profile?.profileImage ? profile?.profileImageUrl : profile?.defaultProfile,

  const { data, messagingToken } = await specificProcess({
    message: message,
    toUid: null,
  })
  const userDoc = await getDoc(data)
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: profile.uid,
    connectedName: profile.displayName,
    connectedUrl: profileUrl,
    preferLanguage: userDoc.data()?.preferLanguage || 'ko',
  }
  updateDoc(data, {
    round: 1,
    connectedId: null,
    connectedName: null,
    connectedClock: null,
    connectedProfileImage: false,
    connectedDefaultProfile: null,
    connectedProfileImageUrl: null,
    connectedUrl: null,
  })
  const connectedUserRef = doc(dbservice, `members/${profile.uid}`)
  const connectedUserSnap = await getDoc(connectedUserRef)
  const connectedUserData = connectedUserSnap.data()
  const connectedUserConnectedCards = connectedUserData?.connectedCards
  const newConnectedUserConnectedCards = connectedUserConnectedCards.filter(
    (element) => element !== message.id,
  )
  updateDoc(connectedUserRef, {
    connectedCards: [...newConnectedUserConnectedCards],
  })
  webSocket.emit('stop supporting', passingObject)
}
const StopSupportButton = ({
  message,
  decreaseRound,
  changeConnectedUser,
  toggleOnTransfer,
  handleConnectedClock,
}) => {
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  return (
    <div className="flex justify-center">
      <div className="px-5">
        {languages === 'ko' ? '승낙 메시지 전송 완료' : 'Support message sent'}
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          if (profile) {
            useStopSupporting(message)
            decreaseRound()
            changeConnectedUser({
              uid: '',
              displayName: '',
              url: '',
            })
            toggleOnTransfer()
            handleConnectedClock({ clock: '', cancelled: true })
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
