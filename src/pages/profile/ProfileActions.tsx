import ProfileForm from 'src/pages/profile/ProfileForm'
import ProfileConnects from 'src/pages/profile/ProfileConnects'

const ProfileActions = ({
  userObj,
  user,
  alliesCollection,
  handleFollowers,
  handleFollowings,
}) => {

  return (
    <div>
      {userObj.uid === user.uid ? (
        <ProfileForm userObj={userObj} />
      ) : (
        <ProfileConnects
          userObj={userObj}
          user={user}
          alliesCollection={alliesCollection}
          handleFollowers={handleFollowers}
          handleFollowings={handleFollowings}
        />
      )}
    </div>
  )
}

export default ProfileActions
