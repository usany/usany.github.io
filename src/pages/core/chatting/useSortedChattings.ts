import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'

export const useSortedChattings = ({ userObj }) => {
  const [chattings, setChattings] = useState({})
  const [chattingNone, setChattingNone] = useState(false)
  const changeChattings = (newValue) => setChattings(newValue)
  const changeChattingNone = (newValue) => setChattingNone(newValue)
  const chattingsArray = navigator.onLine ? chattings : JSON.parse(localStorage.getItem('chattings') || '[]')
  const sorted = Object.keys(chattingsArray).sort((elementOne, elementTwo) => {
    return (
      chattingsArray[elementTwo].messageClockNumber -
      chattingsArray[elementOne].messageClockNumber
    )
  })
  useEffect(() => {
    const bringChattings = async () => {
      const docRef = doc(dbservice, `members/${userObj.uid}`)
      const docSnap = await getDoc(docRef)
      const newChattings = docSnap.data()?.chattings || {}
      setChattings(newChattings)
      localStorage.setItem('chattings', JSON.stringify(newChattings))
      if (!newChattings) {
        setChattingNone(true)
      }
    }
    if (navigator.onLine) {
      bringChattings()
    }
  }, [])
  return {
    chattings: chattings,
    changeChattings: changeChattings,
    sorted: sorted,
    chattingNone: chattingNone,
    changeChattingNone: changeChattingNone
  }
}
