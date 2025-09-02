import { User } from 'firebase/auth'
import { useRef } from 'react'
import useLongPress from 'src/hooks/useLongPress'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsLongPressed from './CardsLongPressed'
import CardsViews from './CardsViews'
import { useRound } from './useRound'

interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const Cards = ({
  message,
  isOwner,
  num,
  points,
  longPressCard,
  changeLongPressCard,
  deleteMessage,
  delayed,
  delayedFalse,
}: Props) => {
  const profile = useSelectors((state) => state.profile.value)
  const { round, increaseRound, decreaseRound } = useRound(message)
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
              isOwner={isOwner}
              userObj={profile}
              num={num}
              points={points}
              round={round}
              increaseRound={increaseRound}
              decreaseRound={decreaseRound}
              deleteMessage={deleteMessage}
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
