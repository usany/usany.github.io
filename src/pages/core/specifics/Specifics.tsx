import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import { webSocket } from 'src/webSocket'
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
  userObj: User | null
  message: {}
}

function Specifics({
  round,
  increaseRound,
  decreaseRound,
  drawerOpenTrue,
  userObj,
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
  handleConfirmedReturnClock
}: Props) {
  const staticImg = staticArray[message.text.count] || staticArray['building']
  const [cardFlipped, setCardFlipped] = useState(false)
  const [cardTilt, setCardTilt] = useState(false)
  const [cardTilting, setCardTilting] = useState(null)
  const [onMove, setOnMove] = useState(false)
  // const [clocks, setClocks] = useState({
  //   connectedClock: { clock: '', cancelled: '' },
  //   confirmingClock: { clock: '', cancelled: '' },
  //   returningClock: { clock: '', cancelled: '' },
  //   confirmedReturnClock: { clock: '', cancelled: '' },
  // })
  // const [connectedClock, setConnectedClock] = useState({ clock: '', cancelled: false })
  // const [confirmingClock, setConfirmingClock] = useState('')
  // const [returningClock, setReturningClock] = useState('')
  // const [confirmedReturnClock, setConfirmedReturnClock] = useState('')
  // const languages = useSelectors((state) => state.languages.value)
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sConnectedClockCallback(res) {
  //     setConnectedClock({ ...connectedClock, clock: res.connectedClock })
  //   }
  //   webSocket.on(`sConnected${message.id}`, sConnectedClockCallback)
  //   return () => {
  //     webSocket.off(`sConnected${message.id}`, sConnectedClockCallback)
  //   }
  // }, [])
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sConfirmingClockCallback(res) {
  //     setConfirmingClock(res.confirmingClock)
  //   }
  //   webSocket.on(`sConfirming${message.id}`, sConfirmingClockCallback)
  //   return () => {
  //     webSocket.off(`sConfirming${message.id}`, sConfirmingClockCallback)
  //   }
  // }, [])
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sReturningClockCallback(res) {
  //     setReturningClock(res.returningClock)
  //   }
  //   webSocket.on(`sReturning${message.id}`, sReturningClockCallback)
  //   return () => {
  //     webSocket.off(`sReturning${message.id}`, sReturningClockCallback)
  //   }
  // }, [])
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sConfirmedReturnClockCallback(res) {
  //     setConfirmedReturnClock(res.returningClock)
  //   }
  //   webSocket.on(`sConfirmedReturn${message.id}`, sConfirmedReturnClockCallback)
  //   return () => {
  //     webSocket.off(`sConfirmedReturn${message.id}`, sConfirmedReturnClockCallback)
  //   }
  // }, [])
  const id = message?.id || ''
  const shadowColor = shadowColorArray[
    mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
  ]
  // const observer = new IntersectionObserver(handleIntersection);
  const flipCards = () => {
    setCardFlipped(!cardFlipped)
  }
  // const CardDisplay = () => {
  //   return (
  //     <Card
  //       className="colorTwo"
  //       sx={{
  //         maxWidth: `${window.screen.width * 0.9}px`,
  //         boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
  //       }}
  //     >
  //       <CardContent>
  //         <SpecificsActions
  //           drawerOpenTrue={drawerOpenTrue}
  //           userObj={userObj}
  //           message={message}
  //         />
  //         <div className="flex justify-center pt-1">
  //           <CardMedia
  //             sx={{
  //               width: 200 * 188 / 141 * 0.9,
  //               height: 188 * 0.9,
  //               borderRadius: '10px'
  //             }}
  //             image={staticImg}
  //           />
  //         </div>
  //         <SpecificsDimensions message={message} />
  //         <Divider />
  //         <SpecificsTrades
  //           drawerOpenTrue={drawerOpenTrue}
  //           userObj={userObj}
  //           message={message}
  //           round={round}
  //           connectedUser={connectedUser}
  //         />
  //         <Divider />
  //         <div>
  //           <SpecificsSteppers message={message} round={round} />
  //         </div>
  //         <Divider />
  //         <SpecificsButtons
  //           round={round}
  //           increaseRound={increaseRound}
  //           decreaseRound={decreaseRound}
  //           userObj={userObj}
  //           message={message}
  //           changeOnPulse={changeOnPulse}
  //           changeConnectedUser={changeConnectedUser}
  //           toggleOnTransfer={toggleOnTransfer}
  //           removeMessage={removeMessage}
  //           handleConnectedClock={handleConnectedClock}
  //           handleConfirmingClock={handleConfirmingClock}
  //           handleReturningClock={handleReturningClock}
  //           handleConfirmedReturnClock={handleConfirmedReturnClock}
  //         />
  //       </CardContent>
  //     </Card>
  //   )
  // }
  return (
    <div className='z-50 text-xs'
      onMouseDownCapture={() => {
        setOnMove(true)
        // setCardTilting(null)
        // setCardTilt(true)
      }}
      onTouchStartCapture={() => {
        setOnMove(true)
        // setCardTilting(null)
        // setCardTilt(true)
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
      <div className='flex justify-center' onClick={() => flipCards()}>flip card</div>
      <Tilt tiltEnable={cardTilt}
        tiltAngleXManual={cardTilting} tiltAngleYManual={cardTilting}
      >
        <div className={`cards ${cardFlipped && 'rotatingCards'} z-50`}>
          {onPulse ?
            <div className='sides'>
              <PulsatingButton pulseColor={shadowColor} className='cursor-default'>
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
                      userObj={userObj}
                      message={message}
                    />
                    <div className="flex justify-center pt-1">
                      <CardMedia
                        sx={{
                          width: 200 * 188 / 141 * 0.9,
                          height: 188 * 0.9,
                          borderRadius: '10px'
                        }}
                        image={staticImg}
                      />
                    </div>
                    <SpecificsDimensions message={message} />
                    <Divider />
                    <SpecificsTrades
                      drawerOpenTrue={drawerOpenTrue}
                      userObj={userObj}
                      message={message}
                      round={round}
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
                      userObj={userObj}
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
            :
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
                    userObj={userObj}
                    message={message}
                  />
                  <div className="flex justify-center pt-1">
                    <CardMedia
                      sx={{
                        width: 200 * 188 / 141 * 0.9,
                        height: 188 * 0.9,
                        borderRadius: '10px'
                      }}
                      image={staticImg}
                    />
                  </div>
                  <SpecificsDimensions message={message} />
                  <Divider />
                  <SpecificsTrades
                    drawerOpenTrue={drawerOpenTrue}
                    userObj={userObj}
                    message={message}
                    round={round}
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
                    userObj={userObj}
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
          }
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
    </div >
  )
}

export default Specifics
