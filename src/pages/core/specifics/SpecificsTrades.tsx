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
import DrawerProfile from './DrawerProfile'
import SpecificsTradesTitle from './SpecificsTradeTitle'
import SpecificsTradesTrigger from './SpecificsTradeTrigger'
import SpecificsTradeContent from './SpecificsTradesContent'


interface Props {
  userObj: User | null
  message: {}
}
function SpecificsTrades({ drawerOpenTrue, userObj, message, round, connectedUser }: Props) {
  const [conversation, setConversation] = useState('')
  // const [connectedName, setConnectedName] = useState('')
  const messageDisplayName = message.displayName
  const languages = useSelectors((state) => state.languages.value)
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
        <div>{languages === 'ko' ? '빌리는 분' : 'Borrowing user'}</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            {/* <DrawerProfile
              isCreator={true}
              userObj={userObj}
              message={message}
              conversation={conversation}
              drawerOpenTrue={drawerOpenTrue}
            /> */}
            <Popups trigger={<SpecificsTradesTrigger isCreator={true} message={message} />} title={<SpecificsTradesTitle />} content={<SpecificsTradeContent isCreator={true} userObj={userObj} message={message} conversation={conversation} drawerOpenTrue={drawerOpenTrue} />} />
            {/* <Avatars
              profile={false}
              profileColor={""}
              profileUrl={message.creatorUrl}
              fallback={userObj.displayName ? userObj.displayName[0] : ""}
            /> */}
            <Chip label={messageName} />
            {/* <Chips label={messageName} /> */}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {connectedUser.uid ? (
              <DrawerProfile
                isCreator={false}
                userObj={userObj}
                message={connectedUser}
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
              // <Chips label={message.connectedName} />
            ) : (
              <Chip variant="outlined" label={'아직 없음'} />
              // <Chips label={'아직 없음'} className='border' />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div>{message.point} {languages === 'ko' ? '포인트 지급' : 'points reward'}</div>
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
        <div>{languages === 'ko' ? '빌려주는 분' : 'Lending user'}</div>
        {message.text.choose === 1 ? (
          <div className="flex flex-col items-center">
            {connectedUser.uid ? (
              <DrawerProfile
                isCreator={false}
                userObj={userObj}
                message={connectedUser}
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
              // <Chips label={message.connectedName} />
            ) : (
              <Chip variant="outlined" label={languages === 'ko' ? '아직 없음' : 'No one yet'} />
              // <Chips label={'아직 없음'} className='border' />
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
            {/* <Chips label={messageName} /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default SpecificsTrades
