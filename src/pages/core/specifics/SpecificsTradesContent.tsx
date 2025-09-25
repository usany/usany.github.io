import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { DrawerClose } from '@/components/ui/drawer'
import Avatars from 'src/pages/core/Avatars'
import { useSelectors, useTexts } from 'src/hooks'
import { DocumentData } from 'firebase/firestore'

interface Props {
  isCreator: boolean
  message: DocumentData
  conversation: string
  connectedUser: object
}
const SpecificsTradesContent = ({
  isCreator,
  message,
  conversation,
  connectedUser,
}: Props) => {
  const profile = useSelectors((state) => state.profile.value)
  const {userProfile, chat} = useTexts()
  const passingProfile = {
    profileImage: isCreator
      ? message.creatorProfileImage
      : message.connectedProfileImage,
    defaultProfile: isCreator
      ? message.creatorDefaultProfile
      : message.connectedDefaultProfile || connectedUser.connectedUrl,
    profileImageUrl: isCreator
      ? message.creatorProfileImageUrl
      : message.connectedProfileImageUrl || connectedUser.connectedUrl,
  }
  const uid = isCreator ? message?.creatorId : connectedUser.uid
  const displayName = isCreator ? message.displayName : connectedUser.displayName
  const url = isCreator ? message.creatorUrl : connectedUser.url
  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Avatars element={passingProfile} profile={true} piazza={null} />
        <div>{displayName}</div>
      </div>
      <div className="flex justify-center p-5">
        <Link
          to={`/profile${profile?.uid !== uid ? `/?id:${uid}` : ''}`}
          state={{
            element: {
              uid: uid,
              displayName: displayName,
              profileImage: passingProfile.profileImage,
              defaultProfile: passingProfile.defaultProfile,
              profileImageUrl: passingProfile.profileImageUrl,
            },
          }}
        >
          <DrawerClose>
            <Button
              variant="outlined"
              onClick={() => {
                document.body.classList.remove('overflow-hidden')
              }}
            >
              {userProfile}
            </Button>
          </DrawerClose>
        </Link>
        {profile?.uid !== message?.creatorId && profile?.uid !== connectedUser?.uid && (
          <Link
            to={`/piazza/?id=${conversation}`}
            state={{
              conversation: conversation,
              displayName: displayName,
              userUid: profile?.uid,
              chattingUid: uid,
              multiple: false,
              profileUrl: url,
            }}
          >
            <DrawerClose>
              <Button
                variant="outlined"
                onClick={() => {
                  document.body.classList.remove('overflow-hidden')
                }}
              >
                {chat}
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </>
  )
}

export default SpecificsTradesContent
