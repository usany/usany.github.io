// import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { Card } from "@mui/material";
import { sendEmailVerification, User } from "firebase/auth";
import { auth } from "src/baseApi/serverbase";
import useCardsBackground from "src/hooks/useCardsBackground";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import Skeleton from '@mui/material/Skeleton';

const area = [
  {
    westSouth: { lat: 37.5927551, lng: 127.047462 },
    westNorth: { lat: 37.6010743, lng: 127.047462 },
    eastSouth: { lat: 37.5927551, lng: 127.0571999 },
    eastNorth: { lat: 37.6010743, lng: 127.0571999 },
  }
]
interface Props {
  userObj: User;
}
function ProfileVerification() {
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => console.log('sent'))
  }
  const { color } = useCardsBackground()
  return (
    <div className='flex justify-center cursor-pointer'>
      <Card sx={{ padding: '5px', bgcolor: color }} onClick={() => verifyEmail()}>
        verification email
        {/* <div onClick={() => verifyEmail()}>
      </div> */}
      </Card>
    </div>
  );
}

export default ProfileVerification;
