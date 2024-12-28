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
            updateDoc(docRef, {profileImage: attachmentFile});
            dispatch(changeProfileImage(attachmentFile))
        } else if (onClear) {
            dispatch(changeProfileImage('null'))
            setOnClear(false)
            const storageRef = ref(storage, userObj.uid);
            uploadString(storageRef, 'null', 'raw').then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // deleteObject(storageRef).then(() => {
            // }).catch((error) => {
            // });

            const docRef = doc(dbservice, `members/${userObj?.uid}`)
            updateDoc(docRef, {profileImage: attachmentFile});
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
                        <div className='flex justify-center pt-5'>
                            <button className='factoryClear' onClick={onClearAttachment}>업로드 파일 삭제</button>
                        </div>
                        {/* {attachmentFile && attachmentFile !== 'null' &&
                        } */}
                    </div>
                </div>
            </DialogContent>
            <div className='flex'>색깔을 선택하면 배경에 반영됩니다.&emsp;</div>
            <div className='flex px-1'>
                <div className='w-10 bg-profile-red' onClick={() => switchColor('profile-red')}>&emsp;</div>
                <div className='w-10 bg-profile-pink' onClick={() => switchColor('profile-pink')}>&emsp;</div>
                <div className='w-10 bg-profile-purple' onClick={() => switchColor('profile-purple')}>&emsp;</div>
                <div className='w-10 bg-profile-deeppurple' onClick={() => switchColor('profile-deeppurple')}>&emsp;</div>
                <div className='w-10 bg-profile-indigo' onClick={() => switchColor('profile-indigo')}>&emsp;</div>
                <div className='w-10 bg-profile-blue' onClick={() => switchColor('profile-blue')}>&emsp;</div>
                <div className='w-10 bg-profile-lightblue' onClick={() => switchColor('profile-lightblue')}>&emsp;</div>
                <div className='w-10 bg-profile-cyan' onClick={() => switchColor('profile-cyan')}>&emsp;</div>
                <div className='w-10 bg-profile-teal' onClick={() => switchColor('profile-teal')}>&emsp;</div>
                <div className='w-10 bg-profile-green' onClick={() => switchColor('profile-green')}>&emsp;</div>
                <div className='w-10 bg-profile-lightgreen' onClick={() => switchColor('profile-lightgreen')}>&emsp;</div>
                <div className='w-10 bg-profile-lime' onClick={() => switchColor('profile-lime')}>&emsp;</div>
                <div className='w-10 bg-profile-yellow' onClick={() => switchColor('profile-yellow')}>&emsp;</div>
                <div className='w-10 bg-profile-amber' onClick={() => switchColor('profile-amber')}>&emsp;</div>
                <div className='w-10 bg-profile-orange' onClick={() => switchColor('profile-orange')}>&emsp;</div>
                <div className='w-10 bg-profile-deeporange' onClick={() => switchColor('profile-deeporange')}>&emsp;</div>
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
