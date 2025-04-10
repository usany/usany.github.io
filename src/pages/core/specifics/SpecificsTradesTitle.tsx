// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import { User } from 'firebase/auth'


interface Props {
  userObj: User | null
  message: {}
}
function SpecificsTradesTitle({ drawerOpenTrue, userObj, message, round, connectedUser }: Props) {

  return (
    <div>프로필 확인</div>
  )
}

export default SpecificsTradesTitle
