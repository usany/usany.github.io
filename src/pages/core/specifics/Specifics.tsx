import { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import SpecificsRear from './SpecificsRear'
import SpecificsFront from './SpecificsDefault'
import SpecificsDefault from './SpecificsDefault'
import getShadowColor from './getShadowColor'
import { RotateCcw, Redo } from 'lucide-react';
import deleteMessage from '../card/deleteMessage'

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
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
}: Props) {
  const [cardFlipped, setCardFlipped] = useState(false)
  const [cardTilt, setCardTilt] = useState(false)
  const [cardTilting, setCardTilting] = useState(null)
  const [onMove, setOnMove] = useState(false)
  const id = message?.id || ''
  const shadowColor = getShadowColor(id)
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
      <div className="flex justify-center" onClick={flipCards}>
        <Redo />
      </div>
      <Tilt
        tiltEnable={cardTilt}
        tiltAngleXManual={cardTilting}
        tiltAngleYManual={cardTilting}
      >
        <div className={`cards ${cardFlipped && 'rotatingCards'} z-50`}>
          <div className="sides">
            {onPulse ? (
              <PulsatingButton
                pulseColor={shadowColor}
                className="cursor-default"
              >
                <SpecificsDefault
                  drawerOpenTrue={drawerOpenTrue}
                  message={message}
                  connectedUser={connectedUser}
                  round={round}
                  increaseRound={increaseRound}
                  decreaseRound={decreaseRound}
                  changeOnPulse={changeOnPulse}
                  changeConnectedUser={changeConnectedUser}
                  toggleOnTransfer={toggleOnTransfer}
                  handleConnectedClock={handleConnectedClock}
                  handleConfirmingClock={handleConfirmingClock}
                  handleReturningClock={handleReturningClock}
                  handleConfirmedReturnClock={handleConfirmedReturnClock}
                />
              </PulsatingButton>
            ) : (
              <SpecificsDefault
                drawerOpenTrue={drawerOpenTrue}
                message={message}
                connectedUser={connectedUser}
                round={round}
                increaseRound={increaseRound}
                decreaseRound={decreaseRound}
                changeOnPulse={changeOnPulse}
                changeConnectedUser={changeConnectedUser}
                toggleOnTransfer={toggleOnTransfer}
                handleConnectedClock={handleConnectedClock}
                handleConfirmingClock={handleConfirmingClock}
                handleReturningClock={handleReturningClock}
                handleConfirmedReturnClock={handleConfirmedReturnClock}
              />
            )}
          </div>
          <SpecificsRear
            message={message}
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
