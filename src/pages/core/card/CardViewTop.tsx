import { Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useSelectors } from 'src/hooks/useSelectors'
import Avatars from '../Avatars'
import CardViewTop from './CardView'

const CardViewTop = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  const profileColor = useSelector((state) => state.profileColor.value)
  const profileUrl = message?.creatorUrl
  const item = message.item
  let action
  if (languages === 'ko') {
    if (message.text.choose === 1) {
      action = ' 빌리기'
    } else {
      action = ' 빌려주기'
    }
  } else {
    if (message.text.choose === 1) {
      action = ' borrowing'
    } else {
      action = ' lending'
    }
  }
  const passingValue = {
    profileImage: message.creatorProfileImage,
    defaultProfile: message.creatorDefaultProfile,
    profileImageUrl: message.creatorProfileImageUrl,
  }

  return (
    <div className="flex justify-between gap-1">
      <Avatars
        element={passingValue}
        uid={message.creatorId}
        profile={false}
        profileColor={profileColor}
        profileUrl={profileUrl}
        piazza={null}
      />
      <div className="flex items-center">
        <Chip
          label={
            <div className="text-xs">
              {item} {action}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CardViewTop
