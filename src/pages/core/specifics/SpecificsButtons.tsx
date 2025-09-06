import Button from '@mui/material/Button'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/buttons/Buttons'
import { useSelectors } from 'src/hooks'

interface Props {
  message: {}
}

function SpecificsButtons({
  round,
  increaseRound,
  decreaseRound,
  message,
  changeConnectedUser,
  toggleOnTransfer,
  removeMessage,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
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
            message={message}
            num={num}
            points={points}
            deleteMessage={deleteMessage}
            round={round}
            increaseRound={increaseRound}
            decreaseRound={decreaseRound}
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
