import useTexts from 'src/useTexts'

const ProfileCompaniesTitle = ({
  user,
  cards,
  followers,
  alliesCollection,
  selection,
}) => {
  const { follower, following } = useTexts()
  return (
    <div className="flex justify-center">
      {user.displayName} {followers ? follower : following}
    </div>
  )
}

export default ProfileCompaniesTitle
