import { useEffect, useState } from 'react'
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
  message: {}
}
function SpecificsTrades({ drawerOpenTrue, message, connectedUser }: Props) {
  const [conversation, setConversation] = useState('')
  const messageDisplayName = message.displayName
  const connectedDisplayName = connectedUser.displayName
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const {borrowing, lending, noOneYet} = useTexts()
  const messageName =
    messageDisplayName.length > 10
      ? messageDisplayName.slice(0, 10) + '......'
      : messageDisplayName
  const connectedMessageName = connectedDisplayName?.length > 10 ? connectedDisplayName.slice(0, 10) + '......' : connectedDisplayName

  useEffect(() => {
    if (drawerOpenTrue) {
      if (message?.creatorId < profile?.uid) {
        setConversation(
          message?.creatorId.slice(0, 6) + profile?.uid.slice(0, 6),
        )
      } else {
        setConversation(
          profile?.uid.slice(0, 6) + message?.creatorId.slice(0, 6),
        )
      }
    }
  }, [message])
  return (
    <div className="flex justify-center pt-3">
      <div className="flex flex-col items-center px-5 gap-1">
        {borrowing}
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
              title={<SpecificsTradesTitle message={message} connectedUser={connectedUser} isCreator={true} />}
              content={
                <SpecificsTradesContent
                  isCreator={true}
                  message={message}
                  conversation={conversation}
                  connectedUser={connectedUser}
                />
              }
            />
            <Chip className="specific" size="small" label={messageName} />
          </div>
        ) : (
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
                title={<SpecificsTradesTitle message={message} isCreator={false} />}
                content={
                  <SpecificsTradesContent
                    isCreator={false}
                    userObj={profile}
                    message={{
                      ...message,
                      connectedProfileImage: true,
                      connectedProfileImageUrl: connectedUser.url,
                      connectedDefaultProfile: connectedUser.url,
                    }}
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
            <Chip
              className="specific"
              size="small"
              variant={!connectedUser.uid ? 'outlined' : undefined}
              label={connectedUser.uid ? connectedUser.displayName : noOneYet}
            />
            {/* {connectedUser.uid ? (
              <Chip
                className="specific"
                size="small"
                label={connectedUser.displayName}
              />
            ) : (
              <Chip
                className="specific"
                size="small"
                variant="outlined"
                label={'아직 없음'}
              />
            )} */}
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
        {lending}
        {message.text.choose === 1 ? (
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
                title={<SpecificsTradesTitle />}
                content={
                  <SpecificsTradesContent
                    isCreator={false}
                    message={{
                      ...message,
                      connectedProfileImage: true,
                      connectedProfileImageUrl: connectedUser.url,
                      connectedDefaultProfile: connectedUser.url,
                    }}
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
              <Chip
                className="specific"
                size="small"
                label={connectedMessageName}
              />
            ) : (
              <Chip
                className="specific"
                size="small"
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
                  isCreator={true}
                  userObj={profile}
                  message={message}
                  conversation={conversation}
                  drawerOpenTrue={drawerOpenTrue}
                  connectedUser={connectedUser}
                />
              }
            />
            <Chip className="specific" label={messageName} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SpecificsTrades
