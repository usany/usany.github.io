import Button from '@mui/material/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
// import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileColor } from 'src/stateSlices/profileColorSlice';
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice';

const ProfileClose = ({ userObj, profileDialog, attachment, changeAttachment, handleClose }) => {
  const [selectedColor, setSelectedColor] = useState('')
  const [attachmentFile, setAttachmentFile] = useState('null')
  const [onClear, setOnClear] = useState(false)
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
  const dispatch = useDispatch()
  const onClick = async () => {
    const data = doc(dbservice, `members/${userObj.uid}`)
    if (selectedColor) {
      updateDoc(data, { profileColor: selectedColor });
      dispatch(changeProfileColor(selectedColor))
    }
    // getDownloadURL(ref(storage, `${userObj.uid}`))
    // .then((url) => {
    //     const docRef = doc(dbservice, `members/${userObj?.uid}`)
    //     updateDoc(docRef, {profileImageUrl: url});
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
    if (attachmentFile && !onClear) {
      const storageRef = ref(storage, userObj.uid);
      uploadString(storageRef, attachmentFile, 'data_url').then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      const docRef = doc(dbservice, `members/${userObj?.uid}`)
      updateDoc(docRef, { profileImage: attachmentFile });
      dispatch(changeProfileUrl(attachmentFile))
    } else if (onClear) {
      dispatch(changeProfileUrl('null'))
      setOnClear(false)
      const storageRef = ref(storage, userObj.uid);
      uploadString(storageRef, 'null', 'raw').then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      // deleteObject(storageRef).then(() => {
      // }).catch((error) => {
      // });

      const docRef = doc(dbservice, `members/${userObj?.uid}`)
      updateDoc(docRef, { profileImage: attachmentFile });
    }
  }
  useEffect(() => {
    if (!selectedColor) {
      setSelectedColor(profileColor)
    }
  }, [])
  useEffect(() => {
    setAttachmentFile(profileUrl)
  }, [profileUrl])

  return (
    <div>
      {attachment &&
        <Button variant='outlined' onClick={() => {
          handleClose()
          changeAttachment('')
          onClick()
          dispatch(changeProfileColor(selectedColor))
        }}>저장</Button>
      }
      {/* :
      <Button variant='outlined' onClick={() => {
        handleClose()
        changeAttachment(attachmentFile)
        onClick()
        dispatch(changeProfileColor(selectedColor))
      }} disabled>저장</Button> */}
      {/* <Button variant='outlined' onClick={() => {
          handleClose()
          if (onClear) {
            setAttachmentFile(profileImage)
          }
          setOnClear(false)
          setSelectedColor(profileColor)
        }} autoFocus>
          닫기
        </Button> */}
    </div>
  )
}

export default ProfileClose
