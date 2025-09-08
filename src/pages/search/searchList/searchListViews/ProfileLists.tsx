// import Avatar from '@mui/material/Avatar';
import Lists from './Lists'

function ProfileLists({ userObj, elements }) {
  return (
    <div>
      <Lists
        elements={elements}
        multiple={true}
        userSearch={null}
        ranking={false}
        handleUser={null}
      />
      {/* {elements.map((element, index) => {
        const userNameConfirm = true;
        if (userNameConfirm) {
          let displayName;
          if (element.displayName.length > 10) {
            displayName = element.displayName.slice(0, 10) + "......";
          } else {
            displayName = element.displayName.slice(0, 10) + "......";
          }
          if (largeMedia) {
            return (
              <Link
                to={'/profile'}
                state={{ element: element }}
              >
                <DialogClose>
                  <ProfileListsView element={element} displayName={displayName} changeSelectedUser={changeSelectedUser} />
                </DialogClose>
              </Link>
            )
          }
          return (
            <Link
              to={'/profile'}
              state={{ element: element }}
            >
              <DrawerClose>
                <ProfileListsView element={element} displayName={displayName} changeSelectedUser={changeSelectedUser} />
              </DrawerClose>
            </Link>
          );
        }
      })} */}
    </div>
  )
}

export default ProfileLists
