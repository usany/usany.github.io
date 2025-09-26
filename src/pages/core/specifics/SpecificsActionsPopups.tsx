import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import useLargeMedia from 'src/hooks/useLargeMedia'
import Avatars from 'src/pages/core/Avatars'
import DrawersBar from 'src/pages/core/DrawersBar'
import SpecificsActionsPopupsContents from './SpecificsActionsPopupsContents'
import Popups from '../Popups'
import SpecificsTradesContent from './SpecificsTradesContent'

interface Props {
  message: {}
}

function SpecificsActionsPopups({ message }: Props) {
  const passingProfile = {
    profileImage: message?.creatorProfileImage,
    defaultProfile: message?.creatorDefaultProfile,
    profileImageUrl: message?.creatorProfileImageUrl,
  }

  return (
    <Popups
      trigger={
        <Avatars
          element={passingProfile}
          profile={false}
        />
      }
      title={message.displayName}
      content={
        <SpecificsTradesContent
          isCreator={true}
          message={message}
          connectedUser={null}
        />
      }
    />
  )
}

export default SpecificsActionsPopups
