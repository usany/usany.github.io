import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import staticImage from 'src/assets/umbrella512.png'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { useTexts } from 'src/hooks'
import Avatars from '../Avatars'
import getShadowColor from './getShadowColor'

interface Props {
  message: {}
  shadowColor: string
}

function SpecificsRear({
  message,
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock,
}: Props) {
  const { borrowing, lending } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const profileImageUrl = useSelectors((state) => state.profileImageUrl.value)
  const [sendedProfileImage, setSendedProfileImage] = useState(false)
  const [sendedDefaultProfile, setSendedDefaultProfile] = useState('')
  const [sendedProfileImageUrl, setSendedProfileImageUrl] = useState('')
  const id = message?.id || ''
  const shadowColor = getShadowColor(id)
  useEffect(() => {
    const messages = async () => {
      const docRef = doc(dbservice, `num/${message.id}`)
      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      setSendedProfileImage(userData.connectedProfileImage)
      setSendedDefaultProfile(userData.connectedDefaultProfile)
      setSendedProfileImageUrl(userData.connectedProfileImageUrl)
    }
    messages()
  }, [connectedClock, confirmingClock, returningClock, confirmedReturnClock])
  const passingValueCreator = {
    profileImage: message.creatorProfileImage,
    defaultProfile: message.creatorDefaultProfile,
    profileImageUrl: message.creatorProfileImageUrl,
  }
  const passingValueConnected = {
    profileImage: message.connectedProfileImage || sendedProfileImage,
    defaultProfile:
      message.connectedDefaultProfile ||
      sendedDefaultProfile ||
      profile.defaultProfile,
    profileImageUrl:
      message.connectedProfileImageUrl ||
      sendedProfileImageUrl ||
      profileImageUrl,
  }
  const connectedMoment = connectedClock.cancelled
    ? ''
    : message?.connectedClock
    ? message?.connectedClock
    : connectedClock.clock
  const confirmingMoment = message?.confirmingClock
    ? message.confirmingClock
    : confirmingClock
  const returningMoment = message?.returningClock
    ? message.returningClock
    : returningClock
  const confirmedReturnMoment = message?.confirmedReturnClock
    ? message.confirmedReturnClock
    : confirmedReturnClock
  const createdClock = new Date(message.createdClock)

  return (
    <div className="backSide">
      <Card
        className="colorTwo"
        sx={{
          height: `${
            document.getElementsByClassName('sides')[0]?.clientHeight
          }px`,
          maxWidth: `${window.screen.width * 0.9}px`,
          border: 1,
          borderWidth: '5px',
          borderColor: shadowColor,
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <div className="flex justify-center">
            <img
              className="absolute w-[50%] top-[25%] opacity-50"
              src={staticImage}
            />
          </div>
          <div className="flex justify-between">
            <div>{borrowing}</div>
            <div>{lending}</div>
          </div>
          <Divider />
          {message.text.choose === 1 ? (
            <>
              {createdClock && (
                <div className="flex justify-between">
                  <Avatars element={passingValueCreator} />
                  <div className="flex items-center">
                    {createdClock}에 생성
                  </div>
                </div>
              )}
              {connectedMoment && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {connectedMoment}에 지원
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              )}
              {confirmingMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueCreator} />
                  <div className="flex items-center">
                    {confirmingMoment}에 받음
                  </div>
                </div>
              )}
              {returningMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueCreator} />
                  <div className="flex items-center">
                    {returningMoment}에 반납 진행
                  </div>
                </div>
              )}
              {confirmedReturnMoment && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {confirmedReturnMoment}에 반납 확인
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              )}
            </>
          ) : (
            <>
              {message.createdClock && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {message.createdClock}에 생성
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              )}
              {connectedMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueConnected} />
                  <div className="flex items-center">
                    {connectedMoment}에 지원
                  </div>
                </div>
              )}
              {confirmingMoment && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {confirmingMoment}에 빌려줌
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              )}
              {returningMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueConnected} />
                  <div className="flex items-center">
                    {returningMoment}에 반납 진행
                  </div>
                </div>
              )}
              {confirmedReturnMoment && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {confirmedReturnMoment}에 반납 확인
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SpecificsRear
