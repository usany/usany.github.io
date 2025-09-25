import { useState } from 'react'
import { useSelectors } from 'src/hooks'
import ConfirmButton from './ConfirmButton'
import ConfirmReturnButton from './ConfirmReturnButton'
import DeleteButton from './DeleteButton'
import ReturningButton from './ReturningButton'
import StopSupportButton from './StopSupportButton'
import SupportButton from './SupportButton'

function Btn({
  message,
  num,
  points,
  round,
  increaseRound,
  decreaseRound,
  changeConnectedUser,
  toggleOnTransfer,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
}) {
  const [move, setMove] = useState(false)
  const languages = useSelectors((state) => state.languages.value)
  const handleClose = () => {
    setMove(false)
  }
  const handleDialog = () => {
    setMove(true)
  }
  const profile = useSelectors((state) => state.profile.value)

  const isOwner = message.creatorId === profile?.uid
  if (isOwner) {
    if (round === 1) {
      return (
        <DeleteButton
          message={message}
          decreaseRound={decreaseRound}
        />
      )
    } else if (round === 2) {
      return (
        <ConfirmButton
          message={message}
          increaseRound={increaseRound}
          handleConfirmingClock={handleConfirmingClock}
        />
      )
    } else if (round === 3) {
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
    } else if (round === 4) {
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
              num={num}
              points={points}
              message={message}
              increaseRound={increaseRound}
              handleConfirmedReturnClock={handleConfirmedReturnClock}
            />
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
  return (
    <>
      {isOwner ? (
        <>
          {round === 1 && (
            <DeleteButton
              message={message}
              decreaseRound={decreaseRound}
            />
          )}
          {round === 2 && (
            <ConfirmButton
              message={message}
              increaseRound={increaseRound}
              handleConfirmingClock={handleConfirmingClock}
            />
          )}
          {round === 3 && (
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
          )}
          {round === 4 && (
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
                  num={num}
                  points={points}
                  message={message}
                  increaseRound={increaseRound}
                  handleConfirmedReturnClock={handleConfirmedReturnClock}
                />
              )}
            </div>
          )}
          {round === 5 && (
            <div>
              {languages === 'ko' ? '완료된 카드입니다' : 'Sharing completed'}
            </div>
          )}
        </>
      ) : (
        <>
          {round === 1 && (
            <SupportButton
              move={move}
              handleClose={handleClose}
              handleDialog={handleDialog}
              message={message}
              increaseRound={increaseRound}
              changeConnectedUser={changeConnectedUser}
              toggleOnTransfer={toggleOnTransfer}
              handleConnectedClock={handleConnectedClock}
            />
          )}
          {round === 2 && (
            <StopSupportButton
              message={message}
              decreaseRound={decreaseRound}
              changeConnectedUser={changeConnectedUser}
              toggleOnTransfer={toggleOnTransfer}
              handleConnectedClock={handleConnectedClock}
            />
          )}
          {round === 3 && (
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
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {message.text.choose === 1 && (
                <ConfirmReturnButton
                  num={num}
                  points={points}
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
          )}
          {round === 5 && (
            <div>
              {languages === 'ko' ? '완료된 카드입니다' : 'Sharing completed'}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Btn
