import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/buttons/Buttons'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import { useSelectors } from 'src/hooks/useSelectors'
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
  const languages = useSelectors((state) => state.languages.value)
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
  // const observer =
  // const observer = new IntersectionObserver(handleIntersection);
  const flipCards = () => {
    setCardFlipped(!cardFlipped)
  }
  // const cardId = document.getElementById('cardId')
  // cardId?.addEventListener('transitionend', () => {
  //   setCardBack(!cardBack)
  // })
  return (
    <div className='z-50'>
      <div onClick={() => flipCards()}>flip card</div>
      <Tilt>
        <div className={`cards ${cardFlipped && 'rotatingCards'} z-50`}>
          <PulsatingButton>

            <div className={`truncate p-1 sides`}>
              <Card
                className="colorTwo"
                sx={{
                  // position: 'absolute',
                  // width: '100%',
                  // height: '100%',
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
          </PulsatingButton>
          <div className='backSide'>
            practices
          </div>
        </div>
      </Tilt >
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
