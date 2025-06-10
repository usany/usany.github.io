import { useEffect, useState } from "react";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import Avatars from "src/pages/core/Avatars";
import Popups from "src/pages/core/Popups";
import ProfileClose from "./ProfileClose";
import ProfileDialogs from "./profileDialogs/ProfileDialogs";
import ProfileView from "./ProfileView";

const ProfileAvatar = ({ userObj, user, handleProfileDialog, profileDialog, handleClose }) => {
  const [profile, setProfile] = useState({
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true
  })
  const [changedImage, setChangedImage] = useState({
    attachment: '',
    character: '',
    color: '',
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true,
    changed: false
  });
  useEffect(() => {
    if (profile.initial) {
      setProfile({
        profileImage: user.profileImage,
        defaultProfile: user.defaultProfile,
        profileImageUrl: user.profileImageUrl,
        profileColor: user.profileColor,
        initial: false
      })
    }
  }, [user])
  useEffect(() => {
    if (!changedImage.defaultProfile) {
      setChangedImage({
        attachment: '',
        character: '',
        color: profile.profileColor,
        changed: false,
        ...profile
      })
    }
  }, [user])
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  const changeProfile = (newValue) => setProfile(newValue)
  console.log(user)
  useEffect(() => {
    if (profile.initial) {
      setProfile({ initial: false, profileImage: user.profileImage, defaultProfile: user.defaultProfile, profileImageUrl: user.profileImageUrl, profileColor: user.profileColor || 'profileGold' })
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
