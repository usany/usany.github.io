import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Chip } from '@mui/material'
import { User } from 'firebase/auth'
import staticImage from 'src/assets/blue.png'
import { useSelectors } from 'src/hooks'
import Avatars from 'src/pages/core/Avatars'

const ChatsBoxesChips = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  return (
    <div>
      {message?.piazzaChecked &&
        message?.piazzaChecked.indexOf(profile?.uid) === -1 && (
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

export default ChatsBoxesChips
