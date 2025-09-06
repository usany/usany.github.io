import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'

export const useBringCards = (profile) => {
  const [messages, setMessages] = useState<DocumentData[]>([])
  const [cardLoaded, setCardLoaded] = useState(false)
  useEffect(() => {
    const bringCards = async () => {
      const newArray: DocumentData[] = []
      const docRef = doc(dbservice, `members/${profile?.uid}`)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      const createdCards = userData?.createdCards || []
      const connectedCards = userData?.connectedCards || []
      await Promise.all(
        createdCards.map(async (element: string) => {
          const cardDocRef = doc(dbservice, `num/${element}`)
          const cardDocSnap = await getDoc(cardDocRef)
          const cardData = cardDocSnap.data()
          const newObject = { id: cardDocSnap.id, ...cardData }
          if (cardData) newArray.push(newObject)
        }))
      await Promise.all(
        connectedCards.map(async (element: string) => {
          const cardDocRef = doc(dbservice, `num/${element}`)
          const cardDocSnap = await getDoc(cardDocRef)
          const cardData = cardDocSnap.data()
          const newObject = { id: cardDocSnap.id, ...cardData }
          if (cardData) newArray.push(newObject)
        })
      )
      setMessages(newArray)
      setCardLoaded(true)
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
