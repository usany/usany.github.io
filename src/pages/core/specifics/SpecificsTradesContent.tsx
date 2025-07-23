import Button from '@mui/material/Button'
import {
  Link
} from 'react-router-dom'
// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import {
  DrawerClose
} from '@/components/ui/drawer'
import Avatars from 'src/pages/core/Avatars'

const SpecificsTradesContent = ({
  isCreator,
  userObj,
  message,
  conversation,
  drawerOpenTrue,
  connectedUser
}) => {
  // console.log(message)
  const passingProfile = {
    profileImage: isCreator ? message.creatorProfileImage : message.connectedProfileImage,
    defaultProfile: isCreator ? message.creatorDefaultProfile : message.connectedDefaultProfile || connectedUser.connectedUrl,
    profileImageUrl: isCreator ? message.creatorProfileImageUrl : message.connectedProfileImageUrl || connectedUser.connectedUrl
  }
  let uid
  let displayName
  let url
  let profileImage
  let defaultProfile
  console.log(connectedUser)
  if (isCreator) {
    uid = message?.creatorId
    displayName = message.displayName
    url = message.creatorUrl
  } else {
    uid = connectedUser.uid
    displayName = connectedUser.displayName
    url = connectedUser.url
  }
  return (
    <div>
      <div className="flex flex-col items-center pt-5">
        <Avatars
          element={passingProfile}
          profile={true}
          // uid={uid}
          // profileColor=""
          // profileUrl={url}
          piazza={null}
        />
        {/* <Avatar className={'bg-profile-blue'}>
              <AvatarImage src={url} />
              <AvatarFallback className="text-xl border-none	">
                {displayName && displayName[0]}
              </AvatarFallback>
            </Avatar> */}
        <div>{displayName}</div>
        {/* {message?.displayName !== displayedName &&
                  <div>
                      ({displayedName}에서 개명)
                  </div>
              } */}
      </div>
      <div className="flex justify-center p-5">
        <Link
          to={`/profile${userObj.uid !== uid && `/?id:${uid}`}`}
          state={{
            element: {
              uid: uid,
              displayName: displayName,
              profileImage: passingProfile.profileImage,
              defaultProfile: passingProfile.defaultProfile,
              profileImageUrl: passingProfile.profileImageUrl,
            }
          }}
        >
          <DrawerClose>
            <Button
              variant="outlined"
              onClick={() => {
                document.body.classList.remove('overflow-hidden')
              }}
            >
              프로필 확인
            </Button>
          </DrawerClose>
        </Link>
        {userObj.uid !== message?.creatorId && (
          <Link
            to={`/piazza/?id=${conversation}`}
            state={{
              conversation: conversation,
              displayName: displayName,
              userUid: userObj.uid,
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
                개인 대화
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </div>
  )
}


export default SpecificsTradesContent
