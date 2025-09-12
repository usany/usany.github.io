import { useTexts } from 'src/hooks'

const ProfileCompaniesTrigger = ({
  followers,
  alliesCollection,
  usersCollection,
}) => {
  const {follower, following} = useTexts()

  return (
    <div className="p-5" onClick={usersCollection}>
      <div>{followers ? follower : following}</div>
      <div className="flex justify-center">
        {alliesCollection.length}
      </div>
    </div>
  )
}

export default ProfileCompaniesTrigger
