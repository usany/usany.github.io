import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DocumentData } from 'firebase/firestore'
import static05 from 'src/assets/gold1.png'

interface Props {
  element: DocumentData | undefined
  profile: boolean
  profileColor: string
  profileUrl: string
  defaultProfileUrl: string
  piazza: () => void
}

const Avatars = ({ element, profile, piazza }: Props) => {
  // const profileImageArray = [
  //   static01,
  //   static02,
  //   static03,
  //   static04,
  //   static05,
  //   static06,
  //   statics,
  // ]
  const profileImage = element?.profileImage
  let defaultProfile
  if (element?.defaultProfile) {
    defaultProfile = element?.defaultProfile
  } else {
    defaultProfile = static05
  }
  console.log(element?.profileImageUrl)
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
