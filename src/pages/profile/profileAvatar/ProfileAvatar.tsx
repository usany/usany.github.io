import { useEffect, useState } from "react";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import { useSelectors } from "src/hooks/useSelectors";
import Avatars from "src/pages/core/Avatars";
import Popups from "src/pages/core/Popups";
import useTexts from "src/useTexts";
import ProfileClose from "./ProfileClose";
import ProfileDialogs from "./profileDialogs/ProfileDialogs";
import ProfileView from "./ProfileView";

const ProfileAvatar = ({ userObj, user }) => {
  const profile = useSelectors((state) => state.profile.value)
  const { changeProfile } = useTexts()
  const [attachment, setAttachment] = useState(null)
  const changeAttachment = (newValue) => setAttachment(newValue)
  const [changedImage, setChangedImage] = useState({
    attachment: false,
    profileCharacter: '',
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true,
    changed: false
  });
  useEffect(() => {
    if (changedImage.initial) {
      setChangedImage({
        attachment: false,
        profileCharacter: '',
        profileImage: profile?.profileImage,
        defaultProfile: profile?.defaultProfile,
        profileImageUrl: profile?.profileImageUrl,
        profileColor: profile?.profileColor,
        initial: false,
        changed: false
      })
    }
  }, [user])
  useEffect(() => {
    if (attachment && !changedImage.attachment) {
      setChangedImage({
        ...changedImage, attachment: true, profileImage: true, profileImageUrl: attachment, changed: true
      })
    }
  }, [attachment])
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  // const [profileOrder, setProfileOrder] = useState('animal')
  // const changeProfileOrder = (newValue) => {
  //   setProfileOrder(newValue)
  // }
  console.log(profile)
  if (userObj.uid === user.uid) {
    return (
      <Popups
        trigger={<ProfileView userObj={userObj} user={user} changeAttachment={changeAttachment} changedImage={changedImage} handleChangedImage={handleChangedImage} />}
        title={changeProfile}
        content={<ProfileDialogs attachment={attachment} changeAttachment={changeAttachment} changedImage={changedImage} handleChangedImage={handleChangedImage} />}
        close={<ProfileClose userObj={userObj} changedImage={changedImage} handleChangedImage={handleChangedImage} attachment={attachment} />}
        attachment={changedImage}
      />
    )
  } else {
    return (
      <div className='flex justify-center'>
        {user?.profileImageUrl ? (
          <Avatars
            element={{ ...user, profileImage: user.profileImage ? user.profileImage : user.profileImage !== false ? true : user.profileImage, defaultProfile: user.defaultProfile, profileImageUrl: user.profileImageUrl }}
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
