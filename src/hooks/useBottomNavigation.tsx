import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { webSocket } from 'src/webSocket'
import { useSelectors } from './useSelectors'

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

export const useConnectedUser = ({ message }) => {
  const [connectedUser, setConnectedUser] = useState({
    uid: '',
    displayName: '',
    url: '',
  })
  const changeConnectedUser = (newValue) => setConnectedUser(newValue)
  useEffect(() => {
    setConnectedUser({
      uid: message.connectedId,
      displayName: message.connectedName,
      url: message.connectedUrl,
    })
  }, [])
  return {
    connectedUser: connectedUser,
    changeConnectedUser: changeConnectedUser,
  }
}
export const usePulse = ({ message, round, userObj }) => {
  const [onPulse, setOnPulse] = useState(false)
  const changeOnPulse = (newValue) => setOnPulse(newValue)
  useEffect(() => {
    if (message.text.choose === 1) {
      if (message.creatorId === userObj?.uid) {
        if (round === 2 || round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === userObj?.uid) {
        if (round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    } else {
      if (message.creatorId === userObj.uid) {
        if (round === 2 || round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === userObj.uid) {
        if (round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    }
  }, [round])
  return { onPulse: onPulse, changeOnPulse: changeOnPulse }
}

export const useOnPulseCallback = ({
  userObj,
  round,
  changeOnPulse,
  message,
}) => {
  useEffect(() => {
    if (!webSocket) return
    function sOnPulseCallback(res) {
      if (res.choose === 1) {
        if (res.creatorId === userObj.uid) {
          if (round === 1 || round === 2) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === userObj.uid) {
          if (round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      } else {
        if (res.creatorId === userObj.uid) {
          if (round === 2 || round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === userObj.uid) {
          if (round === 3) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      }
    }
    webSocket.on(`sOnPulse${message.id}`, sOnPulseCallback)
    return () => {
      webSocket.off(`sOnPulse${message.id}`, sOnPulseCallback)
    }
  })
}
export const useIncreaseCardCallback = ({ increaseRound, message }) => {
  useEffect(() => {
    if (!webSocket) return
    function sIncreaseCardCallback() {
      increaseRound()
    }
    webSocket.on(`sIncrease${message.id}`, sIncreaseCardCallback)
    return () => {
      webSocket.off(`sIncrease${message.id}`, sIncreaseCardCallback)
    }
  })
}
export const useDecreaseCardCallback = ({ decreaseRound, message }) => {
  useEffect(() => {
    if (!webSocket) return
    function sDecreaseCardCallback() {
      decreaseRound()
    }
    webSocket.on(`sDecrease${message.id}`, sDecreaseCardCallback)
    return () => {
      webSocket.off(`sDecrease${message.id}`, sDecreaseCardCallback)
    }
  })
}
export const useSupportTradesCallback = ({ changeConnectedUser, message }) => {
  useEffect(() => {
    if (!webSocket) return
    function sSupportTradesCallback(res) {
      const user = {
        uid: res.connectedId,
        displayName: res.connectedName,
        url: res.connectedUrl,
      }
      changeConnectedUser(user)
    }
    webSocket.on(`sSupportTrades${message.id}`, sSupportTradesCallback)
    return () => {
      webSocket.off(`sSupportTrades${message.id}`, sSupportTradesCallback)
    }
  })
}
export const useStopSupportingTradesCallback = ({
  changeConnectedUser,
  message,
}) => {
  useEffect(() => {
    if (!webSocket) return
    function sStopSupportingTradesCallback() {
      const user = {
        uid: '',
        displayName: '',
        url: '',
      }
      changeConnectedUser(user)
    }
    webSocket.on(
      `sStopSupportingTrades${message.id}`,
      sStopSupportingTradesCallback,
    )
    return () => {
      webSocket.off(
        `sStopSupportingTrades${message.id}`,
        sStopSupportingTradesCallback,
      )
    }
  })
}

export const useSortedChattings = ({ userObj }) => {
  const [chattings, setChattings] = useState({})
  const changeChattings = (newValue) => setChattings(newValue)
  const sorted = Object.keys(chattings).sort((elementOne, elementTwo) => {
    return (
      chattings[elementTwo].messageClockNumber -
      chattings[elementOne].messageClockNumber
    )
  })
  useEffect(() => {
    const bringChattings = async () => {
      const docRef = doc(dbservice, `members/${userObj.uid}`)
      const docSnap = await getDoc(docRef)
      const newChattings = docSnap.data()?.chattings || {}
      setChattings(newChattings)
    }
    bringChattings()
  }, [])
  return {
    chattings: chattings,
    changeChattings: changeChattings,
    sorted: sorted,
  }
}
export const usePiazzaMessage = () => {
  const [piazzaMessage, setPiazzaMessage] = useState<{
    username: string
    message: string
  } | null>(null)
  const changePiazzaMessage = (newValue: string) => setPiazzaMessage(newValue)
  const piazzaSwitch = useSelectors((state) => state.piazzaSwitch.value)
  useEffect(() => {
    const piazza = async () => {
      const piazzaRef = collection(dbservice, 'chats_group')
      const piazzaCollection = query(
        piazzaRef,
        orderBy('messageClockNumber', 'desc'),
        limit(1),
      )
      const piazzaMessages = await getDocs(piazzaCollection)
      piazzaMessages.forEach((doc) => {
        if (!piazzaMessage) {
          setPiazzaMessage({
            username: doc.data().userName,
            messageClock: doc.data().messageClock,
            messageClockNumber: doc.data().messageClockNumber,
            message: doc.data().message,
            piazzaChecked: doc.data().piazzaChecked || [],
          })
        }
      })
    }
    if (piazzaSwitch === 'true') {
      piazza()
    }
  }, [])
  return { piazzaMessage, changePiazzaMessage }
}

