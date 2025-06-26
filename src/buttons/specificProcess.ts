import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const specificProcess = async ({ message, toCreator }) => {
  const data = doc(dbservice, `num/${message.id}`)
  const toUserId = toCreator ? message.creatorId : message.connectedId
  const toUserRef = doc(dbservice, `members/${toUserId}`)
  const toUser = await getDoc(toUserRef)
  const messagingToken = toUser.data()?.messagingToken
  return { data: data, messagingToken: messagingToken }
}

export default specificProcess
