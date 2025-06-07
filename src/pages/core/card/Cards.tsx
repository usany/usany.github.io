import { User } from 'firebase/auth'
import { useRef } from 'react'
import staticCl from 'src/assets/static_cl.jpg'
import staticCw from 'src/assets/static_cw.jpg'
import staticG from 'src/assets/static_g.jpg'
import useLongPress from 'src/hooks/useLongPress'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsLongPressed from './CardsLongPressed'
import CardsViews from './CardsViews'
import { useRound } from './useRound'

export const staticArray = {
  '중도': staticCl,
  '간호이과대': staticG,
  '청운': staticCw
}
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
  userObj,
  num,
  points,
  longPressCard,
  changeLongPressCard,
  deleteMessage,
  delayed,
  delayedFalse
}: Props) => {
  const { round, increaseRound, decreaseRound } = useRound(message)
  const cardsRef = useRef()
  useLongPress(cardsRef, () => {
    changeLongPressCard(message.id)
    // if (longPressCard) {
    //   changeLongPressed(true)
    // }
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
              // changeLongPressed={changeLongPressed}
              isOwner={isOwner}
              userObj={userObj}
              num={num}
              points={points}
              deleteMessage={deleteMessage}
              delayedFalse={delayedFalse}
            />
          ) : (
            <CardsViews
              message={message}
              isOwner={isOwner}
              userObj={userObj}
              num={num}
              points={points}
              deleteMessage={deleteMessage}
            />
          )}
        </>
      ) : (
        <>
          {delayed || location.pathname === '/board' ?
            <div
            // onMouseDownCapture={() => {
            //   const longPress = message.id
            //   changeLongPressCard(longPress)
            // }}
            // onTouchStartCapture={() => {
            //   const longPress = message.id
            //   changeLongPressCard(longPress)
            // }}
            >
              <MorphingDialogs
                message={message}
                isOwner={isOwner}
                userObj={userObj}
                num={num}
                points={points}
                round={round}
                increaseRound={increaseRound}
                decreaseRound={decreaseRound}
                deleteMessage={deleteMessage}
              />
            </div>
            :
            <CardsViews
              message={message}
              isOwner={isOwner}
              userObj={userObj}
              num={num}
              points={points}
              deleteMessage={deleteMessage}
            />
          }
        </>
      )}
    </div>
  )
}

export default Cards
