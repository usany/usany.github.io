import { useEffect, useState } from "react";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import Avatars from "src/pages/core/Avatars";
import Popups from "src/pages/core/Popups";
import ProfileClose from "./ProfileClose";
import ProfileDialogs from "./profileDialogs/ProfileDialogs";
import ProfileView from "./ProfileView";

const ProfileAvatar = ({ userObj, user, handleProfileDialog, profileDialog, changedImage, handleChangedImage, handleClose }) => {
  const [profile, setProfile] = useState({
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    initial: true
  })
  const changeProfile = (newValue) => setProfile(newValue)
  useEffect(() => {
    if (profile.initial) {
      setProfile({ initial: false, profileImage: user.profileImage, defaultProfile: user.defaultProfile, profileImageUrl: user.profileImageUrl })
    }
  }, [])
  const [profileOrder, setProfileOrder] = useState('animal')
  const changeProfileOrder = (newValue) => {
    setProfileOrder(newValue)
  }
  // console.log(user?.profileImageUrl)
  // console.log(userObj.uid)
  // console.log(user.uid)
  if (userObj.uid === user.uid) {
    return (
      <Popups
        trigger={<ProfileView userObj={userObj} user={user} />}
        title={'프로필 변경'}
        content={<ProfileDialogs changedImage={changedImage} handleChangedImage={handleChangedImage} profile={profile} changeProfile={changeProfile} />}
        close={<ProfileClose userObj={userObj} changedImage={changedImage} handleChangedImage={handleChangedImage} profileOrder={profileOrder} changeProfileOrder={changeProfileOrder} />}
        attachment={changedImage}
      />
    )
  } else {
    return (
      <div className='flex justify-center'>
        {user?.profileImageUrl ? (
          <Avatars
            element={user}
            piazza={null}
            profile={true}
          />
        ) : (
          <LoadingsSkeletons height={"[192px]"} width={"[192px]"} />
        )}
      </div>
    )
  }
};

export default ProfileAvatar;
