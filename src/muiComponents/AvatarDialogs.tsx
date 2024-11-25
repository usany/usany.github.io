import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import { useAvatarColorStore, useAvatarImageStore } from 'src/store'

const AvatarDialogs = ({ userObj, profileDialog, attachment, changeAttachment, handleClose }) => {
    const [selectedColor, setSelectedColor] = useState(null)
    const [attachmentFile, setAttachmentFile] = useState(null)
    const [onClear, setOnClear] = useState(false)
    // const [file, setFile] = useState(null)
    const avatarColor = useAvatarColorStore((state) => state.avatarColor)
    const handleAvatarColor = useAvatarColorStore((state) => state.handleAvatarColor)
    const avatarImage = useAvatarImageStore((state) => state.avatarImage)
    const handleAvatarImage = useAvatarImageStore((state) => state.handleAvatarImage)
    const onClick = async () => {
        const data = doc(dbservice, `members/${userObj.uid}`)
        if (selectedColor) {   
            updateDoc(data, {profileColor: selectedColor});
            handleAvatarColor(selectedColor)
        }
        if (attachmentFile && !onClear) {   
            const storageRef = ref(storage, userObj.uid);
            // const response = await storageRef.putString()
            uploadString(storageRef, attachmentFile, 'data_url').then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            changeAttachment(attachmentFile)
            // if (attachmentFile === 'null') {
            //     handleAvatarImage(null)
            // } else {
            //     handleAvatarImage(attachmentFile)
            // }
            handleAvatarImage(attachmentFile)
            // const uploadTask = uploadBytesResumable(storageRef, file);
            // uploadTask.on(
            //     "state_changed",
            //     (snapshot) => {
            //         console.log(snapshot);
            //     },
            //     (error) => {
            //         alert(error);
            //     },
            //     () => {
            //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //         await updateDoc(collectionRef, {
            //             imageurl: downloadURL,
            //         });
            //         });
            //     }
            // );
        } else if (onClear) {
            handleAvatarImage(null)
            setOnClear(false)
            const storageRef = ref(storage, userObj.uid);
            uploadString(storageRef, 'null', 'raw').then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        }
    }
    const switchColor = (newColor) => {
        setSelectedColor(newColor)
    }
    useEffect(() => {
        if (!selectedColor) {
            setSelectedColor(avatarColor)
        }
    }, [])
    useEffect(() => {
        if (avatarImage) {
            console.log(attachment)
            setAttachmentFile(avatarImage)
        }
    }, [])

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
        console.log(theFile)
        reader.readAsDataURL(theFile)
        // setFile(theFile)
        // const uploadTask = uploadBytesResumable(storageRef, file);
        // uploadTask.on(
        //   "state_changed",
        //   (snapshot) => {
        //     console.log(snapshot);
        //   },
        //   (error) => {
        //     alert(error);
        //   },
        //   () => {
        //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //       await updateDoc(collectionRef, {
        //         imageurl: downloadURL,
        //       });
        //     });
        //   }
        // );
    
      }
      const onClearAttachment = () => {
        changeAttachment(null)
        setAttachmentFile(null)
        setOnClear(true)
        const fileInput = document.getElementById('file') || {value:null}
        fileInput.value = null
      }
    
    return (
        <Dialog open={profileDialog} onClose={handleClose}>
            <DialogContent>
                <div>
                    프로필 변경
                </div>
                <div className='flex'>
                    <Avatar alt={userObj.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: selectedColor }} src={attachmentFile || './src'} onClick={() => {
                    }} variant='rounded' />
                    <div className='flex-col px-5 content-center'>
                        {/* <div className='flex'>
                        </div> */}
                        <label for='file'>내 파일 업로드</label>
                        <input id='file' type='file' onChange={onFileChange} hidden />
                        {attachmentFile &&
                            <div className='flex justify-center pt-5'>
                                <button className='factoryClear' onClick={onClearAttachment}>업로드 파일 삭제</button>
                            </div>
                        }
                    </div>
                </div>
            </DialogContent>
            {/* 'profile-red': '#f44336',
      'profile-pink': '#e91e63',
      'profile-purple': '#9c27b0',
      'profile-deeppurple': '#673ab7',
      'profile-indigo': '#3f51b5',
      'profile-blue': '#2196f3',
      'profile-lightblue': '#03a9f4',
      'profile-cyan': '#00bcd4',
      'profile-teal': '#009688',
      'profile-green': '#4caf50',
      'profile-lightgreen': '#8bc34a',
      'profile-lime': '#cddc39',
      'profile-yellow': '#ffeb3b',
      'profile-amber': '#ffc107',
      'profile-orange': '#ff9800',
      'profile-deeporange': '#ff5722', */}
        <div className='flex'>
            <div>색깔을 선택하면 배경에 반영됩니다.&emsp;</div>
        </div>
            <div className='flex px-1'>
                <div className='w-10 bg-profile-red' onClick={() => switchColor('#f44336')}>&emsp;</div>
                <div className='w-10 bg-profile-pink' onClick={() => switchColor('#e91e63')}>&emsp;</div>
                <div className='w-10 bg-profile-purple' onClick={() => switchColor('#9c27b0')}>&emsp;</div>
                <div className='w-10 bg-profile-deeppurple' onClick={() => switchColor('#673ab7')}>&emsp;</div>
                <div className='w-10 bg-profile-indigo' onClick={() => switchColor('#3f51b5')}>&emsp;</div>
                <div className='w-10 bg-profile-blue' onClick={() => switchColor('#2196f3')}>&emsp;</div>
                <div className='w-10 bg-profile-lightblue' onClick={() => switchColor('#03a9f4')}>&emsp;</div>
                <div className='w-10 bg-profile-cyan' onClick={() => switchColor('#00bcd4')}>&emsp;</div>
                <div className='w-10 bg-profile-teal' onClick={() => switchColor('#009688')}>&emsp;</div>
                <div className='w-10 bg-profile-green' onClick={() => switchColor('#4caf50')}>&emsp;</div>
                <div className='w-10 bg-profile-lightgreen' onClick={() => switchColor('#8bc34a')}>&emsp;</div>
                <div className='w-10 bg-profile-lime' onClick={() => switchColor('#cddc39')}>&emsp;</div>
                <div className='w-10 bg-profile-yellow' onClick={() => switchColor('#ffeb3b')}>&emsp;</div>
                <div className='w-10 bg-profile-amber' onClick={() => switchColor('#ffc107')}>&emsp;</div>
                <div className='w-10 bg-profile-orange' onClick={() => switchColor('#ff9800')}>&emsp;</div>
                <div className='w-10 bg-profile-deeporange' onClick={() => switchColor('#ff5722')}>&emsp;</div>
            </div>
            <DialogActions>
            <Button variant='outlined' onClick={() => {
                handleClose()
                changeAttachment(attachmentFile)
                onClick()
            }}>저장</Button>
            <Button variant='outlined' onClick={() => {
                handleClose()
                setSelectedColor(avatarColor)
                setAttachmentFile(attachment)
                handleAvatarImage(attachment)
            }} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarDialogs
