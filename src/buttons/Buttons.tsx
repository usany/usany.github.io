import { useState } from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import ConfirmButton from './ConfirmButton'
import ConfirmReturnButton from './ConfirmReturnButton'
import DeleteButton from './DeleteButton'
import ReturningButton from './ReturningButton'
import StopSupportButton from './StopSupportButton'
import SupportButton from './SupportButton'

function Btn({
  messageObj,
  isOwner,
  uid,
  displayName,
  userObj,
  num,
  points,
  deleteMessage,
  round,
  increaseRound,
  decreaseRound,
  changeOnPulse,
  changeConnectedUser,
  toggleOnTransfer,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock
}) {
  const [move, setMove] = useState(false)
  const languages = useSelectors((state) => state.languages.value)
  const handleClose = () => {
    setMove(false)
  }
  const handleDialog = () => {
    setMove(true)
  }
  return (
    <>
      {isOwner ? (
        <>
          {round === 1 && (
            <DeleteButton
              message={messageObj}
              deleteMessage={deleteMessage}
              decreaseRound={decreaseRound}
            />
          )}
          {round === 2 && (
            <ConfirmButton
              message={messageObj}
              uid={uid}
              displayName={displayName}
              increaseRound={increaseRound}
              handleConfirmingClock={handleConfirmingClock}
            />
          )}
          {round === 3 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <ReturningButton
                  message={messageObj}
                  uid={uid}
                  displayName={displayName}
                  increaseRound={increaseRound}
                  handleReturningClock={handleReturningClock}
                />
              )}
              {messageObj.text.choose === 2 && (
                <div>{messageObj.connectedName} 님이 빌리는 중</div>
              )}
            </div>
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <div>
                  {languages === 'ko'
                    ? '주인에게 확인 중'
                    : 'Asking the owner to confirm'}
                </div>
              )}
              {messageObj.text.choose === 2 && (
                <ConfirmReturnButton
                  num={num}
                  points={points}
                  message={messageObj}
                  uid={uid}
                  displayName={displayName}
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
              userObj={userObj}
              move={move}
              handleClose={handleClose}
              handleDialog={handleDialog}
              message={messageObj}
              uid={uid}
              displayName={displayName}
              increaseRound={increaseRound}
              changeConnectedUser={changeConnectedUser}
              toggleOnTransfer={toggleOnTransfer}
              handleConnectedClock={handleConnectedClock}
            />
          )}
          {round === 2 && (
            <StopSupportButton
              userObj={userObj}
              message={messageObj}
              uid={uid}
              displayName={displayName}
              decreaseRound={decreaseRound}
              changeConnectedUser={changeConnectedUser}
              toggleOnTransfer={toggleOnTransfer}
              handleConnectedClock={handleConnectedClock}
            />
          )}
          {round === 3 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <div>
                  {messageObj.displayName}{' '}
                  {languages === 'ko' ? '님이 빌리는 중' : 'is borrowing'}
                </div>
              )}
              {messageObj.text.choose === 2 && (
                <ReturningButton
                  message={messageObj}
                  uid={uid}
                  displayName={displayName}
                  increaseRound={increaseRound}
                  changeOnPulse={changeOnPulse}
                  handleReturningClock={handleReturningClock}
                />
              )}
            </div>
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <ConfirmReturnButton
                  num={num}
                  points={points}
                  message={messageObj}
                  uid={uid}
                  displayName={displayName}
                  increaseRound={increaseRound}
                  handleConfirmedReturnClock={handleConfirmedReturnClock}
                />
              )}
              {messageObj.text.choose === 2 && (
                <div>
                  {messageObj.item}{' '}
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
