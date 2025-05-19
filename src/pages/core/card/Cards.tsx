import { ClickAwayListener } from '@mui/material'
import { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import useLongPress from 'src/hooks/useLongPress'
import Draggable from 'src/pages/main/menu/Draggable'
import MorphingDialogs from '../morphingDialogs/MorphingDialogs'
import CardsViews from './CardsViews'

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
  onLongPress,
  changeOnLongPress,
  longPressCard,
  changeLongPressCard,
  deleteMessage,
  longPressed,
  changeLongPressed,
}: Props) => {
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

  const cardsRef = useRef()
  useLongPress(cardsRef, () => {
    if (longPressCard && !onLongPress) {
      changeLongPressed(true)
      changeOnLongPress(onLongPress + 1)
    }
  })
  useEffect(() => {
    if (!onLongPress) {
      changeLongPressed(false)
    }
  }, [onLongPress])
  return (
    <div className="max-w-60 min-w-20 text-sm p-1" ref={cardsRef}>
      {longPressCard === message.id && longPressed ? (
        <div className="flex scale-75">
          <ClickAwayListener
            onClickAway={() => {
              if (longPressCard === message.id) {
                changeOnLongPress(0)
                changeLongPressCard(null)
                changeLongPressed(false)
              }
            }}
          >
            <div>
              <Draggable id={message.id}>
                <div
                  className="longPress touch-none"
                  onClick={() => {
                    changeLongPressed(false)
                    changeOnLongPress(onLongPress - 1)
                  }}
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
        </div>
      ) : (
        <div>
          {longPressed ? (
            <>
              <div>
                <CardsViews
                  message={message}
                  isOwner={isOwner}
                  userObj={userObj}
                  num={num}
                  points={points}
                  deleteMessage={deleteMessage}
                />
              </div>
            </>
          ) : (
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
          )}
        </div>
      )}
    </div>
  )
}

export default Cards
