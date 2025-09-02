import ProfileForm from 'src/pages/profile/ProfileForm'
import ProfileConnects from 'src/pages/profile/ProfileConnects'
import { useSelectors } from 'src/hooks/useSelectors'

const ProfileActions = ({ user, alliesCollection, handleFollowers }) => {
  const profile = useSelectors((state) => state.profile.value)

  return (
    <div>
      {profile?.uid === user.uid ? (
        <ProfileForm />
      ) : (
        <ProfileConnects
          user={user}
          alliesCollection={alliesCollection}
          handleFollowers={handleFollowers}
        />
      )}
    </div>
  )
}

export default ProfileActions
