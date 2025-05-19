import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'

// export default function useBottomNavigation() {
//     const [pathname, setPathname] = useState('/')
//     function changePathname(newValue) {
//         setPathname(newValue)
//     }
//     return {pathname, changePathname}
// }
interface messagesProps {
  connectedDefaultProfile?: string | null
  connectedId: string | null
  connectedName: string | null
  connectedProfileImage?: boolean | null
  connectedProfileImageUrl?: boolean | null
  creatorId: string
  id: string
}
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

export const useRound = (message) => {
  const [round, setRound] = useState(0)
  const increaseRound = () => {
    setRound(round + 1)
  }
  const decreaseRound = () => {
    setRound(round - 1)
  }
  useEffect(() => {
    if (!round) {
      setRound(message.round)
    }
  })
  return {
    round: round,
    increaseRound: increaseRound,
    decreaseRound: decreaseRound,
  }
}
