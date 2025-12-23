import { DocumentData } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import useLongPress from 'src/hooks/useLongPress'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsLongPressed from './CardsLongPressed'
import CardsViews from './CardsViews'
import useSelectors from 'src/hooks/useSelectors'
interface Props {
  message: DocumentData
  longPressCard: string
  changeLongPressCard: (newValue: string) => void
  deleteMessage: () => void
  delayed: boolean
  delayedFalse: () => void
}

const Cards = ({
  message,
  longPressCard,
  changeLongPressCard,
}: Props) => {
  const cardsRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const [messageValue, setMessageValue] = useState({})
  useEffect(() => {
    setMessageValue(message)
  }, [message])
  useLongPress(cardsRef, () => {
    if (location.pathname === '/') {
      changeLongPressCard(message.id)
    }
  })
  useEffect(() => {
    if (!longPressCard && location.pathname === '/') {
      changeLongPressCard('')
    }
  }, [longPressCard])
  return (
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressCard ? (
        <>
          {longPressCard === message.id ? (
            <CardsLongPressed
              longPressCard={longPressCard}
              message={messageValue}
              changeLongPressCard={changeLongPressCard}
            />
          ) : (
            <CardsViews message={messageValue} />
          )}
        </>
      ) : (
        <>
          {searchParams.get('id') ?
            <CardsViews message={messageValue} />
            :
            <MorphingDialogs
              message={messageValue}
            />
          }
        </>
      )}
    </div>
  )
}

export default Cards
