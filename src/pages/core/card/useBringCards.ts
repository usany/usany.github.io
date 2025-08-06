import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'

export const useBringCards = (userObj) => {
  const [messages, setMessages] = useState<DocumentData[]>([])
  const [cardLoaded, setCardLoaded] = useState(false)
  useEffect(() => {
    const bringCards = async () => {
      // const collectionQuery = query(
      //   collection(dbservice, 'num'),
      //   orderBy('creatorClock', 'desc'),
      // )
      // const documents = await getDocs(collectionQuery)
      const newArray: DocumentData[] = []
      const docRef = doc(dbservice, `members/${userObj.uid}`)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      const createdCards = userData?.createdCards || []
      const connectedCards = userData?.connectedCards || []
      console.log(createdCards)
      const createdArray = await Promise.all(
        createdCards.map(async (element: string) => {
          const cardDocRef = doc(dbservice, `num/${element}`)
          const cardDocSnap = await getDoc(cardDocRef)
          const cardData = cardDocSnap.data()
          const newObject = { id: cardDocSnap.id, ...cardData }
          if (cardData) newArray.push(newObject)
        }))
      const connectedArray = await Promise.all(
        connectedCards.map(async (element: string) => {
          const cardDocRef = doc(dbservice, `num/${element}`)
          const cardDocSnap = await getDoc(cardDocRef)
          const cardData = cardDocSnap.data()
          const newObject = { id: cardDocSnap.id, ...cardData }
          if (cardData) newArray.push(newObject)
        })
      )
      console.log(newArray)
      // newArray.sort((elementOne: DocumentData, elementTwo: DocumentData) => {
      //     return (elementTwo.round - elementOne.round)
      //   })
      // documents.forEach((element) => {
      //   if (element.data().creatorId === userObj.uid) {
      //     const newObject = { id: element.id, ...element.data() }
      //     newArray.push(newObject)
      //   } else if (
      //     element.data().connectedId === userObj.uid &&
      //     element.data().round !== 1
      //   ) {
      //     const newObject = { id: element.id, ...element.data() }
      //     newArray.push(newObject)
      //   }
      // })
      setMessages(newArray)
      setCardLoaded(true)
      console.log(messages)
    }
    if (navigator.onLine) {
      bringCards()
    }
  }, [])
  return {
    messages: messages,
    handleMessages: (newValue) => setMessages(newValue),
    cardLoaded: cardLoaded,
  }
}
