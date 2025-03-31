import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Chips from 'src/myChips'
import SpecificsActionsPopups from './SpecificsActionsPopups'

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
          <SpecificsActionsPopups
            drawerOpenTrue={drawerOpenTrue}
            userObj={userObj}
            message={message}
          />
          {/* <Chip label={`${message.creatorId === userObj?.uid ? '내가' : messageName} 작성함`} /> */}
          <Chips label={`${message.creatorId === userObj?.uid ? '내가' : messageName} 작성함`} onClick={null} className='' />
        </div>
        <div className="flex items-center">
          {/* <Chip
            label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`}
          /> */}
          <Chips label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`} onClick={null} className='' />
        </div>
      </div>
    </>
  )
}

export default SpecificsActions
