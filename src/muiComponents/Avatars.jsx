import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

function Avatars({ userObj, msgObj }) {
  // if (msgObj !== null) {
  //   const altName = msgObj.displayName
  // } else if (userObj !== null){
  //   const altName = userObj.displayName
  // } else {
  //   const altName = null
  // }
  return (
    <div>
      {/* {userObj &&
        <Avatar alt={userObj.displayName} sx={{ bgcolor: blue[500] }} src='./src'/>
      }
      {!userObj &&
        <Avatar sx={{ bgcolor: blue[500] }} />
      }
      {msgObj &&
        <Avatar alt={msgObj.displayName} sx={{ bgcolor: blue[500] }} src='./src'/>
      } */}
    </div>  
  )
}

export default Avatars
