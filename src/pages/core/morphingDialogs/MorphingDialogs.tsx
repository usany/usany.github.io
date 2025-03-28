import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { webSocket } from 'src/webSocket'
import CardsViews from '../../main/card/CardsViews'
import Morphings from './Morphings'

interface Props {
  message: { id: string; text: object }
  isOwner: boolean
  userObj: User | null
  num: number | null
  points: number | null
}

const MorphingDialogs = ({ message, isOwner, userObj, num, points, round, increaseRound, decreaseRound }: Props) => {
  // const [drawerOpen, setDrawerOpen] = useState(false)
  // const drawerOpenTrue = () => {
  //   setDrawerOpen(true)
  // }
  // const drawerOpenFalse = () => {
  //   setDrawerOpen(false)
  // }
  const [onPulse, setOnPulse] = useState(false)
  const changeOnPulse = (newValue) => setOnPulse(newValue)

  useEffect(() => {
    if (message.text.choose === 1) {
      if (message.creatorId === userObj?.uid) {
        if (round === 2 || round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === userObj?.uid) {
        if (round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    } else {
      if (message.creatorId === userObj.uid) {
        if (round === 2 || round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === userObj.uid) {
        if (round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    }
  }, [round])
  useEffect(() => {
    if (!webSocket) return
    function sOnPulseCallback(res) {
      if (res.choose === 1) {
        if (res.creatorId === userObj.uid) {
          if (round === 1 || round === 2) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === userObj.uid) {
          if (round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      } else {
        if (res.creatorId === userObj.uid) {
          if (round === 2 || round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === userObj.uid) {
          if (round === 3) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      }
    }
    webSocket.on(`sOnPulse${message.id}`, sOnPulseCallback)
    return () => {
      webSocket.off(`sOnPulse${message.id}`, sOnPulseCallback)
    }
  })
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sOnPulseFalseCallback(res) {
  //     changeOnPulse(false)
  //   }
  //   webSocket.on(`sOnPulseFalse${message.id}`, sOnPulseFalseCallback)
  //   return () => {
  //     webSocket.off(`sOnPulseFalse${message.id}`, sOnPulseFalseCallback)
  //   }
  // })
  useEffect(() => {
    if (!webSocket) return
    function sIncreaseCardCallback() {
      increaseRound()
    }
    webSocket.on(`sIncrease${message.id}`, sIncreaseCardCallback)
    return () => {
      webSocket.off(`sIncrease${message.id}`, sIncreaseCardCallback)
    }
  })
  useEffect(() => {
    if (!webSocket) return
    function sDecreaseCardCallback() {
      decreaseRound()
    }
    webSocket.on(`sDecrease${message.id}`, sDecreaseCardCallback)
    return () => {
      webSocket.off(`sDecrease${message.id}`, sDecreaseCardCallback)
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
        <CardsViews
          message={message}
          isOwner={isOwner}
          userObj={userObj}
          num={num}
          points={points}
          onPulse={onPulse}
        />
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
        />
        {/* <MorphingDialogContent drawerOpen={drawerOpen} drawerOpenFalse={drawerOpenFalse}>
          <Specifics drawerOpenTrue={drawerOpenTrue} userObj={userObj} message={message} />
        </MorphingDialogContent> */}
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
