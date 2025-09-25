import Button from '@mui/material/Button'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import Btn from 'src/buttons/Buttons'
import { useSelectors, useTexts } from 'src/hooks'
import deleteMessage from '../card/deleteMessage'

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
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
}: Props) {
  const [num, setNum] = useState<number | null>(null)
  const [points, setPoints] = useState<number | null>(null)
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
      <Btn
        message={message}
        num={num}
        points={points}
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
  )
}

export default SpecificsButtons
