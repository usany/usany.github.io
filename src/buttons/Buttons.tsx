import { useState } from "react"
import ConfirmButton from "./ConfirmButton"
import ConfirmReturnButton from "./ConfirmReturnButton"
import DeleteButton from "./DeleteButton"
import ReturningButton from "./ReturningButton"
import StopSupportButton from "./StopSupportButton"
import SupportButton from "./SupportButton"

// const webSocket = io("http://localhost:5000");
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
  changeOnPulse
}) {
  const [move, setMove] = useState(false)
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
            <DeleteButton message={messageObj} deleteMessage={deleteMessage} decreaseRound={decreaseRound} />
          )}
          {round === 2 && (
            <ConfirmButton
              message={messageObj}
              uid={uid}
              displayName={displayName}
              increaseRound={increaseRound}
            />
          )}
          {round === 3 && (
            <div className="flex justify-center">
              {
                messageObj.text.choose === 1 && (
                  <ReturningButton
                    message={messageObj}
                    uid={uid}
                    displayName={displayName}
                    increaseRound={increaseRound}
                  />
                )
                // <Button variant='outlined' onClick={() => {
                //   onReturning({ message: messageObj, uid: uid, displayName: displayName })
                // }}
                //   startIcon={<SendIcon />}>반납하기</Button>
              }
              {messageObj.text.choose === 2 && (
                <div>
                  {messageObj.connectedName} 님이 빌리는 중
                </div>
              )}
            </div>
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <div>
                  주인에게 확인 중
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
                />
              )}
            </div>
          )}
          {round === 5 && <div>완료된 카드입니다</div>}
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
            />
          )}
          {
            round === 2 && (
              <StopSupportButton
                userObj={userObj}
                message={messageObj}
                uid={uid}
                displayName={displayName}
                decreaseRound={decreaseRound}
              />
            )
            // <div className='flex flex-col justify-center'>
            //   <Button variant='contained'
            //     disabled
            //   >승낙 메시지 전송 완료</Button>
            //   <Button variant='outlined' onClick={() => {
            //     if (userObj) {
            //       onStopSupporting({ message: messageObj, uid: uid, displayName: displayName })
            //     }
            //   }}
            //     startIcon={<SendIcon />}>취소</Button>
            // </div>
          }
          {round === 3 && (
            <div className="flex justify-center">
              {messageObj.text.choose === 1 && (
                <div>
                  {messageObj.displayName} 님이 빌리는 중
                </div>
              )}
              {
                messageObj.text.choose === 2 && (
                  <ReturningButton
                    message={messageObj}
                    uid={uid}
                    displayName={displayName}
                    increaseRound={increaseRound}
                    changeOnPulse={changeOnPulse}
                  />
                )
                // <Button variant='outlined' onClick={() => {
                //   onReturning({ message: messageObj, uid: uid, displayName: displayName })
                // }}
                //   startIcon={<SendIcon />}>반납하기</Button>
              }
            </div>
          )}
          {round === 4 && (
            <div className="flex justify-center">
              {
                messageObj.text.choose === 1 && (
                  <ConfirmReturnButton
                    num={num}
                    points={points}
                    message={messageObj}
                    uid={uid}
                    displayName={displayName}
                    increaseRound={increaseRound}
                  />
                )
                // <Button variant='outlined' onClick={() => {
                //   onConfirmReturn({ num: num, points: points, message: messageObj, uid: uid, displayName: displayName, data: data, messagingToken: messagingToken })
                // }} endIcon={<SendIcon />}>반납 완료 확인</Button>
              }
              {messageObj.text.choose === 2 && (
                <div>
                  {messageObj.item} 주인에게 확인 중
                </div>
              )}
            </div>
          )}
          {round === 5 && <div>완료된 카드입니다</div>}
        </>
      )}
    </>
  )
}

export default Btn
