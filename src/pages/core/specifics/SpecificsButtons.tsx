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
  return (
    <div className="flex justify-center pt-5">
      <Btn
        message={message}
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
