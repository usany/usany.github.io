import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const onSupporting = async ({ message, uid, displayName, profileUrl }) => {
  const { data, messagingToken } = await specificProcess({ message: message, toCreator: true })
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: uid,
    connectedName: displayName,
    connectedUrl: profileUrl
  }
  updateDoc(data, {
    round: 2,
    connectedId: uid,
    connectedName: displayName,
    connectedUrl: profileUrl,
  })
  const connectedUserRef = doc(dbservice, `members/${uid}`)
  const connectedUserSnap = await getDoc(connectedUserRef)
  const connectedUserData = connectedUserSnap.data()
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
  toggleOnTransfer
}) => {
  const profileUrl = useSelectors((state) => state.profileUrl.value)
  const languages = useSelectors((state) => state.languages.value)

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
            changeConnectedUser({
              uid: uid,
              displayName: displayName,
              url: profileUrl
            })
            toggleOnTransfer()
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
