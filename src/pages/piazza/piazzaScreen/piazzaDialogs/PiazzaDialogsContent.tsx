import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import { blue } from '@mui/material/colors';
import {
  DrawerClose
} from "@/components/ui/drawer";
import { useSelectors } from 'src/hooks/useSelectors';
import Avatars from 'src/pages/core/Avatars';

const PiazzaDialogsContent = ({ initiateContinuing, multiple, handleMultiple, user, userObj, handleMessagesList, displayedName, }) => {
  const [conversation, setConversation] = useState(null)
  const languages = useSelectors((state) => state.languages.value)
  useEffect(() => {
    if (user) {
      if (user?.uid < userObj.uid) {
        setConversation(user?.uid[0] + user?.uid[1] + user?.uid[2] + user?.uid[3] + user?.uid[4] + user?.uid[5] + userObj.uid[0] + userObj.uid[1] + userObj.uid[2] + userObj.uid[3] + userObj.uid[4] + userObj.uid[5])
      } else {
        setConversation(userObj.uid[0] + userObj.uid[1] + userObj.uid[2] + userObj.uid[3] + userObj.uid[4] + userObj.uid[5] + user?.uid[0] + user?.uid[1] + user?.uid[2] + user?.uid[3] + user?.uid[4] + user?.uid[5])
      }
    }
  }, [user])
  return (
    <div>
      <div className='flex flex-col items-center pt-5'>
        <Avatars element={user}
          uid={userObj.uid} profile={true} profileColor="" profileUrl={user?.profileImageUrl} fallback="" piazza={null} />
        {/* <Avatar className={'bg-profile-blue'}>
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback className='text-xl border-none	'>{user?.displayName[0]}</AvatarFallback>
              </Avatar> */}
        <div>
          {user?.displayName}
        </div>
        {user?.displayName !== displayedName &&
          <div>
            {languages === 'ko' ?
              <div>
                ({displayedName}에서 개명)
              </div>
              :
              <div>
                (Changed name from {displayedName})
              </div>
            }
          </div>
        }
      </div>
      <div className='flex justify-center p-5'>
        <Link to='/profile' state={{ element: user }}>
          <Button variant='outlined' onClick={() => {
            // handleClose()
          }}>
            {languages === 'ko' ? '프로필 확인' : 'Check Profile'}
          </Button>
        </Link>
        {multiple && userObj.uid !== user?.uid &&
          <Link to='/piazza' state={{ conversation: conversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid, multiple: false, profileUrl: user?.profileImageUrl }}>
            <DrawerClose>
              <Button variant='outlined' onClick={() => {
                handleMessagesList([])
                // handleChangeMessage(true)
                handleMultiple(false)
                initiateContinuing()
                // handleClose()
              }}>
                {languages === 'ko' ? '개인 대화' : 'Private messaging'}
              </Button>
            </DrawerClose>
          </Link>
        }
      </div>
    </div>
  )
}

export default PiazzaDialogsContent
