import { Chip } from '@mui/material'
import { User } from 'firebase/auth'
import { useState } from 'react'
import { useSelectors } from 'src/hooks/useSelectors'
import SpecificsActionsPopups from './SpecificsActionsPopups'

const items = {
  Usan: '우산',
  Yangsan: '양산'
}
interface Props {
  userObj: User | null
  message: {}
}

function SpecificsActions({ drawerOpenTrue, userObj, message }: Props) {
  const [conversation, setConversation] = useState('')
  const messageDisplayName = message.displayName
  const languages = useSelectors((state) => state.languages.value)
  let messageName
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + '......'
  } else {
    messageName = messageDisplayName
  }
  // useEffect(() => {
  //   if (drawerOpenTrue) {
  //     if (message?.creatorId < userObj.uid) {
  //       setConversation(
  //         message?.creatorId.slice(0, 5) + userObj.uid.slice(0, 5),
  //       )
  //     } else {
  //       setConversation(
  //         userObj.uid.slice(0, 5) + message?.creatorId.slice(0, 5),
  //       )
  //     }
  //   }
  // }, [message])
  return (
    <>
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-1 items-center">
          <SpecificsActionsPopups
            drawerOpenTrue={drawerOpenTrue}
            userObj={userObj}
            message={message}
          />
          <Chip label={`${message.creatorId === userObj?.uid ? (languages === 'ko' ? '내가' : 'My') : messageName} ${languages === 'ko' ? '작성함' : 'registration'}`} />
          {/* <Chips label={`${message.creatorId === userObj?.uid ? '내가' : messageName} 작성함`} onClick={null} className='' /> */}
        </div>
        <div className="flex items-center">
          <Chip
            label={`${languages === 'ko' ? message.item : Object.keys(items).find((key) => items[key] === message.item)} ${message.text.choose === 1 ? (languages === 'ko' ? ' 빌리기' : ' borrowing') : (languages === 'ko' ? ' 빌려주기' : ' lending')}`}
          />
          {/* <Chips label={`${message.item} ${message.text.choose === 1 ? ' 빌리기' : ' 빌려주기'}`} onClick={null} className='' /> */}
        </div>
      </div>
    </>
  )
}

export default SpecificsActions
