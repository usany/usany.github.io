import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'

const ProfilePointsTitle = () => {
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  const { pointReceipt } = useTexts()
  return (
    <div className="flex justify-center">{`${user.displayName} ${pointReceipt}`}</div>
  )
}

export default ProfilePointsTitle
