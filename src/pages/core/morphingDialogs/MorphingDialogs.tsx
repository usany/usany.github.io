import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useConnectedUser,
  useDecreaseCardCallback,
  useIncreaseCardCallback,
  useOnPulseCallback,
  usePulse,
  useStopSupportingTradesCallback,
} from 'src/hooks/useBottomNavigation'
import { webSocket } from 'src/webSocket'
import { useSupportTradesCallback } from '../../../hooks/useBottomNavigation'
import CardsViews from '../card/CardsViews'
import Morphings from './Morphings'

interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}
const MorphingDialogs = ({
  message,
  userObj,
  round,
  increaseRound,
  decreaseRound,
  deleteMessage,
}: Props) => {
  const [onTransfer, setOnTransfer] = useState(false)
  const toggleOnTransfer = () => setOnTransfer(!onTransfer)
  const { connectedUser, changeConnectedUser } = useConnectedUser({
    message: message,
  })
  const { onPulse, changeOnPulse } = usePulse({
    message: message,
    round: round,
    userObj: userObj,
  })
  useOnPulseCallback({
    userObj: userObj,
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
    function sStopSupportingTradesCallback() {
      const user = {
        uid: '',
        displayName: '',
        url: '',
      }
      changeConnectedUser(user)
    }
    webSocket.on(
      `sStopSupportingTrades${message.id}`,
      sStopSupportingTradesCallback,
    )
    return () => {
      webSocket.off(
        `sStopSupportingTrades${message.id}`,
        sStopSupportingTradesCallback,
      )
    }
  })
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
          userObj={userObj}
          message={message}
          onPulse={onPulse}
          changeOnPulse={changeOnPulse}
          connectedUser={connectedUser}
          changeConnectedUser={changeConnectedUser}
          toggleOnTransfer={toggleOnTransfer}
          deleteMessage={deleteMessage}
        />
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
