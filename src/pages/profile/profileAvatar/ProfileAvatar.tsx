import BeachAccess from "@mui/icons-material/BeachAccess";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import Avatars from "src/pages/core/Avatars";

const ProfileAvatar = ({ userObj, user, handleProfileDialog }) => {
  const profileColor = useSelector((state) => state.profileColor.value);
  const profileImage = useSelector((state) => state.profileImage.value);
  const profileUrl = useSelector((state) => state.profileUrl.value);
  console.log(user?.profileImageUrl);
  return (
    <div className="flex justify-center">
      {user.uid === userObj.uid ? (
        <Badge
          // overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <button
              className="p-1 bg-transparent border-dashed border-2"
              onClick={handleProfileDialog}
            >
              <BeachAccess />
            </button>
          }
        >
          {profileUrl ? (
            <Avatars
              uid={userObj.uid}
              profile={true}
              profileColor={profileColor}
              profileUrl={profileUrl}
            // profileImage={profileImage}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
          {/* <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }} src={profileImage} variant='rounded' /> */}
        </Badge>
      ) : (
        //   {profileImage === 'null' &&
        //     <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }} src={'./src'} variant='rounded' />
        //   }
        //   {profileImage && profileImage !== 'null' &&
        //     <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }} src={profileImage} variant='rounded' />
        //   }
        //   {!profileImage &&
        //     <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: profileColor || '#2196f3' }}
        //     src={'./src'}
        //     variant='rounded' />
        //   }
        // <div>
        //   {profileImage &&
        //   }
        // </div>
        <>
          {user?.profileImageUrl ? (
            <Avatars
              uid={userObj.uid}
              profile={true}
              profileColor={user.profileColor}
              profileImage={user?.profileImageUrl}
            />
          ) : (
            <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
          )}
          {/* <Avatar alt={user.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: user?.profileColor || '#2196f3' }} src={user?.profileImageUrl} variant='rounded'/> */}
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;
