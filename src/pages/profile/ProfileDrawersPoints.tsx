import Divider from '@mui/material/Divider'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors, useTexts } from 'src/hooks'

const ProfileDrawersPoints = ({ cards }) => {
  const [messages, setMessages] = useState([])
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  const { borrowedFrom, lendedTo, points, empty } = useTexts()
  const languages = useSelectors((state) => state.languages.value)
  useEffect(() => {
    const bringMessages = async () => {
      const messagesArray = []
      const messageRef = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', 'desc'),
      )
      const messageSnap = await getDocs(messageRef)
      messageSnap.forEach((doc) => {
        const cardId = doc.id
        if ((cards?.done || []).indexOf(cardId) !== -1) {
          const card = doc.data()
          messagesArray.push(card)
          setMessages(messagesArray)
        }
      })
    }
    if (cards) {
      bringMessages()
    }
  }, [cards])
  const pointsList = messages.map((element, index) => {
    return (
      <div key={index}>
        <div className="flex flex-col justify-center p-5">
          {user.uid === element.creatorId && (
            <div className="flex justify-center">
              {languages === 'en' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
              {element.connectedName}
              {languages === 'ko' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
            </div>
          )}
          {user.uid === element.connectedId && (
            <div className="flex justify-center">
              {languages === 'en' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
              {element.displayName}
              {languages === 'ko' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
            </div>
          )}
          <div className="flex justify-center">
            {element.text.count} {element.text.counter} {element.text.counting}
          </div>
          <div className="flex justify-center">
            {element.text.clock.year}년 {element.text.clock.month}월{' '}
            {element.text.clock.day}일 {element.text.clock.hour}시{' '}
            {element.text.clock.minute}분부터
          </div>
          <div className="flex justify-center">
            {element.text.clocker.year}년 {element.text.clocker.month}월{' '}
            {element.text.clocker.day}일 {element.text.clocker.hour}시{' '}
            {element.text.clocker.minute}분까지
          </div>
          {user.uid === element.creatorId && (
            <div className="flex justify-center">
              {points} {element.text.choose === 1 ? '-' : '+'}
              {element.point}
            </div>
          )}
          {user.uid === element.connectedId && (
            <div className="flex justify-center">
              {points} {element.text.choose === 1 ? '+' : '-'}
              {element.point}
            </div>
          )}
        </div>
        <Divider />
      </div>
    )
  })

  return (
    <div className="p-5">
      {pointsList.length === 0 ? (
        <div className="flex justify-center">
          <div className="rounded shadow-md bg-light-1 dark:bg-dark-1 p-5">
            {empty}
          </div>
        </div>
      ) : (
        <div>{pointsList}</div>
      )}
    </div>
  )
}

export default ProfileDrawersPoints
