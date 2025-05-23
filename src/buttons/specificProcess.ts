import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const specificProcess = async ({ message }) => {
  const data = doc(dbservice, `num/${message.id}`)
  const toUserRef = doc(dbservice, `members/${message.creatorId}`)
  const toUser = await getDoc(toUserRef)
  const messagingToken = toUser.data()?.messagingToken
  return { data: data, messagingToken: messagingToken }
}

export default specificProcess
