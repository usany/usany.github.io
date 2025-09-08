// import Avatar from '@mui/material/Avatar';
import Lists from './Lists'

function ProfileLists({
  userObj,
  elements,
  changeProfileDialog,
  changeSelectedUser,
  multiple,
  userSearch,
  ranking,
  handleUser,
}) {
  return (
    <div>
      <Lists
        elements={elements}
        multiple={true}
        userSearch={null}
        ranking={false}
        handleUser={null}
      />
    </div>
  )
}

export default ProfileLists
