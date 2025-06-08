import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
// import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { Button } from '@mui/material';
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import staticBlue01 from "src/assets/blue02.png";
import staticBlue02 from "src/assets/blue03.png";
import staticGold01 from "src/assets/gold1.png";
import staticGold02 from "src/assets/gold2.png";
import staticRed01 from "src/assets/red1.png";
import staticRed02 from "src/assets/red2.png";
import Avatars from 'src/pages/core/Avatars';
import { changeProfileColor } from 'src/stateSlices/profileColorSlice';
import { changeProfileImage } from 'src/stateSlices/profileImageSlice';
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice';

const images = {
  'profile-red': [staticRed01, staticRed02],
  '#2196f3': [staticBlue01, staticBlue02],
  'profile-amber': [staticGold01, staticGold02],
  'profileRed': [staticRed01, staticRed02],
  'profileBlue': [staticBlue01, staticBlue02],
  'profileGold': [staticGold01, staticGold02],
  gold: [staticGold01, staticGold02],
}
const ProfileDialogs = ({ userObj, user, profileDialog, attachment, changeAttachment, handleClose }) => {
  // const [selectedColor, setSelectedColor] = useState('')
  const [attachmentFile, setAttachmentFile] = useState('null')
  const [onClear, setOnClear] = useState(false)
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    if (!profile) {
      setProfile(user)
    } else {
      setProfile({
        profileImage: true,
        profileImageUrl: profileUrl
      })
    }
  }, [attachmentFile])
  const onClick = async () => {
    const data = doc(dbservice, `members/${userObj.uid}`)
    // if (selectedColor) {
    //   updateDoc(data, { profileColor: selectedColor });
    //   dispatch(changeProfileColor(selectedColor))
    // }
    // getDownloadURL(ref(storage, `${userObj.uid}`))
    // .then((url) => {
    //     const docRef = doc(dbservice, `members/${userObj?.uid}`)
    //     updateDoc(docRef, {profileImageUrl: url});
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
    if (attachment && !onClear) {
      const storageRef = ref(storage, userObj.uid);
      uploadString(storageRef, attachment, 'data_url').then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      const docRef = doc(dbservice, `members/${userObj?.uid}`)
      updateDoc(docRef, { profileImage: true });
      dispatch(changeProfileUrl(attachment))
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
      // updateDoc(docRef, { profileImage: attachmentFile });
    }
  }
  const switchColor = (newColor) => {
    // setSelectedColor(newColor)
    dispatch(changeProfileColor(newColor))
  }
  // useEffect(() => {
  //   if (!selectedColor) {
  //     setSelectedColor(profileColor)
  //   }
  // }, [])
  useEffect(() => {
    setAttachmentFile(profileUrl)
  }, [profileUrl])

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files)
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      // setAttachmentFile(result)
      changeAttachment(result)
    }
    reader.readAsDataURL(theFile)
    setOnClear(false)
  }
  const onClearAttachment = () => {
    // setAttachmentFile('null')
    changeAttachment('null')
    setOnClear(true)
    const fileInput = document.getElementById('file') || { value: null }
    fileInput.value = null
  }
  const selectedImages = images[profileColor] || images['gold']
  console.log(attachmentFile)
  console.log(attachment)
  console.log(profileColor)
  return (
    <>
      <>
        <div className='flex flex-col items-center gap-5 p-5'>
          {attachment ?
            <Avatars
              element={{ profileImage: true, profileImageUrl: attachment }}
              piazza={null}
              profile={true}
            />
            :
            <Avatars
              element={profile}
              piazza={null}
              profile={true}
            />
          }
          {/* <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: selectedColor }} src={attachmentFile || './src'} onClick={() => {
                    }} variant='rounded' /> */}
          <div className='flex-col px-5 content-center p-5'>
            <label htmlFor='file' className='p-5 rounded border border-dashed'>내 파일 업로드</label>
            <input id='file' type='file' onChange={onFileChange} hidden />
            {/* {attachment && <div className='flex justify-center pt-5'>
              <button className='factoryClear' onClick={onClearAttachment}>업로드 파일 삭제</button>
            </div>} */}
          </div>
          {/* {attachmentFile && attachmentFile !== 'null' &&
                        } */}
        </div>
      </>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-center'>캐릭터 배경으로 저장하면 업로드 파일이 삭제됩니다.</div>
        <div className='flex justify-center gap-5'>
          {selectedImages.map((value, index) => {
            return (
              <div onClick={() => {
                // const file = document.getElementById('file')
                // console.log(file)
                // console.log(event.target.src)
                // console.log(value)
                // const blob = new Blob(value)
                // const {
                //   target: { files },
                // } = event;
                // console.log(event)
                // const theFile = files[0];
                // const reader = new FileReader();
                // reader.onloadend = (finishedEvent) => {
                //   console.log(finishedEvent);
                //   const {
                //     currentTarget: { result },
                //   } = finishedEvent;
                //   setAttachmentFile(result)
                //   changeAttachment(result)
                // }
                // reader.readAsDataURL(blob)
                // setOnClear(false)
                dispatch(changeProfileImage(index ? 'plant' : 'animal'))
                changeAttachment(value)
              }}>
                <Avatars element={{ profileImage: true, defaultProfile: value, profileImageUrl: value }} uid='' profile={false} profileColor={''} profileUrl={value} piazza={null} />
              </div>
            )
          })}
        </div>
        <div className='flex justify-center h-5'>
          <div className='flex justify-center rounded-xl w-10 bg-profile-red' onClick={() => switchColor('profileRed')}>{profileColor === 'profileRed' &&
            <Check />}</div>
          {/* <div className='w-10 bg-profile-pink' onClick={() => switchColor('profile-pink')}>&emsp;</div>
        <div className='w-10 bg-profile-purple' onClick={() => switchColor('profile-purple')}>&emsp;</div>
        <div className='w-10 bg-profile-deeppurple' onClick={() => switchColor('profile-deeppurple')}>&emsp;</div>
        <div className='w-10 bg-profile-indigo' onClick={() => switchColor('profile-indigo')}>&emsp;</div> */}
          <div className='flex justify-center rounded-xl w-10 bg-profile-blue' onClick={() => switchColor('profileBlue')}>{profileColor === 'profileBlue' &&
            <Check />}</div>
          {/* <div className='w-10 bg-profile-lightblue' onClick={() => switchColor('profile-lightblue')}>&emsp;</div>
        <div className='w-10 bg-profile-cyan' onClick={() => switchColor('profile-cyan')}>&emsp;</div>
        <div className='w-10 bg-profile-teal' onClick={() => switchColor('profile-teal')}>&emsp;</div>
        <div className='w-10 bg-profile-green' onClick={() => switchColor('profile-green')}>&emsp;</div>
        <div className='w-10 bg-profile-lightgreen' onClick={() => switchColor('profile-lightgreen')}>&emsp;</div>
        <div className='w-10 bg-profile-lime' onClick={() => switchColor('profile-lime')}>&emsp;</div>
        <div className='w-10 bg-profile-yellow' onClick={() => switchColor('profile-yellow')}>&emsp;</div> */}
          <div className='flex justify-center rounded-xl w-10 bg-profile-amber' onClick={() => switchColor('profileGold')}>{profileColor === 'profileGold' &&
            <Check />}</div>
          {/* <div className='w-10 bg-profile-orange' onClick={() => switchColor('profile-orange')}>&emsp;</div>
        <div className='w-10 bg-profile-deeporange' onClick={() => switchColor('profile-deeporange')}>&emsp;</div> */}
        </div>
      </div>
      {!attachment &&
        <div className='flex justify-center p-5'>
          <Button onClick={onClick} variant='outlined' disabled>저장</Button>
        </div>
      }
      <img src={attachment} />
    </>
  )
}

export default ProfileDialogs
