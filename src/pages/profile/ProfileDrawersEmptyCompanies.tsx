import useTexts from 'src/useTexts'

const ProfileDrawersEmptyCompanies = ({
  user,
  followers,
  alliesCollection,
}) => {
  const { noFollowers, noFollowings } = useTexts()
  return (
    <div className="flex justify-center">
      <div className="rounded shadow-md bg-light-1 dark:bg-dark-1 p-5">
        {followers ? noFollowers : noFollowings}
      </div>
    </div>
  )
}

export default ProfileDrawersEmptyCompanies
