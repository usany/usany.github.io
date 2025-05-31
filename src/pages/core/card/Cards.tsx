import { ClickAwayListener } from '@mui/material'
import { User } from 'firebase/auth'
import { useRef } from 'react'
import useLongPress from 'src/hooks/useLongPress'
import Draggable from 'src/pages/main/menu/Draggable'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsViews from './CardsViews'
import { useRound } from './useRound'

const CardsLongPressed = ({
  longPressCard,
  message,
  changeLongPressCard,
  // changeLongPressed,
  isOwner,
  userObj,
  num,
  points,
  deleteMessage,
  delayedFalse
}) => {
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (longPressCard === message.id) {
          changeLongPressCard(null)
          // changeLongPressed(false)
          delayedFalse()
        }
      }}
    >
      <div className="flex">
        <Draggable id={message.id}>
          <div
            className="longPress touch-none"
          // onClick={() => {
          //   changeLongPressed(false)
          // }}
          >
            <CardsViews
              message={message}
              isOwner={isOwner}
              userObj={userObj}
              num={num}
              points={points}
              deleteMessage={deleteMessage}
            />
          </div>
        </Draggable>
      </div>
    </ClickAwayListener>
  )
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
  // longPressed,
  // changeLongPressed,
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
          {delayed ?
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
