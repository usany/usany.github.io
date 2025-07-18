import Button from '@mui/material/Button'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/buttons/Buttons'
import { useSelectors } from 'src/hooks/useSelectors'
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

function SpecificsButtons({
  round,
  increaseRound,
  decreaseRound,
  userObj,
  message,
  changeOnPulse,
  changeConnectedUser,
  toggleOnTransfer,
  removeMessage,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock
}: Props) {
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
  return (
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
            handleConnectedClock={handleConnectedClock}
            handleConfirmingClock={handleConfirmingClock}
            handleReturningClock={handleReturningClock}
            handleConfirmedReturnClock={handleConfirmedReturnClock}
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
  )
}

export default SpecificsButtons
