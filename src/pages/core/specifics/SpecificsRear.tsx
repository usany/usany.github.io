import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import staticImage from 'src/assets/umbrella512.png'
import useTexts from 'src/useTexts'
import Avatars from '../Avatars'

interface Props {
  message: {}
  shadowColor: string
}

function SpecificsRear({
  message,
  shadowColor,
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock
}: Props) {
  const borrowingText = useTexts('borrowing')
  const lendingText = useTexts('lending')
  const passingValueCreator = {
    profileImage: message.creatorProfileImage,
    defaultProfile: message.creatorDefaultProfile,
    profileImageUrl: message.creatorProfileImageUrl
  }
  const passingValueConnected = {
    profileImage: message.connectedProfileImage,
    defaultProfile: message.connectedDefaultProfile,
    profileImageUrl: message.connectedProfileImageUrl
  }
  const connectedMoment = connectedClock.cancelled ? '' : message?.connectedClock ? message?.connectedClock : connectedClock.clock
  const confirmingMoment = message.confirmingClock ? message.confirmingClock : confirmingClock
  const returningMoment = message.returningClock ? message.returningClock : returningClock
  const confirmedReturnMoment = message.confirmedReturnClock ? message.confirmedReturnClock : confirmedReturnClock
  return (
    <div className='backSide'>
      <Card
        className="colorTwo"
        sx={{
          height: `${document.getElementsByClassName('sides')[0]?.clientHeight}px`,
          maxWidth: `${window.screen.width * 0.9}px`,
          border: 1,
          borderWidth: '5px',
          borderColor: shadowColor,
          borderRadius: '10px'
        }}
      >
        <CardContent>
          <div className='flex justify-center'>
            <img className='absolute w-[50%] top-[25%] opacity-50' src={staticImage} />
          </div>
          <div className='flex justify-between'>
            <div>{borrowingText}</div>
            <div>{lendingText}</div>
          </div>
          <Divider />
          {message.text.choose === 1 ?
            <>
              {message.createdClock &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueCreator} />
                  <div className='flex items-center'>
                    {message.createdClock}에 생성
                  </div>
                </div>
              }
              {connectedMoment &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {connectedMoment}에 지원
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              }
              {confirmingMoment &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueCreator} />
                  <div className='flex items-center'>
                    {confirmingMoment}에 전달
                  </div>
                </div>
              }
              {returningMoment &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {returningMoment}에 반납 진행
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              }
              {confirmedReturnMoment &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueCreator} />
                  <div className='flex items-center'>
                    {confirmedReturnMoment}에 반납 확인
                  </div>
                </div>
              }
            </>
            :
            <>
              {message.createdClock &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {message.createdClock}에 생성
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              }
              {connectedMoment &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueConnected} />
                  <div className='flex items-center'>
                    {connectedMoment}에 지원
                  </div>
                </div>
              }
              {confirmingMoment &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {confirmingMoment}에 전달
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              }
              {returningMoment &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueConnected} />
                  <div className='flex items-center'>
                    {returningMoment}에 반납 진행
                  </div>
                </div>
              }
              {confirmedReturnMoment &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {message.confirmedReturnClock}에 반납 확인
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              }
            </>
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default SpecificsRear
