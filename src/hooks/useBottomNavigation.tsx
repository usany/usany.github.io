import {
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'

// export default function useBottomNavigation() {
//     const [pathname, setPathname] = useState('/')
//     function changePathname(newValue) {
//         setPathname(newValue)
//     }
//     return {pathname, changePathname}
// }
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
    }
    bringCards()
  }, [])
  return { messages: messages, handleMessages: (newValue) => setMessages(newValue), cardLoaded: cardLoaded }
}

const useLongPressCard = () => {
  const [longPressCard, setLongPressCard] = useState(null)
  useEffect(() => {
    if (!onLongPress) {
      setLongPressCard(null)
    }
  }, [onLongPress])
  return longPressCard
}
