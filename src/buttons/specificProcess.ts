import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const specificProcess = async ({ message, toUid }) => {
  const data = doc(dbservice, `num/${message.id}`)
  const toUserId = toUid ? toUid : message.creatorId
  const toUserRef = doc(dbservice, `members/${toUserId}`)
  const toUser = await getDoc(toUserRef)
  const messagingToken = toUser.data()?.messagingToken
  console.log(messagingToken)
  return { data: data, messagingToken: messagingToken }
}

export default specificProcess
