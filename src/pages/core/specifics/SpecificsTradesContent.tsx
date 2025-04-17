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
}) => {
  // console.log(message)
  let uid
  let displayName
  let url
  if (isCreator) {
    uid = message?.creatorId
    displayName = message.displayName
    url = message.creatorUrl
  } else {
    uid = message?.connectedId || message?.uid
    displayName = message?.connectedName || message?.displayName
    url = message?.connectedUrl || message?.url
  }
  return (
    <div>
      <div className="flex flex-col items-center pt-5">
        <Avatars
          uid={uid}
          profile={true}
          profileColor=""
          profileUrl={url}
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
          to="/profile"
          state={{
            element: {
              uid: uid,
              displayName: displayName,
              profileUrl: url,
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              // handleClose()
            }}
          >
            프로필 확인
          </Button>
        </Link>
        {userObj.uid !== message?.creatorId && (
          <Link
            to="/piazza"
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
                  // handleMessagesList([])
                  // handleMultiple(false)
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
