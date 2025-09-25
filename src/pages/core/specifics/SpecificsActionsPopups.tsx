import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import useLargeMedia from 'src/hooks/useLargeMedia'
import Avatars from 'src/pages/core/Avatars'
import DrawersBar from 'src/pages/core/DrawersBar'
import SpecificsActionsPopupsContents from './SpecificsActionsPopupsContents'

interface Props {
  drawerOpenTrue: () => void
  message: {}
}

function SpecificsActionsPopups({ drawerOpenTrue, message }: Props) {
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
            profile={false}
          />
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <SpecificsActionsPopupsContents
              message={message}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger onClick={drawerOpenTrue}>
        <Avatars
          element={passingProfile}
          profile={false}
        />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
        <ScrollArea className="overflow-y-scroll">
          <DrawersBar />
          <SpecificsActionsPopupsContents
            message={message}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

export default SpecificsActionsPopups
