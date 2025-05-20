import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { User } from 'firebase/auth'
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
  const passingProfile = {
    profileImage: message?.creatorProfileImage,
    defaultProfile: message?.creatorDefaultProfile,
    profileImageUrl: message?.creatorProfileImageUrl,
  }
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
            <SpecificsActionsPopupsContents
              drawerOpenTrue={drawerOpenTrue}
              userObj={userObj}
              message={message}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-1 items-center"></div>
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
            <SpecificsActionsPopupsContents
              drawerOpenTrue={drawerOpenTrue}
              userObj={userObj}
              message={message}
            />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SpecificsActionsPopups
