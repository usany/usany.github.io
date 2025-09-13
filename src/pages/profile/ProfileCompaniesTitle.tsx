import { useSelectors, useTexts } from 'src/hooks'
import { useLocation } from 'react-router-dom'

const ProfileCompaniesTitle = ({
  followers,
}) => {
  const profile = useSelectors((state) => state.profile.value)
  const { follower, following } = useTexts()
  const { state } = useLocation()
  const user = state?.element || profile

  return (
    <div className="flex justify-center">
      {user.displayName} {followers ? follower : following}
    </div>
  )
}

export default ProfileCompaniesTitle
