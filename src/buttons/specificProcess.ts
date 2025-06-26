import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const specificProcess = async ({ message, toUid }) => {
  const data = doc(dbservice, `num/${message.id}`)
  const toUserId = toUid ? toUid : message.creatorId
  console.log(toUserId)
  const toUserRef = doc(dbservice, `members/${toUserId}`)
  const toUser = await getDoc(toUserRef)
  const messagingToken = toUser.data()?.messagingToken
  return { data: data, messagingToken: messagingToken }
}

export default specificProcess
