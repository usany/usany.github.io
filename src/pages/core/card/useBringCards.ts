import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'

export const useBringCards = (userObj) => {
  const [messages, setMessages] = useState([])
  const [cardLoaded, setCardLoaded] = useState(false)
  useEffect(() => {
    const bringCards = async () => {
      const collectionQuery = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', 'desc'),
      )
      const documents = await getDocs(collectionQuery)
      const newArray = []
      const docRef = doc(dbservice, `members/${uid}`)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      const createdCards = userData?.createdCards || []
      const connectedCards = userData?.connectedCards || []
      documents.forEach((element) => {
        if (element.data().creatorId === userObj.uid) {
          const newObject = { id: element.id, ...element.data() }
          newArray.push(newObject)
        } else if (
          element.data().connectedId === userObj.uid &&
          element.data().round !== 1
        ) {
          const newObject = { id: element.id, ...element.data() }
          newArray.push(newObject)
        }
      })
      setMessages(newArray)
      setCardLoaded(true)
      console.log(messages)
    }
    bringCards()
  }, [])
  return {
    messages: messages,
    handleMessages: (newValue) => setMessages(newValue),
    cardLoaded: cardLoaded,
  }
}
