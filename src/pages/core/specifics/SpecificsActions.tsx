import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import {
  Link
} from 'react-router-dom'
// import { CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip'
// import { useBottomNavigationStore } from 'src/store'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { User } from 'firebase/auth'
import Avatars from 'src/pages/core/Avatars'
import DrawersBar from 'src/pages/core/DrawersBar'

interface Props {
  userObj: User | null
  message: {}
}

function SpecificsActions({ drawerOpenTrue, userObj, message }: Props) {
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
    <>
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-1 items-center">
          <Drawer>
            <DrawerTrigger onClick={drawerOpenTrue}>
              <Avatars
                uid={userObj.uid}
                profile={false}
                profileColor={''}
                profileUrl={message.creatorUrl}
              />
            </DrawerTrigger>
            <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
              <ScrollArea className="overflow-y-scroll">
                <DrawersBar />
                <div className="flex flex-col items-center pt-5">
                  <Avatars
                    uid={userObj.uid}
                    profile={true}
                    profileColor=""
                    profileUrl={message.creatorUrl}
                    piazza={null}
                  />
                  {/* <Avatar className={'bg-profile-blue'}>
                    <AvatarImage src={message.creatorUrl} />
                    <AvatarFallback className="text-xl border-none	">
                      {message?.displayName[0]}
                    </AvatarFallback>
                  </Avatar> */}
                  <div>{message?.displayName}</div>
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
                        uid: message.creatorId,
                        displayName: message.displayName,
                        profileUrl: message.creatorUrl,
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
                        displayName: message?.displayName,
                        userUid: userObj.uid,
                        chattingUid: message?.creatorId,
                        multiple: false,
                        profileUrl: message?.creatorUrl,
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
          {/* <Avatars
            profile={false}
            profileColor={""}
            profileUrl={message.creatorUrl}
            fallback={message.displayName && message.displayName[0]}
          /> */}
          {message.creatorId === userObj?.uid ? (
            <Chip label="내가 작성함" />
          ) : (
            <Chip label={`${messageName} 작성함`} />
          )}
        </div>
        <div className="flex items-center">
          <Chip
            label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
          />
        </div>
      </div>
    </>
  )
}

export default SpecificsActions
