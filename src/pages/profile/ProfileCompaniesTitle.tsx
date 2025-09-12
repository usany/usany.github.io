import { useTexts } from 'src/hooks'

const ProfileCompaniesTitle = ({
  user,
  followers,
}) => {
  const { follower, following } = useTexts()
  return (
    <div className="flex justify-center">
      {user.displayName} {followers ? follower : following}
    </div>
  )
}

export default ProfileCompaniesTitle
