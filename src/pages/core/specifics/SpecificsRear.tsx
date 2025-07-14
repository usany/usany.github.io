import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { useEffect } from 'react'
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
  connectedClock
}: Props) {
  // const [connectedClock, setConnectedClock] = useState('')
  // const [confirmingClock, setConfirmingClock] = useState('')
  // const [returningClock, setReturningClock] = useState('')
  // const [confirmedReturnClock, setConfirmedReturnClock] = useState('')
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
  useEffect(() => {

  }, [])
  console.log(connectedClock)
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
              {connectedClock &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {connectedClock}에 지원
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              }
              {message.confirmingClock &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueCreator} />
                  <div className='flex items-center'>
                    {message.confirmedClock}에 전달
                  </div>
                </div>
              }
              {message.returningClock &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {message.returningClock}에 반납 진행
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              }
              {message.confirmedReturnClock &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueCreator} />
                  <div className='flex items-center'>
                    {message.confirmedReturnClock}에 반납 확인
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
              {message.connectedClock &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueConnected} />
                  <div className='flex items-center'>
                    {message.connectedClock}에 지원
                  </div>
                </div>
              }
              {message.confirmingClock &&
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    {message.confirmedClock}에 전달
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              }
              {message.returningClock &&
                <div className='flex justify-between'>
                  <Avatars element={passingValueConnected} />
                  <div className='flex items-center'>
                    {message.returningClock}에 반납 진행
                  </div>
                </div>
              }
              {message.confirmedReturnClock &&
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
