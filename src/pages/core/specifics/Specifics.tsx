import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/buttons/Buttons'
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

  return (
    <div className="truncate p-1">
      <Card
        className="colorTwo"
        sx={{
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
                width: 212 * 0.9,
                height: 188 * 0.9,
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
  )
}

export default Specifics
