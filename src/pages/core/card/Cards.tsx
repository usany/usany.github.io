import { DocumentData } from 'firebase/firestore'
import { useEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import useLongPress from 'src/hooks/useLongPress'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsLongPressed from './CardsLongPressed'
import CardsViews from './CardsViews'
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
  useLongPress(cardsRef, () => {
    changeLongPressCard(message.id)
  })
  useEffect(() => {
    if (!longPressCard) {
      changeLongPressCard(null)
    }
  }, [longPressCard])
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressCard ? (
        <>
          {longPressCard === message.id ? (
            <CardsLongPressed
              longPressCard={longPressCard}
              message={message}
              changeLongPressCard={changeLongPressCard}
            />
          ) : (
            <CardsViews message={message} />
          )}
        </>
      ) : (
        <>
        {searchParams.get('id') ?
          <CardsViews message={message} />
          :
          <MorphingDialogs
            message={message}
          />
        }
        </>
      )}
    </div>
  )
}

export default Cards
