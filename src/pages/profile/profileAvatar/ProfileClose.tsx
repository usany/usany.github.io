import Button from '@mui/material/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { dbservice, storage } from 'src/baseApi/serverbase';
// import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from 'src/stateSlices/profileSlice';
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice';

const ProfileClose = ({ userObj, profileDialog, changedImage, handleChangedImage, profileOrder, changeProfileOrder
}) => {
  const profileColor = useSelector(state => state.profileColor.value)
  const profile = useSelector((state) => state.profile.value)
  const dispatch = useDispatch()
  const onClick = async () => {
    const data = doc(dbservice, `members/${userObj.uid}`)
    const attachment = changedImage.attachment
    if (attachment) {
      console.log(attachment)
      dispatch(changeProfileUrl(attachment))
      dispatch(changeProfile({ ...profile, profileImage: true }))
      const storage = getStorage();
      const storageRef = ref(storage, userObj.uid);
      const reference = ref(storage, `${profileOrder}${profileColor}.png`);
      console.log(reference)
      getDownloadURL(storageRef).then((url) => {
        console.log(url)
      })
      if (attachment.slice(0, 5) === 'data:') {
        uploadString(storageRef, attachment, 'data_url').then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
        updateDoc(data, { profileImage: true, profileColor: profileColor });
      } else {
        let defaultProfile
        getDownloadURL(storageRef).then((url) => {
          defaultProfile = url
          console.log(url)
        })
        uploadString(storageRef, 'null', 'raw').then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
        console.log(profileColor)
        updateDoc(data, { profileImage: false, profileColor: profileColor, defaultProfile: defaultProfile });
      }
    } else {
      const storageRef = ref(storage, userObj.uid);
      uploadString(storageRef, 'null', 'raw').then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  }

  return (
    <div>
      {changedImage.changed &&
        <Button variant='outlined' onClick={() => {
          handleChangedImage({ ...changedImage, change: true })
          onClick()
        }}>저장</Button>
      }
    </div>
  )
}

export default ProfileClose
