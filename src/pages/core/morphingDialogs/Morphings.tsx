import { MorphingDialogContent } from '@/components/ui/morphing-dialog'
import { User } from 'firebase/auth'
import { useState } from 'react'
import Specifics from 'src/pages/core/specifics/Specifics'

interface Props {
  message: { id: string; text: object }
  userObj: User | null
}

const Morphings = ({
  round,
  increaseRound,
  decreaseRound,
  message,
  userObj,
  onPulse,
  changeOnPulse,
  connectedUser,
  changeConnectedUser,
  toggleOnTransfer,
  deleteMessage,
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock
}: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerOpenTrue = () => {
    setDrawerOpen(true)
  }
  const drawerOpenFalse = () => {
    setDrawerOpen(false)
  }
  return (
    <MorphingDialogContent
      drawerOpen={drawerOpen}
      drawerOpenFalse={drawerOpenFalse}
    >
      <Specifics
        round={round}
        increaseRound={increaseRound}
        decreaseRound={decreaseRound}
        drawerOpenTrue={drawerOpenTrue}
        userObj={userObj}
        message={message}
        onPulse={onPulse}
        changeOnPulse={changeOnPulse}
        connectedUser={connectedUser}
        changeConnectedUser={changeConnectedUser}
        toggleOnTransfer={toggleOnTransfer}
        removeMessage={deleteMessage}
        connectedClock={connectedClock}
        confirmingClock={confirmingClock}
        returningClock={returningClock}
        confirmedReturnClock={confirmedReturnClock}
        handleConnectedClock={handleConnectedClock}
        handleConfirmingClock={handleConfirmingClock}
        handleReturningClock={handleReturningClock}
        handleConfirmedReturnClock={handleConfirmedReturnClock}
      />
    </MorphingDialogContent>
  )
}

export default Morphings
