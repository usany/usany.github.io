import { useSelectors, useTexts } from 'src/hooks'
import { useLocation } from 'react-router-dom'

const ProfileCompaniesTitle = ({
  isFollowers,
}) => {
  const profile = useSelectors((state) => state.profile.value)
  const { follower, following } = useTexts()
  const { state } = useLocation()

  return (
    <div className="flex justify-center">
      {isFollowers ? follower : following}
    </div>
  )
}

export default ProfileCompaniesTitle
