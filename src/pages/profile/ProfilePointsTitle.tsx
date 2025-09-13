import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'

const ProfilePointsTitle = () => {
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const { pointReceipt } = useTexts()
  return (
    <div className="flex justify-center">{`${pointReceipt}`}</div>
  )
}

export default ProfilePointsTitle
