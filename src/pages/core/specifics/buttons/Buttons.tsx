import { Button } from '@mui/material'
import specificProcess from './specificProcess'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { webSocket } from 'src/webSocket'

function ProblemButton({ message, issue, changeIssue }) {
  const profile = useSelectors((state) => state.profile.value)
  const uid = profile.uid
  const onIssue = async () => {
    const { messagingToken } = await specificProcess({
      message: message,
      toUid: uid,
    })
    const docRef = doc(dbservice, `num/${message.id}`)
    const document = await getDoc(docRef)
    const passingObject = {
    }
    updateDoc(docRef, {
      issue: issue ? false : true,
      issueClock: issue ? '' : new Date().toString(),
    })
    webSocket.emit('confirm', passingObject)
  }
  return (
    <Button
      variant='outlined'
      onClick={() => {
        onIssue()
        changeIssue()
      }}
    >
      {issue ? 'Issue Resolved' : 'Issue Occured'}
    </Button>
  )
}

export default ProblemButton
