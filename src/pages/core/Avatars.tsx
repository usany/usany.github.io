import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DocumentData } from 'firebase/firestore'

interface Props {
  element: DocumentData | undefined
  profile: boolean
  piazza: () => void
}

const Avatars = ({ element, profile, piazza }: Props) => {
  const profileImage = element?.profileImage
  let defaultProfile
  if (element?.defaultProfile) {
    defaultProfile = element?.defaultProfile
  } else {
    defaultProfile = static05
  }
  console.log(profile)
  return (
    <div>
      {profile ? (
        <Avatar className="w-48 h-48">
          <AvatarImage
            src={profileImage ? element.profileImageUrl : defaultProfile}
          />
          <AvatarFallback className="border border-none bg-light-1 dark:bg-dark-1"></AvatarFallback>
        </Avatar>
      ) : (
        <Avatar onClick={piazza}>
          <AvatarImage
            src={profileImage ? element.profileImageUrl : defaultProfile}
          />
          <AvatarFallback className="border border-none bg-light-1 dark:bg-dark-1"></AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export default Avatars
