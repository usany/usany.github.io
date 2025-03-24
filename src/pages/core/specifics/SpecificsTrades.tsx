import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import {
  Link
} from 'react-router-dom'
// import { CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip'
// import { useBottomNavigationStore } from 'src/store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer'
import BeachAccess from '@mui/icons-material/BeachAccess'
import EastIcon from '@mui/icons-material/East'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import WestIcon from '@mui/icons-material/West'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { User } from 'firebase/auth'
import Avatars from 'src/pages/core/Avatars'
import DrawersBar from 'src/pages/core/DrawersBar'

const DrawerProfile = ({
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
    uid = message?.connectedId
    displayName = message.connectedName
    url = message.connectedUrl
  }
  return (
    <Drawer>
      <DrawerTrigger onClick={drawerOpenTrue}>
        <Avatars
          uid={userObj.uid}
          profile={false}
          profileColor={''}
          profileUrl={url}
        />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2">
        <ScrollArea className="overflow-y-scroll">
          <DrawersBar />
          <div className="flex flex-col items-center pt-5">
            <Avatars
              uid={userObj.uid}
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
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

interface Props {
  userObj: User | null
  message: {}
}
function SpecificsTrades({ drawerOpenTrue, userObj, message }: Props) {
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

  return (
    <div className="flex justify-center pt-3">
      <div className="flex flex-col items-center px-5 gap-1">
        <div>빌리는 분</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            <DrawerProfile
              isCreator={true}
              userObj={userObj}
              message={message}
              conversation={conversation}
              drawerOpenTrue={drawerOpenTrue}
            />
            {/* <Avatars
              profile={false}
              profileColor={""}
              profileUrl={message.creatorUrl}
              fallback={userObj.displayName ? userObj.displayName[0] : ""}
            /> */}
            <Chip label={messageName} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {message.connectedName ? (
              <DrawerProfile
                isCreator={false}
                userObj={userObj}
                message={message}
                conversation={conversation}
                drawerOpenTrue={drawerOpenTrue}
              />
            ) : (
              // <Avatars
              //   profile={false}
              //   profileColor={""}
              //   profileUrl={message.creatorUrl}
              //   fallback={message.connectedName ? message.connectedName[0] : ""}
              // />
              <Avatar
                className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
              >
                <AvatarImage src={message?.connectedUrl} />
                <AvatarFallback className="text-xl border-none">
                  ?
                </AvatarFallback>
              </Avatar>
            )}
            {message.connectedName ? (
              <Chip label={message.connectedName} />
            ) : (
              <Chip variant="outlined" label={'아직 없음'} />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div>{message.point} 포인트 지급</div>
        <div className="flex justify-start">
          <HorizontalRuleIcon />
          <EastIcon />
          <HorizontalRuleIcon />
          <EastIcon />
        </div>
        <div className="flex justify-end">
          <WestIcon />
          <HorizontalRuleIcon />
          <WestIcon />
          <HorizontalRuleIcon />
        </div>
        <div className="flex justify-end">
          <BeachAccess />
        </div>
      </div>
      <div className="flex flex-col items-center px-5 gap-1">
        <div>빌려주는 분</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            {message.connectedName ? (
              <DrawerProfile
                isCreator={false}
                userObj={userObj}
                message={message}
                conversation={conversation}
                drawerOpenTrue={drawerOpenTrue}
              />
            ) : (
              // <Avatars
              //   profile={false}
              //   profileColor={""}
              //   profileUrl={message.connectedUrl}
              //   fallback={message.connectedName ? message.connectedName[0] : ""}
              // />
              <Avatar
                className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
              >
                <AvatarImage src={message?.connectedUrl} />
                <AvatarFallback className="text-xl border-none">
                  ?
                </AvatarFallback>
              </Avatar>
            )}
            {message.connectedName ? (
              <Chip label={message.connectedName} />
            ) : (
              <Chip variant="outlined" label={'아직 없음'} />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <DrawerProfile
              isCreator={true}
              userObj={userObj}
              message={message}
              conversation={conversation}
              drawerOpenTrue={drawerOpenTrue}
            />
            {/* <Avatars
              profile={false}
              profileColor={""}
              profileUrl={message.creatorUrl}
              fallback={userObj.displayName ? userObj.displayName[0] : ""}
            /> */}
            <Chip label={messageName} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SpecificsTrades
