import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BeachAccess from '@mui/icons-material/BeachAccess'
import EastIcon from '@mui/icons-material/East'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import WestIcon from '@mui/icons-material/West'
import { Chip } from '@mui/material'
import { useSelectors, useTexts } from 'src/hooks'
import Popups from '../Popups'
import SpecificsTradesContent from './SpecificsTradesContent'
import SpecificsTradesTitle from './SpecificsTradesTitle'
import SpecificsTradesTrigger from './SpecificsTradeTrigger'

interface Props {
  isCreator: boolean
  drawerOpenTrue: () => void
  connectedUser: {}
}
function SpecificsTradesPopups({ isCreator, drawerOpenTrue, connectedUser, message }: Props) {
  const messageDisplayName = message.displayName
  const connectedDisplayName = connectedUser.displayName
  const {noOneYet} = useTexts()
  const messageName =
    messageDisplayName.length > 10
      ? messageDisplayName.slice(0, 10) + '......'
      : messageDisplayName
  const connectedMessageName = connectedDisplayName?.length > 10 ? connectedDisplayName.slice(0, 10) + '......' : connectedDisplayName
  if (isCreator) {
    return (
      <div className="flex flex-col items-center">
        <Popups
          trigger={
            <SpecificsTradesTrigger
              onClick={drawerOpenTrue}
              isCreator={true}
              message={message}
            />
          }
          title={<SpecificsTradesTitle message={message} connectedUser={connectedUser} isCreator={true} />}
          content={
            <SpecificsTradesContent
              isCreator={true}
              message={message}
              connectedUser={connectedUser}
            />
          }
        />
        <Chip className="specific" size="small" label={messageName} />
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center">
      {connectedUser.uid ? (
        <Popups
          trigger={
            <SpecificsTradesTrigger
              onClick={drawerOpenTrue}
              isCreator={false}
              message={{
                ...message,
                connectedProfileImage: true,
                connectedProfileImageUrl: connectedUser.url,
                connectedDefaultProfile: connectedUser.url,
              }}
            />
          }
          title={<SpecificsTradesTitle message={message} connectedUser={connectedUser} isCreator={false} />}
          content={
            <SpecificsTradesContent
              isCreator={false}
              message={{
                ...message,
                connectedProfileImage: true,
                connectedProfileImageUrl: connectedUser.url,
                connectedDefaultProfile: connectedUser.url,
              }}
              connectedUser={connectedUser}
            />
          }
        />
      ) : (
        <Avatar
          className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
        >
          <AvatarImage src={connectedUser.url} />
          <AvatarFallback className="text-xl border-none">
            ?
          </AvatarFallback>
        </Avatar>
      )}
      <Chip
        className="specific"
        size="small"
        variant={!connectedUser.uid ? 'outlined' : undefined}
        label={connectedUser.uid ? connectedMessageName : noOneYet}
      />
    </div>
  )
}

export default SpecificsTradesPopups
