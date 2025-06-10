import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dbservice } from 'src/baseApi/serverbase';
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import { useSelectors } from "src/hooks/useSelectors";
import Avatars from "src/pages/core/Avatars";
import Popups from "src/pages/core/Popups";
import { changeProfile } from "src/stateSlices/profileSlice";
import ProfileClose from "./ProfileClose";
import ProfileDialogs from "./profileDialogs/ProfileDialogs";
import ProfileView from "./ProfileView";

const ProfileAvatar = ({ userObj, user, handleProfileDialog, profileDialog, handleClose }) => {
  // const [profile, setProfile] = useState({
  //   profileImage: false,
  //   defaultProfile: '',
  //   profileImageUrl: '',
  //   profileColor: '',
  //   initial: true
  // })
  const profile = useSelectors((state) => state.profile.value)
  console.log(profile)
  const dispatch = useDispatch()
  useEffect(() => {
    const changeUserData = async () => {
      const userRef = doc(dbservice, `members/${userObj.uid}`)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data()
      dispatch(changeProfile({ ...profile, profileImage: userData.profileImage, defaultProfile: userData.defaultProfile, profileImageUrl: userData.profileImageUrl }))
    }
    if (userObj.uid === user.uid) {
      changeUserData()
    }
  })
  const [changedImage, setChangedImage] = useState({
    attachment: '',
    profileCharacter: '',
    color: '',
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
        profileCharacter: '',
        profileImage: user.profileImage,
        defaultProfile: user.defaultProfile,
        profileImageUrl: user.profileImageUrl,
        profileColor: user.profileColor,
        initial: false,
        changed: false
      })
    }
  }, [user])
  // useEffect(() => {
  //   if (!changedImage.defaultProfile) {
  //     setChangedImage({
  //       attachment: '',
  //       character: '',
  //       color: profile.profileColor,
  //       changed: false,
  //       ...profile
  //     })
  //   }
  // }, [])
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  // const changeProfile = (newValue) => setProfile(newValue)
  // console.log(profile)
  console.log(user)
  console.log(changedImage)
  const [profileOrder, setProfileOrder] = useState('animal')
  const changeProfileOrder = (newValue) => {
    setProfileOrder(newValue)
  }

  if (userObj.uid === user.uid) {
    return (
      <Popups
        trigger={<ProfileView userObj={userObj} user={user} />}
        title={'프로필 변경'}
        content={<ProfileDialogs changedImage={changedImage} handleChangedImage={handleChangedImage} />}
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
