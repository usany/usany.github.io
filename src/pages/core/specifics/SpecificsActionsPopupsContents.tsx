import { DrawerClose } from '@/components/ui/drawer'
import Button from '@mui/material/Button'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatars from 'src/pages/core/Avatars'

interface Props {
  userObj: User | null
  message: {}
}

function SpecificsActionsPopupsContents({
  drawerOpenTrue,
  userObj,
  message,
}: Props) {
  const [conversation, setConversation] = useState('')
  const messageDisplayName = message.displayName
  let messageName
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + '......'
  } else {
    messageName = messageDisplayName
  }
  useEffect(() => {
    if (drawerOpenTrue) {
      if (message?.creatorId < userObj.uid) {
        setConversation(
          message?.creatorId.slice(0, 5) + userObj.uid.slice(0, 5),
        )
      } else {
        setConversation(
          userObj.uid.slice(0, 5) + message?.creatorId.slice(0, 5),
        )
      }
    }
  }, [message])
  const passingProfile = {
    profileImage: message?.creatorProfileImage,
    defaultProfile: message?.creatorDefaultProfile,
    profileImageUrl: message?.creatorProfileImageUrl,
  }

  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Avatars
          element={passingProfile}
          uid={message.creatorId}
          profile={true}
          profileColor=""
          profileUrl={message.creatorUrl}
          piazza={null}
        />
        <div>{message?.displayName}</div>
      </div>
      <div className="flex justify-center p-5">
        <Link
          to="/profile"
          state={{
            element: {
              uid: message.creatorId,
              displayName: message.displayName,
              profileUrl: message.creatorUrl,
            },
          }}
        >
          <Button variant="outlined">프로필 확인</Button>
        </Link>
        {userObj.uid !== message?.creatorId && (
          <Link
            to="/piazza"
            state={{
              conversation: conversation,
              displayName: message?.displayName,
              userUid: userObj.uid,
              chattingUid: message?.creatorId,
              multiple: false,
              profileUrl: message?.creatorUrl,
            }}
          >
            <DrawerClose>
              <Button variant="outlined" onClick={() => {}}>
                개인 대화
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </>
  )
}

export default SpecificsActionsPopupsContents
