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
import SpecificsTradesPopups from './SpecificsTradesPopups'

interface Props {
  drawerOpenTrue: () => void
  message: {}
  connectedUser: {}
}
function SpecificsTrades({ drawerOpenTrue, message, connectedUser }: Props) {
  const messageDisplayName = message.displayName
  const connectedDisplayName = connectedUser.displayName
  const {borrowing, lending, noOneYet, pointsReward} = useTexts()
  const messageName =
    messageDisplayName.length > 10
      ? messageDisplayName.slice(0, 10) + '......'
      : messageDisplayName
  const connectedMessageName = connectedDisplayName?.length > 10 ? connectedDisplayName.slice(0, 10) + '......' : connectedDisplayName
  return (
    <div className="flex justify-center pt-3">
      <div className="flex flex-col items-center px-5 gap-1">
        {borrowing}
        {message.text.choose === 1 ? (
          <SpecificsTradesPopups isCreator={true} drawerOpenTrue={drawerOpenTrue} connectedUser={connectedUser} message={message}/>
        ) : (
          <SpecificsTradesPopups isCreator={false} drawerOpenTrue={drawerOpenTrue} connectedUser={connectedUser} message={message}/>
        )}
      </div>
      <div className="flex flex-col">
        <div>
          {message.point} {pointsReward}
        </div>
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
        {lending}
        {message.text.choose === 1 ? (
          <SpecificsTradesPopups isCreator={false} drawerOpenTrue={drawerOpenTrue} connectedUser={connectedUser} message={message}/>
        ) : (
          <SpecificsTradesPopups isCreator={true} drawerOpenTrue={drawerOpenTrue} connectedUser={connectedUser} message={message}/>
        )}
      </div>
    </div>
  )
}

export default SpecificsTrades
