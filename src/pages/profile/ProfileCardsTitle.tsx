import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'

interface Props {
  isFollowers?: boolean | null;
}

const ProfileCardsTitle = ({ isFollowers = null }: Props) => {
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  const { pointReceipt, follower, following } = useTexts()

  return (
    <div className="flex flex-col items-center">
      <div>{user.displayName}</div>
      <div>{isFollowers === null ? pointReceipt : (isFollowers ? follower : following)}</div>
    </div>
  )
}

export default ProfileCardsTitle
