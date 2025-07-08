import { Chip } from '@mui/material'
import { User } from 'firebase/auth'
import { useSelectors } from 'src/hooks/useSelectors'
import SpecificsActionsPopups from './SpecificsActionsPopups'
const items = {
  Usan: '우산',
  Yangsan: '양산',
}
interface Props {
  userObj: User | null
  message: {}
}

function SpecificsActions({ drawerOpenTrue, userObj, message }: Props) {
  const messageDisplayName = message.displayName
  const languages = useSelectors((state) => state.languages.value)
  let messageName
  if (messageDisplayName.length > 10) {
    messageName = messageDisplayName.slice(0, 10) + '......'
  } else {
    messageName = messageDisplayName
  }
  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-1 items-center">
        <SpecificsActionsPopups
          drawerOpenTrue={drawerOpenTrue}
          userObj={userObj}
          message={message}
        />
        <Chip
          className='specific'
          label={`${message.creatorId === userObj?.uid ? (languages === 'ko' ? '내가' : 'My') : messageName} ${languages === 'ko' ? '작성함' : 'registration'}`}
        />
      </div>
      <div className="flex items-center">
        <Chip
          className='specific'
          label={`${languages === 'ko' ? message.item : Object.keys(items).find((key) => items[key] === message.item)} ${message.text.choose === 1 ? (languages === 'ko' ? ' 빌리기' : ' borrowing') : languages === 'ko' ? ' 빌려주기' : ' lending'}`}
        />
      </div>
    </div>
  )
}

export default SpecificsActions
