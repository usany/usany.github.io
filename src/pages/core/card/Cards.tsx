import { useRef } from 'react'
import useLongPress from 'src/hooks/useLongPress'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsLongPressed from './CardsLongPressed'
import CardsViews from './CardsViews'
import { DocumentData } from 'firebase/firestore'

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
  delayed,
  delayedFalse,
}: Props) => {
  const cardsRef = useRef()
  useLongPress(cardsRef, () => {
    changeLongPressCard(message.id)
  })
  return (
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressCard ? (
        <>
          {longPressCard === message.id ? (
            <CardsLongPressed
              longPressCard={longPressCard}
              message={message}
              changeLongPressCard={changeLongPressCard}
              delayedFalse={delayedFalse}
            />
          ) : (
            <CardsViews message={message} />
          )}
        </>
      ) : (
        <>
          {delayed ||
          location.pathname === '/board' ||
          location.pathname === '/profile' ? (
            <MorphingDialogs
              message={message}
            />
          ) : (
            <CardsViews message={message} />
          )}
        </>
      )}
    </div>
  )
}

export default Cards
