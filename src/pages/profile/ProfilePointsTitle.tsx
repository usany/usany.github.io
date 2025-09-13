import { useLocation } from 'react-router-dom'
import { useSelectors, useTexts } from 'src/hooks'

const ProfilePointsTitle = () => {
  const { pointReceipt } = useTexts()
  return (
    <div className="flex justify-center">{`${pointReceipt}`}</div>
  )
}

export default ProfilePointsTitle
