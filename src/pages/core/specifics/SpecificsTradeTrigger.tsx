import Avatars from 'src/pages/core/Avatars'

const SpecificsTradesTrigger = ({
  onClick,
  isCreator,
  message,
}) => {
  const passingProfile = {
    profileImage: isCreator ? message.creatorProfileImage : message.connectedProfileImage,
    defaultProfile: isCreator ? message.creatorDefaultProfile : message.connectedDefaultProfile,
    profileImageUrl: isCreator ? message.creatorProfileImageUrl : message.connectedProfileImageUrl
  }
  const uid = isCreator ? message?.creatorId : (message?.connectedId || message?.uid)
  const displayName = isCreator ? message.displayName : (message?.connectedName || message?.displayName)
  const url = isCreator ? message.creatorUrl : (message?.connectedUrl || message?.url)
  return (
    <div onClick={onClick}>
      <Avatars
        element={passingProfile}
        profile={false}
      />
    </div>
  )
}


export default SpecificsTradesTrigger
