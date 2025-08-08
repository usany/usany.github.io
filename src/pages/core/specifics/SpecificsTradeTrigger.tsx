// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import Avatars from 'src/pages/core/Avatars'

const SpecificsTradesTrigger = ({
  onClick,
  isCreator,
  userObj,
  message,
  conversation,
  drawerOpenTrue,
}) => {
  const passingProfile = {
    profileImage: isCreator ? message.creatorProfileImage : message.connectedProfileImage,
    defaultProfile: isCreator ? message.creatorDefaultProfile : message.connectedDefaultProfile,
    profileImageUrl: isCreator ? message.creatorProfileImageUrl : message.connectedProfileImageUrl
  }
  // console.log(message)
  // console.log(passingProfile)
  let uid
  let displayName
  let url
  if (isCreator) {
    uid = message?.creatorId
    displayName = message.displayName
    url = message.creatorUrl
  } else {
    uid = message?.connectedId || message?.uid
    displayName = message?.connectedName || message?.displayName
    url = message?.connectedUrl || message?.url
  }
  return (
    <div onClick={onClick}>
      <Avatars
        element={passingProfile}
        profile={false}
      // uid={uid}
      // profileColor={''}
      // profileUrl={url}
      />
    </div>
  )
}


export default SpecificsTradesTrigger
