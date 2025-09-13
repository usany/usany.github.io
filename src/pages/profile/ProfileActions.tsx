import ProfileForm from 'src/pages/profile/ProfileForm'
import ProfileConnects from 'src/pages/profile/ProfileConnects'

const ProfileActions = ({ alliesCollection, handleFollowers }) => {

  return (
    <div>
      {profile?.uid === user.uid ? (
        <ProfileForm />
      ) : (
        <ProfileConnects
          alliesCollection={alliesCollection}
          handleFollowers={handleFollowers}
        />
      )}
    </div>
  )
}

export default ProfileActions
