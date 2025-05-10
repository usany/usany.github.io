import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import useLargeMedia from 'src/hooks/useLargeMedia'
import Avatars from 'src/pages/core/Avatars'
import DrawersBar from 'src/pages/core/DrawersBar'
import SpecificsActionsPopupsContents from './SpecificsActionsPopupsContents'

interface Props {
  userObj: User | null
  message: {}
}

function SpecificsActionsPopups({ drawerOpenTrue, userObj, message }: Props) {
  const largeMedia = useLargeMedia()
  const [conversation, setConversation] = useState('')
  const messageDisplayName = message.displayName
  let messageName
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + '......'
  } else {
    messageName = messageDisplayName
  }
  const passingProfile = {
    profileImage: message?.creatorProfileImage,
    defaultProfile: message?.creatorDefaultProfile,
    profileImageUrl: message?.creatorProfileImageUrl
  }
  console.log(message)
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
  if (largeMedia) {
    return (
      <Dialog>
        <DialogTrigger onClick={drawerOpenTrue}>
          <Avatars
            element={passingProfile}
            uid={message.creatorId}
            profile={false}
            profileColor={''}
            profileUrl={message.creatorUrl}
          />
        </DialogTrigger>
        <DialogContent>
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <SpecificsActionsPopupsContents drawerOpenTrue={drawerOpenTrue} userObj={userObj} message={message} />
            {/* <div className="flex flex-col items-center pt-5">
              <Avatars
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
                <Button
                  variant="outlined"
                  onClick={() => {
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
                      }}
                    >
                      개인 대화
                    </Button>
                  </DrawerClose>
                </Link>
              )}
            </div> */}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-1 items-center">
        </div>
      </div>
      <Drawer>
        <DrawerTrigger onClick={drawerOpenTrue}>
          <Avatars
            element={passingProfile}
            uid={message.creatorId}
            profile={false}
            profileColor={''}
            profileUrl={message.creatorUrl}
          />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <SpecificsActionsPopupsContents drawerOpenTrue={drawerOpenTrue} userObj={userObj} message={message} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SpecificsActionsPopups
