import { useSelectors, useTexts } from 'src/hooks'
import ConfirmButton from 'src/pages/core/specifics/buttons/ConfirmButton'
import ConfirmReturnButton from 'src/pages/core/specifics/buttons/ConfirmReturnButton'
import DeleteButton from 'src/pages/core/specifics/buttons/DeleteButton'
import ReturningButton from 'src/pages/core/specifics/buttons/ReturningButton'
import StopSupportButton from 'src/pages/core/specifics/buttons/StopSupportButton'
import SupportButton from 'src/pages/core/specifics/buttons/SupportButton'
// import Btn from 'src/buttons/Buttons'

interface Props {
  message: {}
}

function SpecificsButtons({
  // round,
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
  const profile = useSelectors((state) => state.profile.value)
  const {isBorrowing, askingTheOwnerToConfirm, sharingCompleted} = useTexts()
  const isOwner = message.creatorId === profile?.uid
  if (message.round === 1) {
    if (isOwner) {
      return (
        <DeleteButton
          message={message}
          decreaseRound={decreaseRound}
        />
      )
    }
    return (
      <SupportButton
        message={message}
        increaseRound={increaseRound}
        changeConnectedUser={changeConnectedUser}
        toggleOnTransfer={toggleOnTransfer}
        handleConnectedClock={handleConnectedClock}
      />
    )
  } else if (message.round === 2) {
    if (isOwner) {
      return (
        <ConfirmButton
          message={message}
          increaseRound={increaseRound}
          handleConfirmingClock={handleConfirmingClock}
        />
      )
    }
    return (
      <StopSupportButton
        message={message}
        decreaseRound={decreaseRound}
        changeConnectedUser={changeConnectedUser}
        toggleOnTransfer={toggleOnTransfer}
        handleConnectedClock={handleConnectedClock}
      />
    )
  } else if (message.round === 3) {
    if (isOwner) {
      return (
        <div className="flex justify-center">
          {message.text.choose === 1 && (
            <ReturningButton
              message={message}
              increaseRound={increaseRound}
              handleReturningClock={handleReturningClock}
            />
          )}
          {message.text.choose === 2 && (
            <>{message.connectedName} {isBorrowing}</>
          )}
        </div>
      )
    }
    return (
      <div className="flex justify-center">
        {message.text.choose === 1 && (
          <>{message.displayName} {isBorrowing}</>
        )}
        {message.text.choose === 2 && (
          <ReturningButton
            message={message}
            increaseRound={increaseRound}
            handleReturningClock={handleReturningClock}
          />
        )}
      </div>
    )
  } else if (message.round === 4) {
    if (isOwner) {
      return (
        <div className="flex justify-center">
          {message.text.choose === 1 && (
            <div>
              {askingTheOwnerToConfirm}
            </div>
          )}
          {message.text.choose === 2 && (
            <ConfirmReturnButton
              message={message}
              increaseRound={increaseRound}
              handleConfirmedReturnClock={handleConfirmedReturnClock}
            />
          )}
        </div>
      )
    }
    return (
      <div className="flex justify-center">
        {message.text.choose === 1 && (
          <ConfirmReturnButton
            message={message}
            increaseRound={increaseRound}
            handleConfirmedReturnClock={handleConfirmedReturnClock}
          />
        )}
        {message.text.choose === 2 && (
          <div>
            {message.item}{' '}
            {askingTheOwnerToConfirm}
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      {sharingCompleted}
    </div>
  )
}

export default SpecificsButtons
