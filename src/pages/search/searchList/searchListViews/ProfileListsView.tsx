import { Chip } from "@mui/material";
import Divider from "@mui/material/Divider";
// import Avatar from '@mui/material/Avatar';
import Avatars from "src/pages/core/Avatars";
import Lists from "./Lists";

function ProfileListsView({
  element,
  displayName,
  changeSelectedUser,
}) {
  return (
    <div
      className="px-5"
    >
      <Lists userObj={null} elements={element} multiple={true} userSearch={userSearch} ranking={false} handleUser={(newValue) => changeViolationUser(newValue)} />
      <div
        className={`flex w-full justify-between p-3 rounded`}
        onClick={() => {
          changeSelectedUser(element)
        }}
      >
        <div className="flex gap-5">
          <Avatars element={element} uid={element.uid} piazza={null} profile={false} profileColor={''} profileUrl={element?.profileImageUrl} />
          <div className="flex flex-col justify-center overflow-hidden px-5 w-40">
            <div className="overflow-hidden">{displayName}</div>
          </div>
        </div>
        <div className='flex items-center'>
          {element.locationConfirmed ?
            <Chip label={'캠퍼스 위치 확인'} /> : <Chip label={'캠퍼스 위치 미확인'} />
            // <Chips label={'캠퍼스 위치 확인'} className='bg-profile-green' /> : <Chips label={'캠퍼스 위치 미확인'} className='bg-white dark:bg-dark-4' />
          }
        </div>
      </div>
      <Divider />
    </div>
  );
}


export default ProfileListsView;
