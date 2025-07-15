import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const onSupporting = async ({ message, uid, displayName, profileUrl }) => {
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
    connectedClock: new Date().toString(),
  }
  const connectedUserRef = doc(dbservice, `members/${uid}`)
  const connectedUserSnap = await getDoc(connectedUserRef)
  const connectedUserData = connectedUserSnap.data()
  updateDoc(data, {
    round: 2,
    connectedId: uid,
    connectedName: displayName,
    connectedUrl: profileUrl,
    connectedProfileImage: connectedUserData.profileImage,
    connectedDefaultProfile: connectedUserData.defaultProfile,
    connectedProfileImageUrl: connectedUserData.profileImageUrl,
    connectedClock: new Date().toString(),
  })
  const connectedUserConnectedCards = connectedUserData?.connectedCards || []
  updateDoc(connectedUserRef, {
    connectedCards: [...connectedUserConnectedCards, message.id]
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
  changeConnectedUser,
  toggleOnTransfer,
  handleConnectedClock
}) => {
  const profileUrl = useSelectors((state) => state.profileUrl.value)
  const languages = useSelectors((state) => state.languages.value)
  const profileImage = useSelectors(state => state.profileImage.value)
  const defaultProfile = useSelectors(state => state.defaultProfile.value)
  const profileImageUrl = useSelectors(state => state.profileImageUrl.value)
  const sendingProfile = profileImage ? profileImageUrl : defaultProfile
  console.log(profileImage)
  console.log(defaultProfile)
  console.log(profileImageUrl)
  return (
    <div className="flex justify-center">
      <Button
        variant="outlined"
        onClick={() => {
          if (userObj) {
            const clock = new Date().toString()
            onSupporting({
              message: message,
              uid: uid,
              displayName: displayName,
              profileUrl: sendingProfile
            })
            increaseRound()
            changeConnectedUser({
              uid: uid,
              displayName: displayName,
              url: sendingProfile
            })
            toggleOnTransfer()
            handleConnectedClock({ clock: clock, cancelled: false })
          }
        }}
        startIcon={<SendIcon />}
      >
        {languages === 'ko' ? '승낙하기' : 'Confirm'}
      </Button>
    </div>
  )
}

export default SupportButton
