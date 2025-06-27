import { useEffect, useState } from 'react'
// import { CardActionArea, CardActions } from '@mui/material';
// import { useBottomNavigationStore } from 'src/store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BeachAccess from '@mui/icons-material/BeachAccess'
import EastIcon from '@mui/icons-material/East'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import WestIcon from '@mui/icons-material/West'
import { Chip } from '@mui/material'
import { User } from 'firebase/auth'
import { useSelectors } from 'src/hooks/useSelectors'
import Popups from '../Popups'
import { SpecificsTradesContent } from './SpecificsTradesContent'
import SpecificsTradesTitle from './SpecificsTradesTitle'
import SpecificsTradesTrigger from './SpecificsTradeTrigger'

interface Props {
  userObj: User | null
  message: {}
}
function SpecificsTrades({
  drawerOpenTrue,
  userObj,
  message,
  round,
  connectedUser,
}: Props) {
  const [conversation, setConversation] = useState('')
  const messageDisplayName = message.displayName
  const connectedDisplayName = connectedUser.displayName
  const languages = useSelectors((state) => state.languages.value)
  let messageName
  let connectedMessageName
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + '......'
  } else {
    messageName = messageDisplayName
  }
  if (connectedDisplayName) {
    if (connectedDisplayName.length > 10) {
      connectedMessageName = connectedDisplayName.slice(0, 10) + '......'
    } else {
      connectedMessageName = connectedDisplayName
    }
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
  console.log(message)
  return (
    <div className="flex justify-center pt-3">
      <div className="flex flex-col items-center px-5 gap-1">
        <div>{languages === 'ko' ? '빌리는 분' : 'Borrowing'}</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            <Popups
              trigger={
                <SpecificsTradesTrigger
                  onClick={drawerOpenTrue}
                  isCreator={true}
                  message={message}
                />
              }
              title={<SpecificsTradesTitle />}
              content={
                <SpecificsTradesContent
                  isCreator={true}
                  userObj={userObj}
                  message={message}
                  conversation={conversation}
                  drawerOpenTrue={drawerOpenTrue}
                  connectedUser={connectedUser}
                />
              }
            />
            <Chip label={messageName} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {connectedUser.uid ? (
              <Popups
                trigger={
                  <SpecificsTradesTrigger
                    onClick={drawerOpenTrue}
                    isCreator={false}
                    message={message}
                  />
                }
                title={<SpecificsTradesTitle />}
                content={
                  <SpecificsTradesContent
                    isCreator={false}
                    userObj={userObj}
                    message={message}
                    conversation={conversation}
                    drawerOpenTrue={drawerOpenTrue}
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
            {connectedUser.uid ? (
              <Chip label={connectedUser.displayName} />
            ) : (
              <Chip variant="outlined" label={'아직 없음'} />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div>
          {message.point} {languages === 'ko' ? '포인트 지급' : 'points reward'}
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
        <div>{languages === 'ko' ? '빌려주는 분' : 'Lending'}</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            {connectedUser.uid ? (
              <Popups
                trigger={
                  <SpecificsTradesTrigger
                    onClick={drawerOpenTrue}
                    isCreator={false}
                    message={message}
                  />
                }
                title={<SpecificsTradesTitle />}
                content={
                  <SpecificsTradesContent
                    isCreator={false}
                    userObj={userObj}
                    message={message}
                    conversation={conversation}
                    drawerOpenTrue={drawerOpenTrue}
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
            {connectedUser.uid ? (
              <Chip label={connectedMessageName} />
            ) : (
              <Chip
                variant="outlined"
                label={languages === 'ko' ? '아직 없음' : 'No one yet'}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Popups
              trigger={
                <SpecificsTradesTrigger
                  onClick={drawerOpenTrue}
                  isCreator={true}
                  message={message}
                />
              }
              title={<SpecificsTradesTitle />}
              content={
                <SpecificsTradesContent
                  isCreator={false}
                  userObj={userObj}
                  message={message}
                  conversation={conversation}
                  drawerOpenTrue={drawerOpenTrue}
                  connectedUser={connectedUser}
                />
              }
            />
            <Chip label={messageName} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SpecificsTrades
