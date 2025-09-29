import Button from '@mui/material/Button'
import { Link, useLocation } from 'react-router-dom'
import { DrawerClose } from '@/components/ui/drawer'
import { useSelectors, useTexts } from 'src/hooks'
import Avatars from 'src/pages/core/Avatars'

const PiazzaDialogsContent = ({
  initiateContinuing,
  user,
  handleMessagesList,
}) => {
  const { state } = useLocation()
  const conversation = state?.conversation || 'piazza'
  const profile = useSelectors((state) => state.profile.value)
  const partialProfileUid = profile?.uid.slice(0, 6)
  const partialUserUid = user?.uid.slice(0, 6)
  const newConversation = user?.uid < profile?.uid ? partialUserUid+partialProfileUid : partialProfileUid+partialUserUid
  const {userProfile, privateMessaging} = useTexts()
  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Avatars
          element={user}
          profile={true}
          piazza={null}
        />
      </div>
      <div className="flex justify-center p-5">
        <Link to={`/profile?id=${user?.uid}`} state={{ element: user }}>
          <Button variant="outlined" onClick={() => {}}>
            {userProfile}
          </Button>
        </Link>
        {conversation === 'piazza' && profile?.uid !== user?.uid && (
          <Link
            to={`${location.pathname}?id=${newConversation}`}
            state={{
              conversation: newConversation,
              displayName: user?.displayName,
              userUid: profile?.uid,
              chattingUid: user?.uid,
              multiple: false,
              profileUrl: user?.profileImageUrl,
            }}
          >
            <DrawerClose>
              <Button
                variant="outlined"
                onClick={() => {
                  handleMessagesList([])
                  initiateContinuing()
                }}
              >
                {privateMessaging}
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </>
  )
}

export default PiazzaDialogsContent
