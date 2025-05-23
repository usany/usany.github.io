import { useState } from "react";
import { Link } from "react-router-dom";
import { DialogClose } from "src/components/ui/dialog";
import { DrawerClose } from "src/components/ui/drawer";
import useLargeMedia from "src/hooks/useLargeMedia";
// import Avatar from '@mui/material/Avatar';
import Lists from "./Lists";
import ProfileListsView from "./ProfileListsView";

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
  let point;
  let samePointIndex;
  const [newRanking, setNewRanking] = useState(0);
  const largeMedia = useLargeMedia()

  return (
    <div>
      <Lists userObj={null} elements={elements} multiple={true} userSearch={null} ranking={false} handleUser={null} />
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
    </div >
  );
}

export default ProfileLists;
