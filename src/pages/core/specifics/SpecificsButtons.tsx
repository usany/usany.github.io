import { useSelectors } from 'src/hooks'
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
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  const isOwner = message.creatorId === profile?.uid
  if (round === 1) {
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
  } else if (round === 2) {
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
  } else if (round === 3) {
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
            <div>{message.connectedName} 님이 빌리는 중</div>
          )}
        </div>
      )
    }
    return (
      <div className="flex justify-center">
        {message.text.choose === 1 && (
          <div>
            {message.displayName}{' '}
            {languages === 'ko' ? '님이 빌리는 중' : 'is borrowing'}
          </div>
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
  } else if (round === 4) {
    if (isOwner) {
      return (
        <div className="flex justify-center">
          {message.text.choose === 1 && (
            <div>
              {languages === 'ko'
                ? '주인에게 확인 중'
                : 'Asking the owner to confirm'}
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
            {languages === 'ko'
              ? '주인에게 확인 중'
              : 'Asking the owner to confirm'}
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      {languages === 'ko' ? '완료된 카드입니다' : 'Sharing completed'}
    </div>
  )
}

export default SpecificsButtons
