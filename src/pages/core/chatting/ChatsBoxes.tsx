import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Chip } from '@mui/material'
import { User } from 'firebase/auth'
import staticImage from 'src/assets/blue.png'
import { useSelectors } from 'src/hooks/useSelectors'
import Avatars from 'src/pages/core/Avatars'
const ChatsBoxesRoom = ({ displayName, multiple }) => {
  const languages = useSelectors((state) => state.languages.value)
  let displayingUserName
  if (displayName.length > 6) {
    displayingUserName = displayName.slice(0, 5) + '......'
  } else {
    displayingUserName = displayName
  }
  return (
    <div className="truncate w-1/2 px-3 overflow-hidden">
      {multiple
        ? `${languages === 'ko' ? '단체 대화' : 'Group Messaging'}`
        : displayingUserName}
    </div>
  )
}
const ChatsBoxesClock = ({ clockValue }) => {
  return (
    <>
      {clockValue.length > 10 && (
        <div className="flex flex-col px-3">
          <div className="truncate flex justify-end">{clockValue}</div>
        </div>
      )}</>
  )
}
const ChatsBoxesChips = ({ userObj, message }) => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div>
      {message?.piazzaChecked &&
        message?.piazzaChecked.indexOf(userObj.uid) === -1 && (
          <Chip
            sx={{ height: '20px' }}
            label={`${languages === 'ko' ? '새 대화' : 'New Chats'}`}
            color="primary"
          />
        )}
      {message?.messageCount > 0 && (
        <Chip
          sx={{ height: '20px' }}
          label={message.messageCount}
          color="primary"
        />
      )}
    </div>
  )
}
interface Props {
  chattingUid: string
  userObj: User
  profileUrl: string
  displayName: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[]
    messageCount: number
  }
}

const ChatsBoxes = ({
  chattingUid,
  userObj,
  displayName,
  multiple,
  clock,
  message,
}: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = clock.getDate().toString()
  if (messageHours >= 13) {
    messageAmpm = '오후'
    if (messageHours !== 12) {
      messageHours = messageHours - 12
    }
  } else {
    messageAmpm = '오전'
    if (messageHours === 0) {
      messageHours = messageHours + 12
    }
  }
  if (clock.getMonth() + 1 < 10) {
    messageMonth = '0' + messageMonth
  }
  if (messageDate.length === 1) {
    messageDate = '0' + messageDate
  }
  const clockValue =
    clock.getFullYear().toString() +
    '-' +
    messageMonth +
    '-' +
    messageDate +
    ' ' +
    (languages === 'ko' ? messageAmpm : '') +
    ' ' +
    messageHours +
    ':' +
    (clock.getMinutes() < 10 ? '0' : '') +
    clock.getMinutes() +
    (languages === 'en' ? (messageAmpm === '오전' ? 'am' : 'pm') : '')
  let messageProfileImage
  let messageProfileImageUrl
  let messageDefaultProfile
  let passingValue
  if (!multiple) {
    if (userObj.uid !== message.userOne) {
      messageProfileImage = message.userOneProfileImage
      messageProfileImageUrl = message.userOneProfileUrl
      messageDefaultProfile = message.userOneDefaultProfile
        ? message.userOneDefaultProfile
        : message.userOneProfileUrl
    } else {
      messageProfileImage = message.userTwoProfileImage
      messageProfileImageUrl = message.userTwoProfileUrl
      messageDefaultProfile = message.userTwoDefaultProfile
        ? message.userTwoDefaultProfile
        : message.userTwoProfileUrl
    }
    passingValue = {
      profileImage: messageProfileImage,
      profileImageUrl: messageProfileImageUrl,
      defaultProfile: messageDefaultProfile,
    }
  }
  return (
    <div className="flex p-3">
      {multiple ? (
        <Avatar>
          <AvatarImage src={staticImage} />
        </Avatar>
      ) : (
        <Avatars
          element={passingValue}
          uid={chattingUid}
          profile={false}
          profileColor={''}
          profileUrl={message}
        />
      )}
      <div className="flex flex-col w-screen">
        <div className="flex justify-between">
          <ChatsBoxesRoom displayName={displayName} multiple={multiple} />
          <ChatsBoxesClock clockValue={clockValue} />
        </div>
        <div className="flex justify-between px-3">
          <div>{message?.message}</div>
          <ChatsBoxesChips userObj={userObj} message={message} />
        </div>
      </div>
    </div>
  )
}

export default ChatsBoxes
