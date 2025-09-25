import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { webSocket } from 'src/webSocket'
import CardsViews from '../card/CardsViews'
import Morphings from './Morphings'
import { useConnectedUser } from './useConnectedUser'
import { useDecreaseCardCallback } from './useDecreaseCardCallback'
import { useIncreaseCardCallback } from './useIncreaseCardCallback'
import { useOnPulseCallback } from './useOnPulseCallback'
import { usePulse } from './usePulse'
import { useStopSupportingTradesCallback } from './useStopSupportingTradesCallback'
import { useSupportTradesCallback } from './useSupportTradesCallback'
import { useRound } from '../card/useRound'

interface Props {
  message: { id: string; text: object }
}
const MorphingDialogs = ({
  message,
}: Props) => {
  const [onTransfer, setOnTransfer] = useState(false)
  const [connectedClock, setConnectedClock] = useState({
    clock: '',
    cancelled: false,
  })
  const [confirmingClock, setConfirmingClock] = useState('')
  const [returningClock, setReturningClock] = useState('')
  const [confirmedReturnClock, setConfirmedReturnClock] = useState('')
  const { round, increaseRound, decreaseRound } = useRound(message)

  const handleConnectedClock = (newValue) => {
    setConnectedClock(newValue)
  }
  const handleConfirmingClock = (newValue) => {
    setConfirmingClock(newValue)
  }
  const handleReturningClock = (newValue) => {
    setReturningClock(newValue)
  }
  const handleConfirmedReturnClock = (newValue) => {
    setConfirmedReturnClock(newValue)
  }
  const toggleOnTransfer = () => setOnTransfer(!onTransfer)
  const { connectedUser, changeConnectedUser } = useConnectedUser({
    message: message,
  })
  const { onPulse, changeOnPulse } = usePulse({
    message: message,
    round: round,
  })
  useOnPulseCallback({
    round: round,
    changeOnPulse: changeOnPulse,
    message: message,
  })
  useIncreaseCardCallback({ increaseRound, message })
  useDecreaseCardCallback({ decreaseRound, message })
  useSupportTradesCallback({ changeConnectedUser, message })
  useStopSupportingTradesCallback({ changeConnectedUser, message })
  useEffect(() => {
    if (!webSocket) return
    function sConnectedClockCallback(res) {
      setConnectedClock({ ...connectedClock, clock: res.connectedClock })
    }
    webSocket.on(`sConnected${message.id}`, sConnectedClockCallback)
    return () => {
      webSocket.off(`sConnected${message.id}`, sConnectedClockCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sConfirmingClockCallback(res) {
      setConfirmingClock(res.confirmingClock)
    }
    webSocket.on(`sConfirming${message.id}`, sConfirmingClockCallback)
    return () => {
      webSocket.off(`sConfirming${message.id}`, sConfirmingClockCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sReturningClockCallback(res) {
      setReturningClock(res.returningClock)
    }
    webSocket.on(`sReturning${message.id}`, sReturningClockCallback)
    return () => {
      webSocket.off(`sReturning${message.id}`, sReturningClockCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sConfirmedReturnClockCallback(res) {
      setConfirmedReturnClock(res.confirmedReturnClock)
    }
    webSocket.on(`sConfirmedReturn${message.id}`, sConfirmedReturnClockCallback)
    return () => {
      webSocket.off(
        `sConfirmedReturn${message.id}`,
        sConfirmedReturnClockCallback,
      )
    }
  }, [])
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <MorphingDialogTrigger>
        <Link
          key={message.id}
          // Moving to the product page
          to={`${location.pathname}?id=${message.id}`}
        >
          <CardsViews
            message={message}
            onPulse={onPulse}
            onTransfer={onTransfer}
          />
        </Link>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <Morphings
          round={round}
          increaseRound={increaseRound}
          decreaseRound={decreaseRound}
          message={message}
          onPulse={onPulse}
          changeOnPulse={changeOnPulse}
          connectedUser={connectedUser}
          changeConnectedUser={changeConnectedUser}
          toggleOnTransfer={toggleOnTransfer}
          connectedClock={connectedClock}
          confirmingClock={confirmingClock}
          returningClock={returningClock}
          confirmedReturnClock={confirmedReturnClock}
          handleConnectedClock={handleConnectedClock}
          handleConfirmingClock={handleConfirmingClock}
          handleReturningClock={handleReturningClock}
          handleConfirmedReturnClock={handleConfirmedReturnClock}
        />
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
