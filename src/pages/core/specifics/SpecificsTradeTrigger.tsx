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
  // console.log(message)
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
  console.log(uid)
  return (
    <div onClick={onClick}>
      <Avatars
        uid={uid}
        profile={false}
        profileColor={''}
        profileUrl={url}
      />
    </div>
  )
}


export default SpecificsTradesTrigger
