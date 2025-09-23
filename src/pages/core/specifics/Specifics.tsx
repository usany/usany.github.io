import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import { User } from 'firebase/auth'
import { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import { staticArray } from '../card/CardView'
import SpecificsActions from './SpecificsActions'
import SpecificsButtons from './SpecificsButtons'
import SpecificsDimensions from './SpecificsDimensions'
import SpecificsRear from './SpecificsRear'
import SpecificsSteppers from './SpecificsSteppers'
import SpecificsTrades from './SpecificsTrades'
const shadowColorArray = [
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightsteelblue',
  'lightyellow',
]
const alpha = Array.from(Array(26)).map((e, i) => i + 65)
const letters = alpha.map((x) => String.fromCharCode(x))
const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
const mergedArray = letters.concat(numbers)

interface Props {
  message: {}
}

function Specifics({
  round,
  increaseRound,
  decreaseRound,
  drawerOpenTrue,
  message,
  onPulse,
  changeOnPulse,
  connectedUser,
  changeConnectedUser,
  toggleOnTransfer,
  removeMessage,
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
}: Props) {
  const staticImg = staticArray[message.text.count] || staticArray['building']
  const [cardFlipped, setCardFlipped] = useState(false)
  const [cardTilt, setCardTilt] = useState(false)
  const [cardTilting, setCardTilting] = useState(null)
  const [onMove, setOnMove] = useState(false)
  const id = message?.id || ''
  const shadowColor =
    shadowColorArray[
      mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
    ]
  const flipCards = () => {
    setCardFlipped(!cardFlipped)
  }
  return (
    <div
      className="z-50 text-xs"
      onMouseDownCapture={() => {
        setOnMove(true)
      }}
      onTouchStartCapture={() => {
        setOnMove(true)
      }}
      onMouseMove={() => {
        if (onMove) {
          setCardTilting(null)
          setCardTilt(true)
        }
      }}
      onMouseLeave={() => {
        setOnMove(false)
        setTimeout(() => {
          setCardTilt(false)
        }, 10)
      }}
      onTouchMove={() => {
        if (onMove) {
          setCardTilting(null)
          setCardTilt(true)
        }
      }}
      onMouseUp={() => {
        setCardTilting(0)
        setOnMove(false)
        setTimeout(() => {
          setCardTilt(false)
        }, 10)
      }}
      onTouchEndCapture={() => {
        setCardTilting(0)
        setOnMove(false)
        setTimeout(() => {
          setCardTilt(false)
        }, 10)
      }}
    >
      <div className="flex justify-center" onClick={() => flipCards()}>
        flip card
      </div>
      <Tilt
        tiltEnable={cardTilt}
        tiltAngleXManual={cardTilting}
        tiltAngleYManual={cardTilting}
      >
        <div className={`cards ${cardFlipped && 'rotatingCards'} z-50`}>
          {onPulse ? (
            <div className="sides">
              <PulsatingButton
                pulseColor={shadowColor}
                className="cursor-default"
              >
                <Card
                  className="colorTwo"
                  sx={{
                    maxWidth: `${window.screen.width * 0.9}px`,
                    boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
                  }}
                >
                  <CardContent>
                    <SpecificsActions
                      drawerOpenTrue={drawerOpenTrue}
                      message={message}
                    />
                    <div className="flex justify-center pt-1">
                      <CardMedia
                        sx={{
                          width: ((200 * 188) / 141) * 0.9,
                          height: 188 * 0.9,
                          borderRadius: '10px',
                        }}
                        image={staticImg}
                      />
                    </div>
                    <SpecificsDimensions message={message} />
                    <Divider />
                    <SpecificsTrades
                      drawerOpenTrue={drawerOpenTrue}
                      message={message}
                      connectedUser={connectedUser}
                    />
                    <Divider />
                    <div>
                      <SpecificsSteppers message={message} round={round} />
                    </div>
                    <Divider />
                    <SpecificsButtons
                      round={round}
                      increaseRound={increaseRound}
                      decreaseRound={decreaseRound}
                      message={message}
                      changeOnPulse={changeOnPulse}
                      changeConnectedUser={changeConnectedUser}
                      toggleOnTransfer={toggleOnTransfer}
                      removeMessage={removeMessage}
                      handleConnectedClock={handleConnectedClock}
                      handleConfirmingClock={handleConfirmingClock}
                      handleReturningClock={handleReturningClock}
                      handleConfirmedReturnClock={handleConfirmedReturnClock}
                    />
                  </CardContent>
                </Card>
              </PulsatingButton>
            </div>
          ) : (
            <div className={`sides`}>
              <Card
                className="colorTwo"
                sx={{
                  maxWidth: `${window.screen.width * 0.9}px`,
                  boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
                }}
              >
                <CardContent>
                  <SpecificsActions
                    drawerOpenTrue={drawerOpenTrue}
                    message={message}
                  />
                  <div className="flex justify-center pt-1">
                    <CardMedia
                      sx={{
                        width: ((200 * 188) / 141) * 0.9,
                        height: 188 * 0.9,
                        borderRadius: '10px',
                      }}
                      image={staticImg}
                    />
                  </div>
                  <SpecificsDimensions message={message} />
                  <Divider />
                  <SpecificsTrades
                    drawerOpenTrue={drawerOpenTrue}
                    message={message}
                    connectedUser={connectedUser}
                  />
                  <Divider />
                  <SpecificsSteppers message={message} round={round} />
                  <Divider />
                  <SpecificsButtons
                    round={round}
                    increaseRound={increaseRound}
                    decreaseRound={decreaseRound}
                    message={message}
                    changeOnPulse={changeOnPulse}
                    changeConnectedUser={changeConnectedUser}
                    toggleOnTransfer={toggleOnTransfer}
                    removeMessage={removeMessage}
                    handleConnectedClock={handleConnectedClock}
                    handleConfirmingClock={handleConfirmingClock}
                    handleReturningClock={handleReturningClock}
                    handleConfirmedReturnClock={handleConfirmedReturnClock}
                  />
                </CardContent>
              </Card>
            </div>
          )}
          <SpecificsRear
            message={message}
            shadowColor={shadowColor}
            connectedClock={connectedClock}
            confirmingClock={confirmingClock}
            returningClock={returningClock}
            confirmedReturnClock={confirmedReturnClock}
          />
        </div>
      </Tilt>
    </div>
  )
}

export default Specifics
