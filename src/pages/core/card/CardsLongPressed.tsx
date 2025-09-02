import { ClickAwayListener } from '@mui/material'
import Draggable from 'src/pages/main/menu/Draggable'
import CardsViews from './CardsViews'

const CardsLongPressed = ({
  longPressCard,
  message,
  changeLongPressCard,
  // changeLongPressed,
  isOwner,
  num,
  points,
  deleteMessage,
  delayedFalse,
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
            <CardsViews message={message} />
          </div>
        </Draggable>
      </div>
    </ClickAwayListener>
  )
}

export default CardsLongPressed
