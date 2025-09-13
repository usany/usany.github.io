import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'

const ProfileCardsTitle = ({isFollowers}) => {
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  const { pointReceipt, follower, following } = useTexts()
  
  if (isFollowers === null) return (
    <div className="flex flex-col items-center">
      <div>{user.displayName}</div>
      <div>{pointReceipt}</div>
    </div>
    )
  return (
    <div className="flex flex-col items-center">
      <div>{user.displayName}</div>
      <div>{isFollowers ? follower : following}</div>
    </div>
  )
}

export default ProfileCardsTitle
