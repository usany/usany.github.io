import { Button } from '@mui/material'
import specificProcess from './specificProcess'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { webSocket } from 'src/webSocket'

function ProblemButton({ message, issue, changeIssue }) {
  const profile = useSelectors((state) => state.profile.value)
  const uid = profile.uid
  const onIssueFalse = async () => {
    const { messagingToken } = await specificProcess({
      message: message,
      toUid: uid,
    })
    const docRef = doc(dbservice, `num/${message.id}`)
    const document = await getDoc(docRef)
    const passingObject = {
      // id: message.id,
      // choose: message.text.choose,
      // sendingToken: messagingToken,
      // creatorId: message.creatorId,
      // creatorName: message.displayName,
      // connectedId: document.data()?.connectedId,
      // connectedName: document.data()?.connectedName,
      // connectedUrl: profileUrl,
      // preferLanguage: document.data()?.preferLanguage || 'ko',
      // confirmingClock: new Date().toString(),
    }
    updateDoc(docRef, {
      issue: false,
      issueClock: new Date().toString(),
    })
    webSocket.emit('confirm', passingObject)
  }
  return (
    <Button
      variant='outlined'
      onClick={() => {
        onIssueFalse()
        changeIssue()
      }}
    >
      {issue ? 'Issue Resolved' : 'Issue Occured'}
    </Button>
  )
}

export default ProblemButton
