import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, dbservice } from 'src/baseApi/serverbase'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
// import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { useSelector, useDispatch } from 'react-redux'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileImage } from 'src/stateSlices/profileImageSlice'

const AvatarDialogs = ({ userObj, profileDialog, attachment, changeAttachment, handleClose }) => {
    const [selectedColor, setSelectedColor] = useState('')
    const [attachmentFile, setAttachmentFile] = useState('null')
    const [onClear, setOnClear] = useState(false)
    const profileColor = useSelector(state => state.profileColor.value)
    const profileImage = useSelector(state => state.profileImage.value)
    const dispatch = useDispatch()
    const onClick = async () => {
        const data = doc(dbservice, `members/${userObj.uid}`)
        if (selectedColor) {   
            updateDoc(data, {profileColor: selectedColor});
            dispatch(changeProfileColor(selectedColor))
        }
        if (attachmentFile && !onClear) {   
            const storageRef = ref(storage, userObj.uid);
            uploadString(storageRef, attachmentFile, 'data_url').then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            updateDoc(docRef, {profileImageUrl: attachmentFile});
            dispatch(changeProfileImage(attachmentFile))
        } else if (onClear) {
            dispatch(changeProfileImage('null'))
            setOnClear(false)
            const storageRef = ref(storage, userObj.uid);
            uploadString(storageRef, 'null', 'raw').then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // Delete the file
            deleteObject(storageRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
            // Uh-oh, an error occurred!
            });

            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            updateDoc(docRef, {profileImageUrl: attachmentFile});
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
        setAttachmentFile(profileImage)
    }, [profileImage])
    
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
        setOnClear(false)
      }
      const onClearAttachment = () => {
        setAttachmentFile('null')
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
                        <label for='file'>내 파일 업로드</label>
                        <input id='file' type='file' onChange={onFileChange} hidden />
                        {attachmentFile && attachmentFile !== 'null' &&
                            <div className='flex justify-center pt-5'>
                                <button className='factoryClear' onClick={onClearAttachment}>업로드 파일 삭제</button>
                            </div>
                        }
                    </div>
                </div>
            </DialogContent>
            <div className='flex'>색깔을 선택하면 배경에 반영됩니다.&emsp;</div>
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
                dispatch(changeProfileColor(selectedColor))
            }}>저장</Button>
            <Button variant='outlined' onClick={() => {
                handleClose()
                if (onClear) {
                    setAttachmentFile(profileImage)
                }
                setOnClear(false)
                setSelectedColor(profileColor)
            }} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AvatarDialogs
