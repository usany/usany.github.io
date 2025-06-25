import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import { blue } from '@mui/material/colors';
import {
  DrawerClose
} from "@/components/ui/drawer";
import { useEffect, useState } from 'react';
import { useSelectors } from 'src/hooks/useSelectors';
import Avatars from 'src/pages/core/Avatars';

const PiazzaDialogsContent = ({ initiateContinuing, user, userObj, handleMessagesList, displayedName, handleChatUid, handleChatDisplayName }) => {
  const { state } = useLocation()
  const conversation = state?.conversation || 'piazza'
  const languages = useSelectors((state) => state.languages.value)
  const [newConversation, setNewConversation] = useState('')
  useEffect(() => {
    if (user) {
      if (user?.uid < userObj.uid) {
        setNewConversation(user?.uid[0] + user?.uid[1] + user?.uid[2] + user?.uid[3] + user?.uid[4] + user?.uid[5] + userObj.uid[0] + userObj.uid[1] + userObj.uid[2] + userObj.uid[3] + userObj.uid[4] + userObj.uid[5])
      } else {
        setNewConversation(userObj.uid[0] + userObj.uid[1] + userObj.uid[2] + userObj.uid[3] + userObj.uid[4] + userObj.uid[5] + user?.uid[0] + user?.uid[1] + user?.uid[2] + user?.uid[3] + user?.uid[4] + user?.uid[5])
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
        <Link
          to={`/profile?id=${user?.uid}`}
          state={{ element: user }}>
          <Button variant='outlined' onClick={() => {
          }}>
            {languages === 'ko' ? '프로필 확인' : 'Check Profile'}
          </Button>
        </Link>
        {conversation === 'piazza' && userObj.uid !== user?.uid &&
          <Link
            to={`${location.pathname}?id=${newConversation}`}
            state={{ conversation: newConversation, displayName: user?.displayName, userUid: userObj.uid, chattingUid: user?.uid, multiple: false, profileUrl: user?.profileImageUrl }}>
            <DrawerClose>
              <Button variant='outlined' onClick={() => {
                handleMessagesList([])
                // handleChangeMessage(true)
                // handleMultiple(false)
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
