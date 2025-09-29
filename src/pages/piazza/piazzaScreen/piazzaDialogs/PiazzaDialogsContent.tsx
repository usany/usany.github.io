import Button from '@mui/material/Button'
import { Link, useLocation } from 'react-router-dom'
import { DrawerClose } from '@/components/ui/drawer'
import { useSelectors } from 'src/hooks'
import Avatars from 'src/pages/core/Avatars'

const PiazzaDialogsContent = ({
  initiateContinuing,
  user,
  handleMessagesList,
}) => {
  const { state } = useLocation()
  const conversation = state?.conversation || 'piazza'
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const partialProfileUid = profile?.uid.slice(0, 6)
  const partialUserUid = user?.uid.slice(0, 6)
  const mergedUid = user?.uid < profile?.uid ? partialUserUid+partialProfileUid : partialProfileUid+partialUserUid
  const newConversation = mergedUid

  return (
    <div>
      <div className="flex flex-col items-center pt-5">
        <Avatars
          element={user}
          uid={profile?.uid}
          profile={true}
          profileColor=""
          profileUrl={user?.profileImageUrl}
          fallback=""
          piazza={null}
        />
      </div>
      <div className="flex justify-center p-5">
        <Link to={`/profile?id=${user?.uid}`} state={{ element: user }}>
          <Button variant="outlined" onClick={() => {}}>
            {languages === 'ko' ? '프로필 확인' : 'Check Profile'}
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
                {languages === 'ko' ? '개인 대화' : 'Private messaging'}
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </div>
  )
}

export default PiazzaDialogsContent
