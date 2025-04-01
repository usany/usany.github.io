import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
// import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import staticBlue01 from "src/assets/blue01.png";
import staticBlue02 from "src/assets/blue02.png";
import staticGold01 from "src/assets/gold1.png";
import staticGold02 from "src/assets/gold2.png";
import staticRed01 from "src/assets/red1.png";
import staticRed02 from "src/assets/red2.png";
import Avatars from 'src/pages/core/Avatars';
import { changeProfileColor } from 'src/stateSlices/profileColorSlice';
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice';

const images = {
  'profile-red': [staticRed01, staticRed02],
  '#2196f3': [staticBlue01, staticBlue02],
  'profile-amber': [staticGold01, staticGold02],
  'profile-red': [staticRed01, staticRed02],
  'profile-blue': [staticBlue01, staticBlue02],
  'profile-amber': [staticGold01, staticGold02],
  gold: [staticGold01, staticGold02],
}
const ProfileDialogs = ({ userObj, profileDialog, attachment, changeAttachment, handleClose }) => {
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
  const switchColor = (newColor) => {
    setSelectedColor(newColor)
  }
  useEffect(() => {
    if (!selectedColor) {
      setSelectedColor(profileColor)
    }
  }, [])
  useEffect(() => {
    setAttachmentFile(profileUrl)
  }, [profileUrl])

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachmentFile(result)
    }
    reader.readAsDataURL(theFile)
    setOnClear(false)
  }
  const onClearAttachment = () => {
    setAttachmentFile('null')
    changeAttachment('null')
    setOnClear(true)
    const fileInput = document.getElementById('file') || { value: null }
    fileInput.value = null
  }
  console.log(attachmentFile)
  console.log(attachment)
  console.log(selectedColor)
  return (
    <>
      <>
        <div className='flex justify-center p-5'>
          <Avatars uid={userObj.uid} profile={true} profileColor={selectedColor} profileUrl={attachmentFile} piazza={null} />
          {/* <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: selectedColor }} src={attachmentFile || './src'} onClick={() => {
                    }} variant='rounded' /> */}
          <div className='flex-col px-5 content-center'>
            <label htmlFor='file'>내 파일 업로드</label>
            <input id='file' type='file' onChange={onFileChange} hidden />
            {attachment && <div className='flex justify-center pt-5'>
              <button className='factoryClear' onClick={onClearAttachment}>업로드 파일 삭제</button>
            </div>}
          </div>
          {/* {attachmentFile && attachmentFile !== 'null' &&
                        } */}
        </div>
      </>
      <div className='flex justify-center gap-5'>
        <Avatars uid='' profile={false} profileColor={selectedColor} profileUrl={images[selectedColor || 'gold'][0]} piazza={null} />
        <Avatars uid='' profile={false} profileColor={selectedColor} profileUrl={images[selectedColor || 'gold'][1]} piazza={null} />
      </div>
      <div className='flex px-5'>색깔을 선택하면 배경에 반영됩니다.&emsp;</div>
      <div className='flex p-5'>
        <div className='w-10 bg-profile-red' onClick={() => switchColor('profile-red')}>&emsp;</div>
        {/* <div className='w-10 bg-profile-pink' onClick={() => switchColor('profile-pink')}>&emsp;</div>
        <div className='w-10 bg-profile-purple' onClick={() => switchColor('profile-purple')}>&emsp;</div>
        <div className='w-10 bg-profile-deeppurple' onClick={() => switchColor('profile-deeppurple')}>&emsp;</div>
        <div className='w-10 bg-profile-indigo' onClick={() => switchColor('profile-indigo')}>&emsp;</div> */}
        <div className='w-10 bg-profile-blue' onClick={() => switchColor('profile-blue')}>&emsp;</div>
        {/* <div className='w-10 bg-profile-lightblue' onClick={() => switchColor('profile-lightblue')}>&emsp;</div>
        <div className='w-10 bg-profile-cyan' onClick={() => switchColor('profile-cyan')}>&emsp;</div>
        <div className='w-10 bg-profile-teal' onClick={() => switchColor('profile-teal')}>&emsp;</div>
        <div className='w-10 bg-profile-green' onClick={() => switchColor('profile-green')}>&emsp;</div>
        <div className='w-10 bg-profile-lightgreen' onClick={() => switchColor('profile-lightgreen')}>&emsp;</div>
        <div className='w-10 bg-profile-lime' onClick={() => switchColor('profile-lime')}>&emsp;</div>
        <div className='w-10 bg-profile-yellow' onClick={() => switchColor('profile-yellow')}>&emsp;</div> */}
        <div className='w-10 bg-profile-amber' onClick={() => switchColor('profile-amber')}>&emsp;</div>
        {/* <div className='w-10 bg-profile-orange' onClick={() => switchColor('profile-orange')}>&emsp;</div>
        <div className='w-10 bg-profile-deeporange' onClick={() => switchColor('profile-deeporange')}>&emsp;</div> */}
      </div>
      {!attachment &&
        <div className='flex justify-center p-5'>
          <Button variant='outlined' onClick={() => {
            handleClose()
            changeAttachment(attachmentFile)
            onClick()
            dispatch(changeProfileColor(selectedColor))
          }} disabled>저장</Button>
        </div>
      }
    </>
  )
}

export default ProfileDialogs
