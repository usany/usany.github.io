import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import staticImage from 'src/assets/umbrella512.png'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/buttons/Buttons'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import { useSelectors } from 'src/hooks/useSelectors'
import Avatars from '../Avatars'
import { staticArray } from '../card/CardView'
import SpecificsActions from './SpecificsActions'
import SpecificsDimensions from './SpecificsDimensions'
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
}: Props) {
  const staticImg = staticArray[message.text.count] || staticArray['building']
  const [num, setNum] = useState<number | null>(null)
  const [points, setPoints] = useState<number | null>(null)
  const [deleted, setDeleted] = useState<boolean>(false)
  const [cardFlipped, setCardFlipped] = useState(false)
  const [cardTilt, setCardTilt] = useState(false)
  const [cardTilting, setCardTilting] = useState(null)
  const [onMove, setOnMove] = useState(false)
  const languages = useSelectors((state) => state.languages.value)
  const passingValueCreator = {
    profileImage: message.creatorProfileImage,
    defaultProfile: message.creatorDefaultProfile,
    profileImageUrl: message.creatorProfileImageUrl
  }
  const passingValueConnected = {
    profileImage: message.connectedProfileImage,
    defaultProfile: message.connectedDefaultProfile,
    profileImageUrl: message.connectedProfileImageUrl
  }
  const deleteMessage = () => {
    setDeleted(true)
    removeMessage(message)
  }
  useEffect(() => {
    const creatorPoints = async () => {
      const docRef = doc(dbservice, `members/${message.creatorId}`)
      const docSnap = await getDoc(docRef)
      const points = docSnap.data()?.points
      setNum(points)
    }
    creatorPoints()
  }, [])
  useEffect(() => {
    const connectedPoints = async () => {
      const docRef = doc(dbservice, `members/${message?.connectedId}`)
      const docSnap = await getDoc(docRef)
      const points = docSnap.data()?.points
      setPoints(points)
    }
    if (message.connectedId !== null) {
      connectedPoints()
    }
  })
  const id = message?.id || ''
  const shadowColor =
    shadowColorArray[
    mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
    ]
  // const observer = new IntersectionObserver(handleIntersection);
  const flipCards = () => {
    setCardFlipped(!cardFlipped)
  }
  console.log(window.screen.width * 0.9)
  console.log(message)
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
            <div className={`truncate p-1 sides`}>
              <PulsatingButton pulseColor={shadowColor}>
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
                    <div className="flex justify-center pt-5">
                      {!deleted ? (
                        <div className="flex justify-center">
                          <Btn
                            messageObj={message}
                            isOwner={message.creatorId === userObj.uid}
                            uid={userObj.uid}
                            displayName={userObj.displayName}
                            userObj={userObj}
                            num={num}
                            points={points}
                            deleteMessage={deleteMessage}
                            round={round}
                            increaseRound={increaseRound}
                            decreaseRound={decreaseRound}
                            changeOnPulse={changeOnPulse}
                            changeConnectedUser={changeConnectedUser}
                            toggleOnTransfer={toggleOnTransfer}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <Button variant="outlined" disabled>
                            {languages === 'ko' ? '지워졌습니다' : 'Deleted'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </PulsatingButton>
            </div>
            :
            <div className={`truncate p-1 sides`}>
              <Card
                className="colorTwo"
                sx={{
                  // position: 'absolute',
                  // width: '100%',
                  // height: '100%',
                  maxWidth: `${window.screen.width * 0.9}px`,
                  boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
                }}
              >
                <CardContent
                  sx={{
                    // position: 'absolute',
                    // width: '100%',
                    // height: '100%',
                  }}
                >
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
                  <div className="flex justify-center pt-5">
                    {!deleted ? (
                      <div className="flex justify-center">
                        <Btn
                          messageObj={message}
                          isOwner={message.creatorId === userObj.uid}
                          uid={userObj.uid}
                          displayName={userObj.displayName}
                          userObj={userObj}
                          num={num}
                          points={points}
                          deleteMessage={deleteMessage}
                          round={round}
                          increaseRound={increaseRound}
                          decreaseRound={decreaseRound}
                          changeOnPulse={changeOnPulse}
                          changeConnectedUser={changeConnectedUser}
                          toggleOnTransfer={toggleOnTransfer}
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Button variant="outlined" disabled>
                          {languages === 'ko' ? '지워졌습니다' : 'Deleted'}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          }
          <div className='backSide'>
            <Card
              className="colorTwo"
              sx={{
                height: `${document.getElementsByClassName('sides')[0]?.clientHeight}px`,
                maxWidth: `${window.screen.width * 0.9}px`,
                border: 1,
                borderWidth: '5px',
                borderColor: shadowColor,
                borderRadius: '10px'
              }}
            >
              <CardContent
              >
                <div className='flex justify-center'>
                  <img className='absolute w-[50%] top-[25%] opacity-50' src={staticImage} />
                </div>
                <div className='flex justify-between'>
                  <div>Borrowing</div>
                  <div>Lending</div>
                </div>
                <Divider />
                {message.text.count === 1 ?
                  <>
                    {message.createdClock &&
                      <div className='flex justify-between'>
                        <Avatars element={passingValueCreator} />
                        <div className='flex items-center'>
                          {message.createdClock}에 생성
                        </div>
                      </div>
                    }
                    {message.connectedClock &&
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          {message.connectedClock}에 지원
                        </div>
                        <Avatars element={passingValueConnected} />
                      </div>
                    }
                    {message.confirmedClock &&
                      <div className='flex justify-between'>
                        <Avatars element={passingValueCreator} />
                        <div className='flex items-center'>
                          {message.confirmedClock}에 전달
                        </div>
                      </div>
                    }
                    {message.returningClock &&
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          {message.returningClock}에 반납 진행
                        </div>
                        <Avatars element={passingValueConnected} />
                      </div>
                    }
                    {message.confirmedReturnClock &&
                      <div className='flex justify-between'>
                        <Avatars element={passingValueCreator} />
                        <div className='flex items-center'>
                          {message.confirmedReturnClock}에 반납 확인
                        </div>
                      </div>
                    }
                  </>
                  :
                  <>
                    {message.createdClock &&
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          {message.createdClock}에 생성
                        </div>
                        <Avatars element={passingValueConnected} />
                      </div>
                    }
                    {message.connectedClock &&
                      <div className='flex justify-between'>
                        <Avatars element={passingValueCreator} />
                        <div className='flex items-center'>
                          {message.connectedClock}에 지원
                        </div>
                      </div>
                    }
                    {message.confirmedClock &&
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          {message.confirmedClock}에 전달
                        </div>
                        <Avatars element={passingValueConnected} />
                      </div>
                    }
                    {message.returningClock &&
                      <div className='flex justify-between'>
                        <Avatars element={passingValueCreator} />
                        <div className='flex items-center'>
                          {message.returningClock}에 반납 진행
                        </div>
                      </div>
                    }
                    {message.confirmedReturnClock &&
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          {message.confirmedReturnClock}에 반납 확인
                        </div>
                        <Avatars element={passingValueConnected} />
                      </div>
                    }
                  </>
                }
                <div className="flex justify-center pt-5">
                  {!deleted ? (
                    <div className="flex justify-center">
                      <Btn
                        messageObj={message}
                        isOwner={message.creatorId === userObj.uid}
                        uid={userObj.uid}
                        displayName={userObj.displayName}
                        userObj={userObj}
                        num={num}
                        points={points}
                        deleteMessage={deleteMessage}
                        round={round}
                        increaseRound={increaseRound}
                        decreaseRound={decreaseRound}
                        changeOnPulse={changeOnPulse}
                        changeConnectedUser={changeConnectedUser}
                        toggleOnTransfer={toggleOnTransfer}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button variant="outlined" disabled>
                        {languages === 'ko' ? '지워졌습니다' : 'Deleted'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tilt>
      {/* <div id='cardId' className={`truncate p-1 ${cardFlipped ? 'flippedCards' : 'nonFlippedCards'}`} onClick={() => flipCards()}>
        <Card
          className="colorTwo"
          sx={{
            boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
          }}
        >
          {cardBack &&
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
              <div className="flex justify-center pt-5">
                {!deleted ? (
                  <div className="flex justify-center">
                    <Btn
                      messageObj={message}
                      isOwner={message.creatorId === userObj.uid}
                      uid={userObj.uid}
                      displayName={userObj.displayName}
                      userObj={userObj}
                      num={num}
                      points={points}
                      deleteMessage={deleteMessage}
                      round={round}
                      increaseRound={increaseRound}
                      decreaseRound={decreaseRound}
                      changeOnPulse={changeOnPulse}
                      changeConnectedUser={changeConnectedUser}
                      toggleOnTransfer={toggleOnTransfer}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button variant="outlined" disabled>
                      {languages === 'ko' ? '지워졌습니다' : 'Deleted'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          }
          {!cardBack &&
            <CardContent>
              <div>practices</div>
            </CardContent>
          }
        </Card>
      </div> */}
    </div >
  )
}

export default Specifics
