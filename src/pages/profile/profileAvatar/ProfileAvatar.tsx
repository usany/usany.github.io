import { useEffect, useState } from "react";
import LoadingsSkeletons from "src/components/recycle/recycleLoadingsSkeletons";
import { useSelectors } from "src/hooks/useSelectors";
import Avatars from "src/pages/core/Avatars";
import Popups from "src/pages/core/Popups";
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
  const [initialProfile, setInitialProfile] = useState(true)
  const profile = useSelectors((state) => state.profile.value)
  // console.log(profile)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   const changeUserData = async () => {
  //     const userRef = doc(dbservice, `members/${userObj.uid}`)
  //     const userDoc = await getDoc(userRef)
  //     const userData = userDoc.data()
  //     dispatch(changeProfile({ ...profile, profileImage: userData.profileImage, defaultProfile: userData.defaultProfile, profileImageUrl: userData.profileImageUrl }))
  //   }
  //   if (userObj.uid === user.uid && initialProfile) {
  //     changeUserData()
  //     setInitialProfile(false)
  //   }
  // })
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
        profileImage: profile.profileImage,
        defaultProfile: profile.defaultProfile,
        profileImageUrl: profile.profileImageUrl,
        profileColor: profile.profileColor,
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
  // console.log(user)
  // console.log(changedImage)
  const [profileOrder, setProfileOrder] = useState('animal')
  const changeProfileOrder = (newValue) => {
    setProfileOrder(newValue)
  }

  if (userObj.uid === user.uid) {
    return (
      <Popups
        trigger={<ProfileView userObj={userObj} user={user} changeAttachment={changeAttachment} changedImage={changedImage} handleChangedImage={handleChangedImage} />}
        title={'프로필 변경'}
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
